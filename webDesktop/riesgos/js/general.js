



$(document).ready(function() {
	 $("#primero").removeClass("closed");
     $("#primero").addClass("opened");
     $("#primeroh").removeClass("toggle");
     $("#primeroh").addClass("toggle-active");
     $('.container_12 .Menu_screen').hide();



     $(".contenedor div").mousedown(function(){
     	$(".contenedor div").removeClass("active");
		$(this).addClass("active");
		 $('.container_12 .Menu_screen').hide();



		 if(this.id=='item1'){

		 	$('#xml1').show();
		 }else if(this.id=='item2'){

		 	$('#xml2').show();
		 }
	 });
});




