/*propiedades que describen al heroe*/
/*PARAM: coordenadas donde se van a colocar en el lienzo*/
function Enemigo(x, y, imagen){
	//*2º tambien hay que ejecutar el constructor de la clase a la q estamos heredando
	//Kinetic.Rect.call(this);
	Kinetic.Image.call(this);
	this.setWidth(60);
	this.setHeight(60);
	this.setX(x-20);
	this.setY(y);
	this.contador = 0;
	//this.setFill("blue");
	this.setImage(imagen);
	/*seleccionar un valor aleatorio para moer al heroe*/
	this.aleatorio = function(inferior,superior){
		var posibilidades = superior -inferior;
		var random = Math.random() * posibilidades;
		random = Math.floor(random);
		return parseInt(inferior) + random;
	};
	this.mover = function(){
		//funcion trigoniometrica para mover los enemigos
		this.contador+=0.18;//alargamos la grafica
		this.setX(this.getX()+Math.sin(this.contador*Math.PI/11)*5);//seteamos la posicion del enemigo con el contagor xa moverlo
	};
}
//1º la clase enemmigo tambien debe recibir la herencia de la clase Recct de kinetic
//Enemigo.prototype = Object.create(Kinetic.Rect.prototype);
//heredamos de la clase Image de kinetic para ibujar imagenes con canvas a t5raves de kinetic
Enemigo.prototype = Object.create(Kinetic.Image.prototype);