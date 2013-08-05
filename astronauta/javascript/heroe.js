/*propiedades que describen al heroe*/
/*no necesita recibir las coord en lel lienzo, xq desde un comienzo aparece en alguna parte del lienzo*/
function Heroe(imagen, animaciones){
	/*para heredar, necesitamos llamar alconstructor del padre*/
	//Kinetic.Rect.call(this);
	Kinetic.Sprite.call(this);
	this.setWidth(40);
	this.setHeight(50);
	this.attrs.image = imagen;//atributos del sprite, imagen del sprite
	this.setAnimations(animaciones);//reglas para utilizar el sprite
	this.setAnimation("caminar");//Kinetic necesita saber con que grupo de animaciones se debe empezar a ejecutar el sprite
	this.estaSaltando = false;
	this.direccion = true;//mover al jugador
	this.vx = 10;
	this.vy = 0;
	this.limiteDer = 0;
	this.direccion = 1;
	this.limiteTope = 0;//relacionado con la altura del stage y la del personaje
	this.contador = 0;
	this.attrs.frameRate = 10;//manipular la velocidad de refresco de las immagenes den el sprite
	//this.setFill("red");
	this.caminar = function(){
		if (this.direccion) this.move(this.vx, 0);//kinetic: velocidad de movimiento
		else{
			this.attrs.drawFunc = function (a){
				var b=this.attrs.animation,c=this.attrs.index,d=this.attrs.animations[b][c],e=a.getContext(),f=this.attrs.image;
				f&&e.drawImage(f,d.x,d.y,d.width,d.height,0,0,d.width,d.height);
			};
			this.setScale({x:1});
			this.direccion = true;
		}
		//si nos encontramos mas alla del limite de la capa, mueve el personaje de regtreso al escenario
		if(this.getX() > this.limiteDer) this.move(this.limiteDer - this.getX(), 0);//mover el personaje hacia  atras
	};
	this.retroceder = function(){
		if(!this.direccion) this.move(-10, 0);//valores numericos por problemas  al girar el personaje
		else{
			this.attrs.drawFunc = function (a){
				var b=this.attrs.animation,c=this.attrs.index,d=this.attrs.animations[b][c],e=a.getContext(),f=this.attrs.image;
				f&&e.drawImage(f,d.x,d.y,d.width,d.height,-d.width,0,d.width,d.height);
			};
			this.setScale({x:-1});
			this.direccion = false;
		}
		if(this.getX() < 0)	this.move(-this.getX(), 0);//moveos una distancia igual a - su posicion
	};
	this.saltar = function(){
		this.estaSaltando = true;
		if(this.vy <= 40){//si NO esta cayendo...estara sobre una plataforma //cantidad muy pequeña de velocidad
			this.setAnimation("saltarFrames");
			this.vy = -15;
			this.contador++;
			//detener el frame-sprite una vez ejecutado
			this.afterFrame(10, function(){//(ultimo numero de frame que ejecute(11 frames), )
				this.estaSaltando = false;
				this.setAnimation("estatico");
			});
		}
	};
	this.aplicarGravedad = function(){
		this.vy += gravedad;//aumentamos la gravedad
		this.move(0, this.vy);//mover el personaje en vertical, para qcaiga
		if((this.getY() + this.getHeight()) > this.limiteTope){//el personaje haga ontacto con el suelo, ostenerse
			this.setY(this.limiteTope - this.getHeight());//devolvemos el personaje al tope
			this.vy = 0;//detenido
			//poder volver a saltar otra vez
			this.contador = 0;
		}
		//controlo la caida
		else if ((this.getY() + this.getHeight()) < this.limiteTope && personaje.vy > 2){
			this.vy -= 0.25;
		}
	};
}
/*heredamos todos los atributos de Kinetic.Rect y se los ofrecemos a Heroe*/
//Heroe.prototype = Object.create(Kinetic.Rect.prototype);
Heroe.prototype = Object.create(Kinetic.Sprite.prototype);