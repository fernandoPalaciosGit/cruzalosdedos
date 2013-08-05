function Moneda(x, y, imagen){
	//Kinetic.Rect.call(this);
	Kinetic.Image.call(this);
	this.setWidth(30);
	this.setHeight(30);
	this.setX(x);
	this.setY(y);
	//this.setFill("yellow");
	this.setImage(imagen);
}
//Moneda.prototype = Object.create(Kinetic.Rect.prototype);
Moneda.prototype = Object.create(Kinetic.Image.prototype);