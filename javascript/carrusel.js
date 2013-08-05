window.addEventListener("load", init());
function init(){
	console.log("cargado: carrusel.js");

	(function($, window, undefined){
		/*INSTRUCCION jQuery*/
		$.fn.marquesina = function(prev, sig){
			/*this == $("#marco")*/
			/*recorrera y aplicara la funcion a todos loas elementos hijos*/
			return this.each(function(){
				/*ahora estamos en <ul>;  jQuery*/
				var container = $(this).children();/*ahora a todos los <li>*/

				/*informacion de los list items*/
				var fotos = container.children();
				var cantidad = fotos.length;
				var incremento = fotos.outerWidth(true);/*tamaño del marco mas los bordes*/
				var anchoMArquesina = $(this).width();/*el ancho del ul que es lo que se muestra: 2*<li>*/				var itemMarquesina = Math.round(anchoMArquesina/incremento);

				container.css("width", ((cantidad + itemMarquesina)*incremento)+50);//50px mas para evitar el error
				for(var i = 0;i<itemMarquesina;i++){/*le añadimos al ul, los 2 elementos de la marquesina*/
					container.append(fotos.eq(i).clone());
				}


				var estaMoviendo = false;
				var primerElemento = 1;

				$(sig).on("click", function(event){
					event.preventDefault();


					if(!estaMoviendo){/*si esta quieto, animamos*/

						if(primerElemento>cantidad){
							primerElemento=2;
							container.css("left", "0px");
						}else{
							primerElemento++;
						}
						estaMoviendo=true;
						/*movemos hacia la izq. un ancho de un <li>*/
						container.animate({
							left : "-="+incremento
						}, "swing", function(){
							estaMoviendo = false;/*cuando acabe la animacion volvemos al estado falso*/
						});
					}
				});

				$(prev).on("click", function(event){
					event.preventDefault();


					if(!estaMoviendo){/*si esta quieto, animamos*/

						if(primerElemento == 1){
							container.css("left", cantidad*incremento*-1);
							primerElemento=cantidad;
						}else{
							primerElemento--;
						}

						estaMoviendo=true;
						/*movemos hacia la izq. un ancho de un <li>*/
						container.animate({
							left : "+="+incremento
						}, "swing", function(){
							estaMoviendo = false;/*cuando acabe la animacion volvemos al estado falso*/
						});
					}

				});

			});

		};

	})(jQuery, window);
}
