var preloader;
var imgAssets = ["imagenes/enemy.png", "imagenes/heroe-sprite.png", "imagenes/llave.png", "imagenes/moneda.png", "imagenes/pattern.png", "imagenes/puerta.png", "imagenes/fondo.jpg"];
window.addEventListener("load", function(){
	preloader = new PreloadJS();//ya definido el la libreria
	preloader.onProgress = procesoCarga;//evento que carga las imagenes cada vez q avanza el proceso de carga de la pagina
	cargar();
	var iniciadores = document.getElementsByClassName('start');
	for(i in iniciadores){
		var boton = iniciadores[i];
		boton.addEventListener('click',iniciarJuego);
	}
}, false);
function cargar(){
	while(imgAssets.length > 0) {
		var url = imgAssets.shift();//shift elimina y extrae el ultimo elemento del arreglo y lo almacecna en la url
		preloader.loadFile(url);//CARGAMOS EL ARCHIVO
	}
}
function procesoCarga(){
	if(preloader.progress == 1){ //del 0(sin vcargar) - 1(cargado)
		//nivelUno();//cuando haya cargado todas las imagenes, inicia el juego
		document.querySelector('#info').style.display = 'block';
	}
}
function iniciarJuego(){
	document.querySelector('#info').style.display = 'none';
	document.querySelector('#lose').style.display = 'none';
	document.querySelector('#win').style.display = 'none';
	document.querySelector('#game').style.display = 'block';
	nivelUno();
}