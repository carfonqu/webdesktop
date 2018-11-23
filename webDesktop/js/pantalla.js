var arrPantallas = [];
var estado = 1;


$(document).ready(function() {

	$(document).bind("mousemove keypress", function () {
	    var date1 = new Date();
	    var diff = Math.abs(date1 - Date.parse(sessionStorage.fecha));
	    var diffM = Math.floor((diff/1000)/60);
	    if(diffM > 5){
	       parent.cerrarSesion();
	    }
	    sessionStorage.fecha = new Date();
	});


	$(document).on('click', '#idP', function(){ 
		var imgsrc=$('#order1').attr('src');  
		$('#order2').attr('src','');
		$('#order2').hide();
		$('#order1').show();
		if(imgsrc.trim()== ''){
			$('#order1').attr('src','images/up.png'); 
			 $('#rowContent').html('');
			 ordenarA(arrPantallas,1);
        	 listaPantallas(arrPantallas);
		}else if (imgsrc.trim()== 'images/up.png'){
			$('#order1').attr('src','images/down.png'); 
			$('#rowContent').html('');
			 ordenarA(arrPantallas,2);
        	 listaPantallas(arrPantallas);
		}else{
			$('#order1').attr('src','images/up.png'); 
			$('#rowContent').html('');
			 ordenarA(arrPantallas,1);
        	 listaPantallas(arrPantallas);
		};
	   cargarPropiedades();
	    mostrarOcultar(1);
	    estado = 1;
	});


	 $(document).on('click', '#nombreP', function(){ 	
		var imgsrc=$('#order2').attr('src');  
		$('#order1').attr('src','');
		$('#order1').hide();
		$('#order2').show();
		if(imgsrc.trim()== ''){
			$('#order2').attr('src','images/up.png'); 
			$('#rowContent').html('');
			 ordenarA(arrPantallas,3);
        	 listaPantallas(arrPantallas);
		}else if (imgsrc.trim()== 'images/up.png'){
			$('#order2').attr('src','images/down.png'); 
			$('#rowContent').html('');
			 ordenarA(arrPantallas,4);
        	 listaPantallas(arrPantallas);
		}else{
			$('#order2').attr('src','images/up.png'); 
			$('#rowContent').html('');
			 ordenarA(arrPantallas,3);
        	 listaPantallas(arrPantallas);
		};
		cargarPropiedades();
		mostrarOcultar(1);
	});
	
	validarSesion();
	CargarPantallas();
	mostrarOcultar(1);

	$('#descRol').focus();
    cargarPropiedades();






	$("#guardarR").click(function() {
		 $("#pMensaje").text("¿Desea guardar la información?");
  		 $('#myModal2').data('accion','guardar');
     	mostrarV('myModal2');
	});

	$("#nuevoR").click(function() {	
		mostrarOcultar(1);
		$("tbody tr").removeClass("active");
		estado = 1;


	});


	$("#aceptar2").click(function() {	
		var id = $('#idpantalla').val().trim();
		var nombre = $('#nombre').val().trim();
		var descripcion = $('#descripcion').val().trim();
		var divId = $('#idDiv').val().trim();

		var ubicacion = (($("input:radio[name ='ubicacion']:checked").attr('value') == 'Usi') ? 'MENU_ITEM' : 'ADMINISTRACION');


		var ejex = $('#ejex').val().trim();
		var ejey = $('#ejey').val().trim();
		var imageU = $('#imageU').val().trim();

		var imageP = $('#imageP').val().trim();
		var cheight = $('#cheight').val().trim();
		var cwidth = $('#cwidth').val().trim();
		var frHeiht = $('#frHeiht').val().trim();
		var cLeft = $('#cLeft').val().trim();
		var cTop = $('#cTop').val().trim();
		var direccion = $('#direccion').val().trim();


		cerrarV('myModal2');
		if($('#myModal2').data('accion').trim() == 'guardar'){
			guardarInformacion(id,nombre,descripcion,divId,ubicacion,ejex,ejey,imageU,imageP,cheight,cwidth,frHeiht,cLeft,cTop,direccion);
		}else{
			eliminarRegistro(id);
		};
	});

});


function mostrarV(id){
    var modal = document.getElementById(id); 
    modal.style.display = "block";
}


function cerrarV(id) {
    var modal = document.getElementById(id);
    modal.style.display = "none";

}


function CargarPantallas(){
	MostrarVWait();
	$.ajax({
        type: "POST",
        url: rutaWCF + "PantallasList",
        data: JSON.stringify({pUsuario: sessionStorage.Usuario.trim(), pSession: sessionStorage.session.trim()}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
        	 CerrarVWait();
        	 mostrarOcultar(1);
        	 estado = 1;
        	 $('#rowContent').html('');
        	 arrPantallas = msg;
        	 $("#grid").empty().append('<table class="data" id="myTable01"> <thead> <tr> <th class="shrink"> &nbsp; </th> <th class="shrink2"> <div id="idP" style="float: left;cursor: pointer;">Id Pantalla</div> <img id="order1" src="" style="float: left;"> </th> <th> <div id="nombreP" style="float: left;cursor: pointer;">Título</div> <img id="order2" src="" style="float: left;"> </th> <th> <div style="float: left;">Nombre</div> </th> <th> <div style="float: left;">Tipo</div> </th> <th> <div style="float: left;">Ubicación</div> </th> <th> <div style="float: left;">UbI. Eje X</div> </th> <th> <div style="float: left;">UbI. Eje Y</div> </th> <th> <div style="float: left;">Icono G</div> </th> <th> <div style="float: left;">Icono P</div> </th> <th> <div style="float: left;">height</div> </th> <th> <div style="float: left;">Width</div> </th> <th> <div style="float: left;">Frm. Height</div> </th> <th> <div style="float: left;">P. Left</div> </th> <th> <div style="float: left;">P. Top</div> </th> <th> <div style="float: left;">Ruta</div> </th> </tr> </thead> <tbody id="rowContent"> </tbody> </table>');
        	 cargarLista();
        	 $('#myTable01').fixedHeaderTable({ footer: false, cloneHeadToFoot: true, altClass: 'odd', autoShow: true });
    		 $('#myTable01').fixedHeaderTable('show', 1000);
             return;
        },
        error: function (e) {
        	clear();
        	CerrarVWait();
             $("#pError").text("Error de conexión, No se pudo obtener la lista de pantallas, intentelo nuevamente o consulte con el administrador del sistema.");
             $('#iMsj').attr('src','./images/errorM.png'); 
             mostrarV('myModal');
             return;
        }

    });
}


function listaPantallas(arrayF){
    arrayF.map(function (element) {
      $('#rowContent').append(' <tr id="' + element.nidPantalla + '"> <td class="fila"> <img src="images/icons/trash.png" class="icono" /> </td> <td class="fila">' + element.nidPantalla + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td> <td class="fila">' + element.cNombre+ '</td> <td class="fila">' + element.cDescripcion+ '</td> <td class="fila">' + element.cNombreT+ '</td><td class="fila">' + element.cUbicacion+ '</td><td class="fila">' + element.cEjeX+ '</td><td class="fila">' + element.cEjeY+ '</td><td class="fila">' + element.cImageU+ '</td>   <td class="fila">' + element.cImageI+ '</td><td class="fila">' + element.cHeight+ '</td><td class="fila">' + element.cWidth+ '</td><td class="fila">' + element.cVFrHeight+ '</td><td class="fila">' + element.vLeft+ '</td><td class="fila">' + element.vTop+ '</td><td class="fila">' + element.cDireccion+ '</td></tr>');
    });
}


function ordenarA(arrayF,tipo){
	if(tipo==1){
		arrayF.sort(function(x,y){
			return x.nidPantalla - y.nidPantalla; 
		});
		return;
	}
	if(tipo==2){
		arrayF.sort(function(x,y){
			return y.nidPantalla - x.nidPantalla; 
		});
		return;
	}
	if(tipo==3){
		arrayF.sort(function(x,y){
			 return ((x.cNombre == y.cNombre) ? 0 : ((x.cNombre > y.cNombre) ? 1 : -1 ));
		});
		return;
	}
	if(tipo==4){
		arrayF.sort(function(x,y){
			return ((y.cNombre == x.cNombre) ? 0 : ((y.cNombre > x.cNombre) ? 1 : -1 ));
		});
		return;
	}
}


function mostrarOcultar(tipo){
	if(tipo==1){
		$("#lidPantalla").hide();
		$("#idpantalla").hide();
		$("#nombre").val('');
		$("#descripcion").val('');
		$("#idDiv").val('');

		$("#ubicacion").val('');
		$("#ejex").val('');
		$("#ejey").val('');
		$("#imageU").val('');

		$("#imageP").val('');
		$("#cheight").val('');
		$("#cwidth").val('');
		$("#frHeiht").val('');
		$("#cLeft").val('');
		$("#cTop").val('');
		$("#direccion").val('');



		$('#nombre').focus();
	}else{
		$("#lidPantalla").show();
		$("#idpantalla").show();
	}
}


function llenarCampos(id){
	var idPantalla= id;
	var nombre = $('#' + id).find('td:eq(2)').text();
	var descripcion = $('#' + id).find('td:eq(3)').text();
	var idDiv = $('#' + id).find('td:eq(4)').text();

	var ubicacion = $('#' + id).find('td:eq(5)').text();

	var ejex = $('#' + id).find('td:eq(6)').text();
	var ejey = $('#' + id).find('td:eq(7)').text();
	var imageU = $('#' + id).find('td:eq(8)').text();

	var imageP = $('#' + id).find('td:eq(9)').text();
	var cheight = $('#' + id).find('td:eq(10)').text();
	var cwidth = $('#' + id).find('td:eq(11)').text();
	var frHeiht = $('#' + id).find('td:eq(12)').text();
	var cLeft = $('#' + id).find('td:eq(13)').text();
	var cTop = $('#' + id).find('td:eq(14)').text();
	var direccion = $('#' + id).find('td:eq(15)').text();

	$("#idpantalla").val(idPantalla);
	$("#nombre").val(nombre);
	$("#descripcion").val(descripcion);
	$("#idDiv").val(idDiv);

	$("#ubicacion").val(ubicacion);
	if (ubicacion =='MENU_ITEM'){
		$('input:radio[name=ubicacion][value=Usi]').click();
	}else{
		$('input:radio[name=ubicacion][value=Uno]').click();
	}





	$("#ejex").val(ejex);
	$("#ejey").val(ejey);
	$("#imageU").val(imageU);

	$("#imageP").val(imageP);
	$("#cheight").val(cheight);
	$("#cwidth").val(cwidth);
	$("#frHeiht").val(frHeiht);
	$("#cLeft").val(cLeft);
	$("#cTop").val(cTop);
	$("#direccion").val(direccion);




}


function cargarLista(){
	$('#order1').attr('src',''); 
	$('#order2').attr('src',''); 
	$('#order2').hide();
	$('#order1').hide();
	ordenarA(arrPantallas,1);
    listaPantallas(arrPantallas);
}


function guardarInformacion(id,nombre,descripcion,divId,ubicacion,ejex,ejey,imageU,imageP,cheight,cwidth,frHeiht,cLeft,cTop,direccion){
	




	if(estado==1 && validaPPantalla('pantalla.html',1) != 1){
		$("#pError").text("No tiene permisos para guardar información.");
	     $('#iMsj').attr('src','./images/errorM.png'); 
	     mostrarV('myModal');
	     return;
	}

	if(estado==2 && validaPPantalla('pantalla.html',2)!= 1){
		$("#pError").text("No tiene permisos para modificar información.");
	     $('#iMsj').attr('src','./images/errorM.png'); 
	     mostrarV('myModal');
	     return;
	}

	if(nombre.trim()==''){
		 $("#pError").text("Debe digitar un nombre de pantalla valido.");
	     $('#iMsj').attr('src','./images/errorM.png'); 
	     mostrarV('myModal');
	     return;
	}

	if(descripcion.trim()==''){
		 $("#pError").text("Debe digitar una descripción valida.");
	     $('#iMsj').attr('src','./images/errorM.png'); 
	     mostrarV('myModal');
	     return;
	}

	if(divId.trim()==''){
		 $("#pError").text("Debe digitar identificador valido.");
	     $('#iMsj').attr('src','./images/errorM.png'); 
	     mostrarV('myModal');
	     return;
	}

	if (estado==1){
		MostrarVWait();
		$.ajax({
	        type: "POST",
	        url: rutaWCF + "crearModifPantalla",
	        data: JSON.stringify({pidPantalla:0, pNomPant: nombre.trim(),pDescPant: descripcion.trim(), pNombreT:divId,pUbicacion:ubicacion,pEjeX:ejex,pEjeY:ejey,pImageU:imageU,pImageI:imageP,pHeight:cheight,pWidth:cwidth,pVFrHeight:frHeiht,pLeft:cLeft,pTop:cTop,pDireccion:direccion, pAccion: 0,pUsuario: sessionStorage.Usuario.trim(), pSession: sessionStorage.session.trim()}),
	        contentType: "application/json; charset=utf-8",
	        dataType: "json",
	        success: function (msg) {
	        	CerrarVWait();
	        	if(msg == 1){
	        		$("#pError").text("Registro agregado correctamente");
		             $('#iMsj').attr('src','./images/info.png'); 
		             mostrarV('myModal');
		             CargarPantallas();
		             cargarPropiedades();
		             return;
	        	}else{
	        		$("#pError").text("No se pudo agregar la nueva pantalla, intentelo nuevamente o consulte con el administrador del sistema.");
		             $('#iMsj').attr('src','./images/errorM.png'); 
		             mostrarV('myModal');
		             return;
	        	}
	        },
	        error: function (e) {
	        	clear();
	        	CerrarVWait();
	             $("#pError").text("Error de conexión, no se pudo agregar la nueva pantalla, intentelo nuevamente o consulte con el administrador del sistema.");
	             $('#iMsj').attr('src','./images/errorM.png'); 
	             mostrarV('myModal');
	             return;
	        }

	    });
	}else{
		MostrarVWait();
		$.ajax({
	        type: "POST",
	        url: rutaWCF + "crearModifPantalla",
	        data: JSON.stringify({pidPantalla:id, pNomPant: nombre.trim(),pDescPant: descripcion.trim(), pNombreT:divId,pUbicacion:ubicacion,pEjeX:ejex,pEjeY:ejey,pImageU:imageU,pImageI:imageP,pHeight:cheight,pWidth:cwidth,pVFrHeight:frHeiht,pLeft:cLeft,pTop:cTop,pDireccion:direccion, pAccion: 1,pUsuario: sessionStorage.Usuario.trim(), pSession: sessionStorage.session.trim()}),
	        contentType: "application/json; charset=utf-8",
	        dataType: "json",
	        success: function (msg) {
	        	 CerrarVWait();
	        	if(msg == 1){
	        		$("#pError").text("Registro modificado correctamente");
		             $('#iMsj').attr('src','./images/info.png'); 
		             mostrarV('myModal');
		             CargarPantallas();
		             cargarPropiedades();
		             return;
	        	}else{
	        		$("#pError").text("No se pudo modificar los datos de la pantalla, intentelo nuevamente o consulte con el administrador del sistema.");
		             $('#iMsj').attr('src','./images/errorM.png'); 
		             mostrarV('myModal');
		             return;
	        	}
	        },
	        error: function (e) {
	        	clear();
	        	 CerrarVWait();
	             $("#pError").text("Error de conexión, No se pudo modificar los datos de la pantalla, intentelo nuevamente o consulte con el administrador del sistema.");
	             $('#iMsj').attr('src','./images/errorM.png'); 
	             mostrarV('myModal');
	             return;
	        }

	    });
	}




}


function eliminarRegistro(id){
	if(validaPPantalla('permiso.html',3) != 1){
		 $("#pError").text("No tiene permisos para eliminar registros.");
	     $('#iMsj').attr('src','./images/errorM.png'); 
	     mostrarV('myModal');
	     return;
	}
	var nombre = "";
	var descripcion = "";
	var divId = "";
	MostrarVWait();
	$.ajax({
	        type: "POST",
	        url: rutaWCF + "crearModifPantalla",
	       data: JSON.stringify({pidPantalla:id.trim(), pNomPant: nombre.trim(),pDescPant: descripcion.trim(), pNombreT:divId,pUbicacion:ubicacion,pEjeX:ejex,pEjeY:ejey,pImageU:imageU,pImageI:imageP,pHeight:cheight,pWidth:cwidth,pVFrHeight:frHeiht,pLeft:cLeft,pTop:cTop,pDireccion:direccion, pAccion: 3,pUsuario: sessionStorage.Usuario.trim(), pSession: sessionStorage.session.trim()}),
	        contentType: "application/json; charset=utf-8",
	        dataType: "json",
	        success: function (msg) {
	        	 CerrarVWait();
	        	if(msg == 1){
	        		$("#pError").text("Registro eliminado correctamente");
		             $('#iMsj').attr('src','./images/info.png'); 
		             mostrarV('myModal');
		             CargarPantallas();
		             cargarPropiedades();
		             return;
	        	}else{
	        		$("#pError").text("No se pudo eliminar la pantalla, intentelo nuevamente o consulte con el administrador del sistema.");
		             $('#iMsj').attr('src','./images/errorM.png'); 
		             mostrarV('myModal');
		             return;
	        	}
	        },
	        error: function (e) {
	        	clear();
	        	 CerrarVWait();
	             $("#pError").text("Error de conexión, No se pudo eliminar los datos de la pantalla, intentelo nuevamente o consulte con el administrador del sistema.");
	             $('#iMsj').attr('src','./images/errorM.png'); 
	             mostrarV('myModal');
	             return;
	        }

	    });
}


function cargarPropiedades(){
	 $(document).on('click', 'tbody tr', function(){ 
        $("tbody tr").removeClass("active");
        $("#" + this.id).addClass("active");
        llenarCampos(this.id);
        mostrarOcultar(2);
        estado = 2;
     });

    $(document).on('click', 'tbody tr td img', function(){ 	
  		 $("#pMensaje").text("¿Desea eliminar el registro?");
  		 $('#myModal2').data('accion','eliminar');
	 	 $('#myModal2').data('idR',$(this).parent().parent().attr('id'));
     	mostrarV('myModal2');
    });
}

