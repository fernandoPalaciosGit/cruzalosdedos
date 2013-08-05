/*kinetic es una libreria de clases y objetos que extiende y simplifica la api de canvas para html5*/
/*con kinetik NO usamos canvas, sino el obnjeto de stage, que es de tipo JSON*/
//VARIABLES DE ESCENARIO
var stage;//STAGE
var fondo; //LAYER
var personaje;//SHAPE: personajes individuales
var grupoAssets;//GROUP: son conjuntos de personajes con el mismo comportanmento
var puntaje;
var perdido;
var imagenFondo;
//añadir texto a traves de Kinetic
grupoAssets = new Kinetic.Group({
	x: 0,
	y: 0
});
/*STAGE: objeto q contiene todos los elementos de la libreria de kinetik*/
stage = new Kinetic.Stage({
	container: "game",//id del lienzo
	width: 900,
	height: 500
});
puntaje = new Kinetic.Text({
	text: "Puntaje: 0",
	height: 25,
	width: 150,
	x: stage.getWidth()-130,
	y: 10,
	fill: "white",
	fontFamily: "Calibri",
	fontSize: 20
});
perdido = new Kinetic.Text({
	text: "!!Perdiste la llave",
	height: 50,
	width: 400,
	x: stage.getWidth()-200,
	y: 40,
	fill: "red",
	fontFamily: "Calibri",
	fontSize: 25
});
var imgFon = new Image();
imgFon.src = "imagenes/fondo.jpg";
imagenFondo = new Kinetic.Image({
	x: 0,
	y: 0,
	image: imgFon,
	width: stage.getWidth(),
	height: stage.getHeight()
});
//VARIABLES DE CAIDA
var gravedad = 1;
var val_reb = 0;//0(no rebota el personaje con la superficie), 1(no regresa a su posicion original), >1(trampolin)
var bandera = false;
var juego = new Game();
var imgEn = new Image();
imgEn.src = "imagenes/enemy.png";
/*imgEn.onload = function(){
	//cargar cada imagen, xo no es necesario,
	//xq en el index.html, ya hemos añadido los assets durante la carga de la ventana,
	// a traves de Preload
}*/
var imgMon = new Image();
imgMon.src = "imagenes/moneda.png";
var imgLla = new Image();
imgLla.src = "imagenes/llave.png";
var imgPatt = new Image();
imgPatt.src = "imagenes/pattern.png";
var imgPuer = new Image();
imgPuer.src = "imagenes/puerta.png";
var imgH = new Image();
imgH.src = "imagenes/heroe-sprite.png";




var keyboard = {/*añadimos los event.keyCode con addKeyBoardEvents*/};
//LISTENERS
/*escuchar a cualquier tecla , xa mover un objeto*/
function addKeyBoardEvents(){
	document.addEventListener("keydown", function(event){
		keyboard[event.keyCode] = true;//asigna a todas las teclas. true
	}, false);
	document.addEventListener("keyup", function(event){
		keyboard[event.keyCode] = false;//una vez que se deje de presionar la tecla
	}, false);
}
//COLISIONES entre dos objetos
//usando las funciones de kinetic
function hit(a, b){
	//devuelve true si hay colision
	var hit = false;
	/*colision horizontal*/
	if(b.getX() + b.getWidth() >= a.getX() && b.getX() < a.getX() + a.getWidth()){
		/*colision vertical*/
		if(b.getY() + b.getHeight() >= a.getY() && b.getY() < a.getY() + a.getHeight()){
			hit = true;/*si ambas condiciones son verdaderas, colisionan*/
		}
	}
	/*colision entre a - b*/
	if(b.getX() <= a.getX() && b.getX() + b.getWidth() >= a.getX() + a.getWidth()){
		if(b.getY() <= a.getY() && b.getY() + b.getHeight() >= a.getY() + a.getHeight()){
			hit = true;
		}
	}
	/*colision entre b - a*/
	if(a.getX() <= b.getX() && a.getX() + a.getWidth() >= b.getX() + b.getWidth()){
		if(a.getY() <= b.getY() && a.getY() + a.getHeight() >= b.getY() + b.getHeight()){
			hit = true;
		}
	}
	return hit;
}
//PRIMERA CAPA DEL STAGE
function nivelUno(){
	juego.puntaje = 0;//reiniciamos el puntaje si volvemos al nivel 1
	if (bandera) return;
	bandera = true;
	//todos los objetos del nivel hay q agregarlos a la capa
	juego.llave = true;//el primer nivel esta abierta la llave
	fondo = new Kinetic.Layer();//propiedades deje  la capa/escenario //LAYER

	/*ENEMIGOS, posiciones aleatorias*/
	grupoAssets.add(new Enemigo(150, stage.getHeight()-(300+60), imgEn));
	grupoAssets.add(new Enemigo(200, stage.getHeight()-60-15, imgEn));//enemmigo.height=60px;
	grupoAssets.add(new Enemigo(800, stage.getHeight()-(350+60), imgEn));
	grupoAssets.add(new Enemigo(700, stage.getHeight()-60-15, imgEn));
	grupoAssets.add(new Enemigo(1020, stage.getHeight()-75, imgEn));//fuera del lienzo
	grupoAssets.add(new Enemigo(1120, stage.getHeight()-75, imgEn));
	grupoAssets.add(new Enemigo(1220, stage.getHeight()-75, imgEn));
	grupoAssets.add(new Enemigo((stage.getWidth()*2)-30, (stage.getHeight()/3)-60, imgEn));
	grupoAssets.add(new Enemigo((stage.getWidth()*2)+30, stage.getHeight()-75, imgEn));

	/*PLATAFORMAS*/
	/*piso*/
	var piso = new Plataforma(0, stage.getHeight() - 15, imgPatt);
	piso.setWidth(stage.getWidth()*2);
	grupoAssets.add(piso);
	/*creamos cada plataforma, para cada enemigo, con  instancias anonimas*/
	grupoAssets.add(new Plataforma(150, stage.getHeight()-(300), imgPatt));//+enemigo
	grupoAssets.add(new Plataforma(425, stage.getHeight()-125, imgPatt));
	grupoAssets.add(new Plataforma(575, stage.getHeight()-250, imgPatt));
	grupoAssets.add(new Plataforma(800, stage.getHeight()-(350), imgPatt));//+enemigo
	grupoAssets.add(new Plataforma(1020, stage.getHeight()-100, imgPatt));//fuera del lienzo
	grupoAssets.add(new Plataforma(1120, stage.getHeight()-100, imgPatt));
	grupoAssets.add(new Plataforma(1220, stage.getHeight()-100, imgPatt));
	grupoAssets.add(new Plataforma(1500, stage.getHeight()/2,  imgPatt));
	grupoAssets.add(new Plataforma((stage.getWidth()*2)-30, stage.getHeight()/3,  imgPatt));

	/*FIN PANTALLA*/
	grupoAssets.add(new PlataformaFin(stage.getWidth()*2, stage.getHeight(), 20, -stage.getHeight()/2,  imgPatt));
	grupoAssets.add(new PlataformaFin(stage.getWidth()*2, stage.getHeight()/2, stage.getHeight()/2, 20,  imgPatt));
	grupoAssets.add(new PlataformaFin((stage.getWidth()*2) + (stage.getHeight()/2), stage.getHeight(), 20, -stage.getHeight(),  imgPatt));

	/*MONEDAS*/
	grupoAssets.add(new Moneda(200, stage.getHeight()-(350+30), imgMon));
	grupoAssets.add(new Moneda(300, stage.getHeight()-(175+30), imgMon));
	grupoAssets.add(new Moneda(500, stage.getHeight()-(50+30), imgMon));
	grupoAssets.add(new Moneda(610, stage.getHeight()-(250+30), imgMon));
	grupoAssets.add(new Moneda(850, stage.getHeight()-(350+30), imgMon));
	grupoAssets.add(new Moneda((800+40), stage.getHeight()-45, imgMon));
	grupoAssets.add(new Moneda(1220 + 150, stage.getHeight()-150, imgMon));
	grupoAssets.add(new Moneda(1220 + 200, stage.getHeight()-200, imgMon));
	grupoAssets.add(new Moneda(1220 + 250, stage.getHeight()-250, imgMon));
	/**/
	grupoAssets.add(new Moneda((stage.getWidth()*2)+60, stage.getHeight()-50, imgMon));
	grupoAssets.add(new Moneda((stage.getWidth()*2)+120, stage.getHeight()-50, imgMon));
	grupoAssets.add(new Moneda((stage.getWidth()*2)+180, stage.getHeight()-50, imgMon));
	/**/
	grupoAssets.add(new Moneda((stage.getWidth()*2)+80, stage.getHeight()-125, imgMon));
	grupoAssets.add(new Moneda((stage.getWidth()*2)+140, stage.getHeight()-125, imgMon));
	grupoAssets.add(new Moneda((stage.getWidth()*2)+200, stage.getHeight()-125, imgMon));
	/**/
	grupoAssets.add(new Moneda((stage.getWidth()*2)+60, stage.getHeight()-200, imgMon));
	grupoAssets.add(new Moneda((stage.getWidth()*2)+120, stage.getHeight()-200, imgMon));
	grupoAssets.add(new Moneda((stage.getWidth()*2)+180, stage.getHeight()-200, imgMon));

	/*PUERTA*/
	grupoAssets.add(new Puerta(810, stage.getHeight()-(70+15), imgPuer));
	grupoAssets.add(new Puerta(1750, stage.getHeight()-(70+15), imgPuer));

	/*HEROE*/
	//instanciamos la clase Heroe //SHAPE
	personaje = new Heroe(imgH, framesP);//framesP son las claves del sprite: javascript/heroe-sprite.js
	personaje.setX(30);
	personaje.setY(stage.getHeight() - personaje.getHeight() - 35);
	personaje.limiteDer = stage.getWidth() - personaje.getWidth();
	personaje.limiteTope = stage.getHeight() - piso.getHeight() - 15;//limite de abajo, del suelo

	/*STAGE / FONDO*/
	fondo.add(imagenFondo);
	fondo.add(personaje);//sobre el lienzo dibujamos el personaje
	fondo.add(grupoAssets);
	fondo.add(puntaje);
	personaje.start();//empieza a ejecutar la animacion del sprite
	//console.log(personaje);
	stage.add(fondo);//sobre el escenario le añadimos el lienzo o capa

	//CARGAMOS LOS FRAMES DENTRO DEL PIMER NIVEL, una vez se han cargado todas la imagnes
	var intv = setInterval(frameLoop, 1000/20);//se ejecuta la funcion 20 frames por segundo
	//funciones de intervalo de tiempo: que detecta los frames de imagenes
}
function nivelDos(){
	fondo = new Kinetic.Layer();//constructor de layer, fondo es la capa
	juego.llave = false;
	//Enemmigos
	grupoAssets.add(new Enemigo(200,stage.getHeight()/1.5-60,imgEn));
	grupoAssets.add(new Enemigo(850,stage.getHeight()/3.9-60,imgEn));
	grupoAssets.add(new Enemigo(25,stage.getHeight()/3-60,imgEn));
	grupoAssets.add(new Enemigo(500,stage.getHeight()-75,imgEn));
	grupoAssets.add(new Enemigo(650,stage.getHeight()-75,imgEn));
	grupoAssets.add(new Enemigo(850,stage.getHeight()-75,imgEn));
	//Puerta
	grupoAssets.add(new Puerta(1800-30,stage.getHeight()-90,imgPuer));
	//Plataformas
	var piso = new Plataforma(0,stage.getHeight()-15, imgPatt);
	piso.setWidth(stage.getWidth()*2);
	grupoAssets.add(piso);
	grupoAssets.add(new Plataforma(10,stage.attrs.height/3, imgPatt));
	grupoAssets.add(new Plataforma(190,stage.attrs.height/1.5, imgPatt));
	grupoAssets.add(new Plataforma(310,stage.attrs.height/4, imgPatt));
	grupoAssets.add(new Plataforma(550,stage.attrs.height/5, imgPatt));
	grupoAssets.add(new Plataforma(870,stage.attrs.height/3.9, imgPatt));
	//Llave
	var clau = new Llave(900, stage.getHeight()/7, imgLla);
	grupoAssets.add(clau);
	//Monedas
	grupoAssets.add(new Moneda(350,stage.getHeight()/3-130,imgMon));
	grupoAssets.add(new Moneda(200, stage.getHeight()-(350+30), imgMon));
	grupoAssets.add(new Moneda(300, stage.getHeight()-(175+30), imgMon));
	grupoAssets.add(new Moneda(500, stage.getHeight()-(50+30), imgMon));
	grupoAssets.add(new Moneda(610, stage.getHeight()-(250+30), imgMon));
	grupoAssets.add(new Moneda(850, stage.getHeight()-(350+30), imgMon));
	grupoAssets.add(new Moneda((800+40), stage.getHeight()-45, imgMon));
	grupoAssets.add(new Moneda(1220 + 150, stage.getHeight()-150, imgMon));
	grupoAssets.add(new Moneda(1220 + 200, stage.getHeight()-200, imgMon));
	grupoAssets.add(new Moneda(1220 + 250, stage.getHeight()-250, imgMon));

	//Personaje
	personaje = new Heroe(imgH,framesP);
	personaje.setX(30);
	personaje.setY(stage.getHeight() - personaje.getHeight() - 35);
	personaje.limiteDer = stage.getWidth() - personaje.getWidth();
	personaje.limiteTope = stage.getHeight() - piso.getHeight() - 15;
    fondo.add(imagenFondo);
	fondo.add(personaje);
	fondo.add(grupoAssets);
	fondo.add(puntaje);
	personaje.start();
	stage.add(fondo);
	var intv = setInterval(frameLoop, 1000/20);
}
function moverPersonaje(){//funciones de teclado para personaje
	if(personaje.getAnimation() != "caminar" && (keyboard[37] || keyboard[39])){
		personaje.setAnimation("caminar");
	}
	if(keyboard[37]){
		personaje.retroceder();
	}
	if(keyboard[39]){
		personaje.caminar();
	}
	if(keyboard[38] && personaje.contador < 1){//siempre y cuando el contador sea proximo a 0
		personaje.saltar();
	}
	if( !(keyboard[40] || keyboard[39] || keyboard[38] || keyboard[37]) && !personaje.estaSaltando){
		personaje.setAnimation("estatico");
	}
	for (var i = 0; i< grupoAssets.children.length; i++) {
		var plataforma = grupoAssets.children[i];
		if(keyboard[40] && !keyboard[37] && !keyboard[39] && personaje.getY() < plataforma.getY()){
			//aqui regulo la velocidad de caida
			personaje.vy+=0.3;
		}
	}
}
function moverFondo(){
	for (var i = 0; i< grupoAssets.children.length; i++) {
		var asset = grupoAssets.children[i];//movemos los assets para simular los movimientos
		if(personaje.getX() > (stage.getWidth()/2) && keyboard[39]){//que el personage sobrepase la pantalla y se este moviendo
			personaje.vx = 2;
			asset.move(-5, 0);
		}else{
		personaje.vx = 10;
		}
	}
}
function aplicarFuerzas(){
	personaje.aplicarGravedad(gravedad, val_reb);
}
function moverEnemigos(){
	//chikldfren atributo de kinetic que contiene el erreglo de todos los objetos instanciados con grupoAssets
	//recorremos enemigos
	for (var i in grupoAssets.children) {
		var enemigo = grupoAssets.children[i];
		//movemos solo los objetos enemigo de la clase Enemigo
		if(enemigo instanceof Enemigo){//devuelve true si la clase de enemigo es Enemigo (y no new Heroe o new Plataforma)
			enemigo.mover();
		}
		//ahora solo movemos la plataforma
	}
}
function ColisionPlataformas(){
	//var plataformas = grupoAssets.children();
	for (var i = 0; i< grupoAssets.children.length; i++) {
		var plataforma = grupoAssets.children[i];// va a ser cada uno de los assets del juego y donde se verifican las colisiones
		//funcion colisiones
		if(hit(plataforma, personaje)){
			//COLISION ENEMIGO
			if(plataforma instanceof Enemigo){
				//si caemos sobre el enemigoo
				if(personaje.vy > 2 && personaje.getY() < plataforma.getY()){//velocidad de caida suficiente = 2, y que el personaje este por encima del enemigo
					plataforma.remove();//eliminamos el enemigo
					juego.puntaje += 5;//si matamos enemigo nos hacemos con 5 puntos
				}else{//si nos lo topamos por  otro lugar
					grupoAssets.removeChildren();
					document.querySelector("#score").innerHTML = juego.puntaje;
					document.querySelector("#lose").style.display = "block";
					document.querySelector("#game").style.display = "none";
					//window.clearInterval(intv);
					bandera = false;
				}
			}
			//COLISION PLATAFORMA y solo cuando esta cayendo
			else if(plataforma instanceof Plataforma && personaje.getY() < plataforma.getY() && personaje.vy >= 0){
				//detenga la caida
				personaje.contador = 0;
				personaje.setY(plataforma.getY() - personaje.getHeight() - 20);//el personaje se encontrara arriba de la plataforma
				personaje.vy = (personaje.vy * val_reb) + 35;//detener al personaje
			}
			else if(plataforma instanceof PlataformaFin && personaje.getX() < plataforma.getX()){
				personaje.setX(0);
			}
			//COLISION MONEDA
			else if(plataforma instanceof Moneda){
				plataforma.remove();
				juego.puntaje++;//se añada 2 pts
			}
			//COLISION LLAVE
			else if(plataforma instanceof Llave){
				plataforma.remove();
				juego.llave = true;
				continue;
			}
			//COLISION PUERTA
			else if(plataforma instanceof Puerta && juego.llave){//y que lleve la llave
				if(juego.nivel == 1){
					grupoAssets.removeChildren();//remover todos los assets añadidos al FONDO del STAGE
					//window.clearInterval(intv);//detener el frameloop de refresco de objetos en el canvas
					juego.nivel = 2;
					nivelDos();
				}
				else if(juego.nivel == 2){
					grupoAssets.removeChildren();
					document.querySelector("#score").innerHTML = juego.puntaje;
					document.querySelector("#win").style.display = "block";
					document.querySelector("#game").style.display = "none";
					//window.clearInterval(intv);
					bandera = false;
				}
			}
			else if(plataforma instanceof Puerta && !juego.llave){
				fondo.add(perdido);
			}
		}
	}
}
function actualizarTexto(){
	//actualizar puntaje
	puntaje.setText("Puntaje: "+juego.puntaje);
}
nivelUno();
addKeyBoardEvents();
function frameLoop(){
	aplicarFuerzas();
	actualizarTexto();
	ColisionPlataformas();
	moverFondo();
	moverPersonaje();
	moverEnemigos();
	//cada vez q se dibuje un personaje, se vuelva a dibujar los frames
	stage.draw();
}