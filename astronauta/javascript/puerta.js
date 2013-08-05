function Puerta(x, y, imagen){
	//Kinetic.Rect.call(this);
	Kinetic.Image.call(this);
	this.setWidth(30);
	this.setHeight(70);
	this.setX(x);
	this.setY(y);
	//this.setFill("gray");
	this.setImage(imagen);//caregamos la imagen
}
//Puerta.prototype = Object.create(Kinetic.Rect.prototype);
Puerta.prototype = Object.create(Kinetic.Image.prototype);
