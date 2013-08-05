function Llave(x, y, imagen){
	Kinetic.Image.call(this);//ejecutar el constructor de la clase Image de kinetic
	//metodos de kinetic
	this.setWidth(30);
	this.setHeight(40);
	this.setX(x);
	this.setY(y);
	this.setImage(imagen);
}
Llave.prototype = Object.create(Kinetic.Image.prototype);