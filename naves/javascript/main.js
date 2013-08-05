window.addEventListener("load", init, false);

/*VARIABLES GLOBALES*/
var canvas = document.getElementById("canvas-naves");
var ctx = canvas.getContext("2d");

//objeto de la nave
var nave = {
	x: 100,/*NO IMPORTA xq la moveremos con el teclado*/
	y: canvas.height-55,
	width: 40,
	height: 40,
	contador: 0
};

//objeto json: estado del juego
var juego ={
	estado: "iniciando"
};

var textoRespuesta = {
	contador: -1,
	titulo: "",
	subtitulo: ""
};

//arreglo (xq son varios) de enemigos
var enemigos = [];

/*objeto del teclado*/
var teclado = {};

/*array disparos*/
var disparos = [];
var disparosEnemigos = [];

/*cargar imagenes*/
var imagenes = ["imagenes/monster.png", "imagenes/spaceShip,png", "imagenes/enemyLaser.png", "imagenes/laser.png" ,"imagenes/espacio.jpg"];
var fondo, imgNave, imgEnemigo, imgDisparo, imgDisparoEnemigo;
var soundShoot, soundInvaderShoot, soundDeadSpace, soundDeadInvader, soundEndGame;
/*precargado*/
var preloader;

function loadMedia(){
	preloader = new PreloadJS();
	preloader.onProgress = progresoCarga;
	cargar();
/*
	fondo.addEventListener("load", function(){
		//refresco de inmagen: intervalo de tiempo en el que el juego carga los frames de imagen
		//55 frames/seg: tiempo de refresco de frames
		var intervalo = window.setInterval(frameLoop, 1000/55);
	}, false);
*/
}

function cargar(){
	while(imagenes.length > 0){
		//sacar el ultimo elemento del arreglo y devolverlo
		imagenes = imagenes.shift();
		preloader.loadFile(imagenes);
	}
}

function progresoCarga(){
	console.log(preloader.progress*100+"%");
	/*ya se cargaron todas*/
	if(preloader.progress == 1){
		/*cuanto mayor sea el proceso de carga, mas rapido va el juuego*/
		var intervalo = window.setInterval(frameLoop, 1000/35);
		fondo = new Image();
		fondo.src = "imagenes/espacio.jpg";
		imgNave = new Image();
		imgNave.src = "imagenes/spaceShip.png";
		imgEnemigo = new Image();
		imgEnemigo.src = "imagenes/monster.png";
		imgDisparo = new Image();
		imgDisparo.src = "imagenes/laser.png";
		imgDisparoEnemigo = new Image();
		imgDisparoEnemigo.src = "imagenes/enemyLaser.png";
		/*elementos de tipo audio con html5*/
		soundShoot = document.createElement("audio");
		document.body.appendChild(soundShoot);
		soundShoot.setAttribute("src", "sonidos/laserSpace.wav");
		soundInvaderShoot = document.createElement("audio");
		document.body.appendChild(soundInvaderShoot);
		soundInvaderShoot.setAttribute("src", "sonidos/laserAlien.wav");
		soundDeadSpace = document.createElement("audio");
		document.body.appendChild(soundDeadSpace);
		soundDeadSpace.setAttribute("src", "sonidos/deadSpaceShip.wav");
		soundDeadInvader = document.createElement("audio");
		document.body.appendChild(soundDeadInvader);
		soundDeadInvader.setAttribute("src", "sonidos/deadInvader.wav");
		soundEndGame = document.createElement("audio");
		document.body.appendChild(soundEndGame);
		soundEndGame.setAttribute("src", "sonidos/endGame.wav");
	}
}

function eventoTeclado(){
	document.addEventListener("keydown", function(event){
		teclado[event.which] = true;/*identifica la tecla que el user telea, y la añade al objeto de teclado*/
	}, false);


	document.addEventListener("keyup", function(event){
		teclado[event.which] = false;/*ponemos en falso la texcla que dejo de ser pulsada*/
	}, false);
}

function drawBackground(){
	ctx.save();
	ctx.rotate((180*Math.PI)/180);
	ctx.translate(-800, -400);
	ctx.drawImage(fondo, 0, 0, 800, 400);
	ctx.restore();
}

function drawSpaceship(){
	ctx.save();
	ctx.drawImage(imgNave, nave.x, nave.y, nave.width, nave.height);
	ctx.restore();
}

function moveSpaceship(){
	if(nave.estado === "muerto"){
		return;
	}
	/*movimiento a la izquierda*/
	if (teclado[37]){/*TECLA IZQ*/
		nave.x -= 5;
		if (nave.x < 0) nave.x = 0;
	}
	/*movimiento a la derecha*/
	if (teclado[39]){/*TECLA DCHA*/
		nave.x += 5;
		var limite = canvas.width - nave.width;
	if (nave.x > limite) nave.x = limite;
	}
	/*movimiento de disparo*/
	if(teclado[32]){
		//disparos
		if(!teclado.addDisparos){
			addDisparos();
			teclado.addDisparos = true;
		}
	}
	if(!teclado[32]){
		teclado.addDisparos = false;
	}
	if(nave.estado == "hit"){
		nave.contador++;
		if(nave.contador >= 20){
			nave.contador = 0;
			nave.estado = "muerto";
			juego.estado = "perdido";
			textoRespuesta.titulo = "Game Over";
			textoRespuesta.subtitulo = "Presiona R para continuar";
			textoRespuesta.contador = 0 ;
		}
	}
}

/*mover disparos*/
function moveDisparos(){
	for (var i = 0; i < disparos.length; i++) {
		var disparo = disparos[i];
		disparo.y -= 2;
	}

	/*eliminamos los disparos que sobresalesn del canvas, optimizamos la memoria*/
	disparos = disparos.filter(function(disparo){
		return disparo.y > 0;
	});
}

/*agregar disparos*/
function addDisparos(){
	soundShoot.pause();
	soundShoot.currentTime = 0;
	soundShoot.play();
	disparos.push({
		x: nave.x+20,
		y: nave.y -10,
		width: 10,
		height: 30
	});
}

/*dibujar disparos*/
function drawDisparos(){
	ctx.save();
	ctx.fillStyle = "white";
	for (var i = 0; i < disparos.length; i++) {
		var disparo = disparos[i];
		ctx.drawImage(imgDisparo, disparo.x, disparo.y, disparo.width, disparo.height);
	}
	ctx.restore();
}

function drawEnemies(){
	for (var i = 0; i < enemigos.length; i++) {
		var enemigo = enemigos[i];
		/*estado del enemigo*/
		if(enemigo.estado == "vivo"){
			ctx.fillStyle="red";
		}
		if(enemigo.estado == "hit"){
			ctx.fillStyle="purple";
		}
		if(enemigo.estado == "muerto"){
			ctx.fillStyle="black";
		}
		ctx.drawImage(imgEnemigo, enemigo.x, enemigo.y, enemigo.width, enemigo.height);
	}
}

function addEnemies(){
	/*añadir disparos de enemigos*/
	function addDispatorEnemigos(enemigo){
		return{
			x: enemigo.x,
			y: enemigo.y,
			width: 6,
			height: 25,
			contador: 0
		};
	}
	if(juego.estado == "iniciando"){/*entonces agregaremos 10 enemigos*/
		for (var i = 0; i < 10; i++) {
			enemigos.push({
				x: 10 + (i*50),
				y: 10,
				height: 40,
				width: 40,
				estado: "vivo",
				contador: 0
			});
		}
		/*cuando acabe la carga de 10 enemigos, finaliza el ciclo*/
		juego.estado = "jugando";
	}/*fin de carga de enemigos*/

	/*ESTADO del ENEMIGO*/
	for (var j = 0; j < enemigos.length; j++) {
		var enemigo = enemigos[j];
		if(!enemigo) continue;
		if(enemigo && enemigo.estado == "vivo"){
			/*si el enemigo esta vivo, lo movemos, con la curva del SENO*/
			enemigo.contador++;
			/*la posicion del enemigo cambia en funcion del seno y del contador*/
			enemigo.x += Math.sin(enemigo.contador * Math.PI/90)*5;

			/*disparos a los enemigos*/
			if(aleatorio(0, enemigos.length * 10) == 4){
				soundInvaderShoot.pause();
				soundInvaderShoot.currentTime = 0;
				soundInvaderShoot.play();
				disparosEnemigos.push(addDispatorEnemigos(enemigo));
			}
		}
		if(enemigo && enemigo.estado == "hit"){
			enemigo.contador++;
			if(enemigo.contador >= 20){
				enemigo.estado = "muerto";
				enemigo.contador = 0;
			}
		}
	}
	/*eliminamos los enemigos "muertos", optimizamos la memoria*/
	enemigos = enemigos.filter(function(enemigo){
	if(enemigo && enemigo.estado != "muerto") return true;
	return false;
	});
}

//dibuja indicaciones en el texto para el usuario
function drawText(){
	if(textoRespuesta.contador == -1) return;
	var alpha = textoRespuesta.contador/50.0;
	if(alpha>1){
		for (var i = 0; i < enemigos.length; i++) {
			delete enemigos[i];
		}
	}
	ctx.globalAlpha = alpha;
	ctx.save();
	if(juego.estado == "perdido"){
		ctx.fillStyle = "white";
		ctx.font = "Bold 40px Arial";
		ctx.fillText(textoRespuesta.titulo, 140, 200);
		ctx.font = "14px Helvetica";
		ctx.fillText(textoRespuesta.subtitulo, 190, 250);
	}
	if(juego.estado == "victoria"){
		ctx.fillStyle = "white";
		ctx.font = "Bold 40px Arial";
		ctx.fillText(textoRespuesta.titulo, 140, 200);
		ctx.font = "14px Helvetica";
		ctx.fillText(textoRespuesta.subtitulo, 190, 250);
	}
	ctx.restore();
}

function actualizarEstadoJuego(){
	if(juego.estado == "jugando" && enemigos.length === 0){
		juego.estado = "victoria";
		textoRespuesta.titulo = "Derrotaste a los enemigos";
		textoRespuesta.subtitulo = "Presiona R para reiniciar";
		textoRespuesta.contador = 0;
	}
	if((juego.estado == "perdido" || juego.estado == "victoria") && teclado[82]){
		juego.estado = "iniciando";
		nave.estado = "vivo";
		textoRespuesta.contador = -1;
	}
	if(textoRespuesta.contador >= 0){
		textoRespuesta.contador++;
	}
}

/*COLISIONES. devuelve un valor boleano*/
/*detectar condiciones entre dos objetos que tengan alto y ancho*/
function hit(a, b){
	var hit = false;
	/*colision horizontal*/
	if(b.x + b.width >= a.x && b.x < a.x + a.width){
		/*colision vertical*/
		if(b.y + b.height >= a.y && b.y < a.y + a.height){
			hit = true;/*si ambas condiciones son verdaderas, colisionan*/
		}
	}
	/*colision entre a - b*/
	if(b.x <= a.x && b.x + b.width >= a.x + a.width){
		if(b.y <= a.y && b.y + b.height >= a.y + a.height){
			hit = true;
		}
	}
	/*colision entre b - a*/
	if(a.x <= b.x && a.x + a.width >= b.x + b.width){
		if(a.y <= b.y && a.y + a.height >= b.y + b.height){
			hit = true;
		}
	}
	return hit;
}

function checkHit(){
	for (var i = 0; i < disparos.length; i++) {
		var disparo = disparos[i];
		for (var j = 0; j < enemigos.length; j++) {
			var enemigo = enemigos[j];

			/*verificamos si el disparo hace contacto con el enemigo*/
			if(hit(disparo, enemigo)){
				soundDeadInvader.pause();
				soundDeadInvader.currentTime = 0;
				soundDeadInvader.play();
				disparo.estado = "hit";
				enemigo.estado = "hit";
				enemigo.contador = 0;
			}
		}
	}
	if(nave.estado == "hit" || nave.estado == "muerto") return;
	for (var i = 0; i < disparosEnemigos.length; i++) {
		var disparo = disparosEnemigos[i];
		if(hit(disparo, nave)){
			soundDeadSpace.pause();
			soundDeadSpace.currentTime = 0;
			soundDeadSpace.play();
			disparo.estado = "hit";
			nave.estado = "hit";
			nave.contador = 0;
		}
	}
}

function drawDisparosEnemigos(){
	for (var i = 0; i < disparosEnemigos.length; i++) {
		var disparo = disparosEnemigos[i];
		ctx.save();
		ctx.drawImage(imgDisparoEnemigo, disparo.x, disparo.y, disparo.width, disparo.height);
		ctx.restore();
	}
}

function moveDisparosEnemigos(){
	for (var i = 0; i < disparosEnemigos.length; i++) {
		var disparo = disparosEnemigos[i];
		disparo.y += 3;
	}

	/*eliminamos los disparos que sobresalesn del canvas, optimizamos la memoria*/
	disparosEnemigos = disparosEnemigos.filter(function(disparo){
		return disparo.y < canvas.height;
	});
}

function aleatorio(inferior, superior){
	var posibilidades = superior - inferior;
	var a = Math.random() * posibilidades;
	a = Math.floor(a);
	return parseInt(inferior) + a;
}

/*comprobar colisiones == true*/
function init(){
	if(!document.getElementById) return;
	console.log("cargado: main.js");
	/*cargar todas las imagenes antes de empezar el juego*/
	eventoTeclado();
	loadMedia();
}

/*encargada de actualizar la posicion de todos los elementos del fuego*/
/*Tambien dibuja el background y todos los objetos*/
function frameLoop(){
	actualizarEstadoJuego();
	moveSpaceship();/*@ vez que se ejecuta un frame*/
	moveDisparos();
	moveDisparosEnemigos();
	drawBackground();
	checkHit();/*comprobamos si la colision se ha efectuado*/
	addEnemies();/*xa agregar los enemigos*/
	drawEnemies();
	drawDisparosEnemigos();
	drawDisparos();
	drawSpaceship();
	drawText();
}
