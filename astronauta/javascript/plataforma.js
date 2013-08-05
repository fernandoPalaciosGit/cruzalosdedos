/*propiedades que describen al heroe*/
/*PARAM: coordenadas donde se van a colocar en el lienzo*/
function Plataforma(x, y, imagen){
	//para heredar funcionalidad de otras clases, siempre hay que instanciar tanto de la clae como de su constructor
	Kinetic.Rect.call(this);
	this.setWidth(220);
	this.setHeight(20);
	this.setX(x);
	this.setY(y);
	this.contador = 0;
	//this.setFill("black");
	this.setFillPatternImage(imagen);//metodo que define una imagen que se usa como textura
}
//extendemos la clase de Kinetic.Rect(), xa la Plataforma, y utilizar los metodos de Kinetic con las plataformas
Plataforma.prototype = Object.create(Kinetic.Rect.prototype);
function PlataformaFin(x, y, w, h, imagen){
	//para heredar funcionalidad de otras clases, siempre hay que instanciar tanto de la clae como de su constructor
	Kinetic.Rect.call(this);
	this.setWidth(w);
	this.setHeight(h);
	this.setX(x);
	this.setY(y);
	this.contador = 0;
	//this.setFill("black");
	this.setFillPatternImage(imagen);//metodo que define una imagen que se usa como textura
}
//extendemos la clase de Kinetic.Rect(), xa la Plataforma, y utilizar los metodos de Kinetic con las plataformas
PlataformaFin.prototype = Object.create(Kinetic.Rect.prototype);