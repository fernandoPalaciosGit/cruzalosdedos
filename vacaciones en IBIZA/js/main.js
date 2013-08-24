$(document).ready(init);
function init()
{
	var thumblinks = $("#slider .thumblinks li");
	var thumbnails = $("#slider .thumbnails li");
	thumbnails.on("mouseenter", mostrarCartela)
				 .on("mouseleave", mostrarCartela)
				 .on("click", musica);
	thumblinks.find("a").on("click", mostrarFoto);
}
function mutearMusica()
{
	var v = document.getElementsByTagName("audio")[0];
	v.pause();
}
function tocarMusica()
{
	var v = document.getElementsByTagName("audio")[0];
	if($("audio").hasClass("off")){
		$("audio").removeClass("off");
		v.volume=0.1;
		v.play();
	}else{
		v.play();
	}
}
/*mostrar notas en cada foto con un evento de hover*/
function mostrarFoto(event)
{
	/*evitar que el enlace a cada foto rompa la visibilidad de la ventana
	(con anclas intra documentales). Por defecto en el navegador*/
	event.preventDefault();
	var reference = $(this).attr("href");
	var listFoto = $(reference);/*elegimos la imagen*/
	var thumbnails = $(this).closest("#slider").find(".thumbnails");
	thumbnails.prepend(listFoto);/*la añadimos como primer hijo a la lista*/
}
function musica()
{
	icono = $("#musica");
	console.log(icono);
	if(icono.hasClass("icon-headphones")){
		icono.removeClass("icon-headphones");
		icono.toggleClass("icon-volume-mute");
		tocarMusica();
	}else{
		icono.removeClass("icon-volume-mute");
		icono.toggleClass("icon-headphones");
		mutearMusica();
	}
}
function mostrarCartela()
{
	$(this).find("span").slideToggle();
	$('div[class*="icon"]').toggleClass('resplandor');
}