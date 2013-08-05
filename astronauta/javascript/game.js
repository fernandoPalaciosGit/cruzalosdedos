//clase del juego:
function Game(){
	Kinetic.Rect.call(this);//constructor heredado
	this.estado = "antes";
	this.puntaje = 0;
	this.llave = false;//estado de la puerta abierta / cerrada
	this.nivel = 1;
}
//clase heredada
Game.prototype = Object.create(Kinetic.Rect.prototype);