
var arrRoles = [];
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

	    $(document).on('click', '#id', function(){ 	
		var imgsrc=$('#order1').attr('src');  
		$('#order2').attr('src','');
		$('#order2').hide();
		$('#order1').show();
		if(imgsrc.trim()== ''){
			$('#order1').attr('src','images/up.png'); 
			 $('#rowContent').html('');
			 ordenarA(arrRoles,1);
        	 listaRoles(arrRoles);
		}else if (imgsrc.trim()== 'images/up.png'){
			$('#order1').attr('src','images/down.png'); 
			$('#rowContent').html('');
			 ordenarA(arrRoles,2);
        	 listaRoles(arrRoles);
		}else{
			$('#order1').attr('src','images/up.png'); 
			$('#rowContent').html('');
			 ordenarA(arrRoles,1);
        	 listaRoles(arrRoles);
		};
	   cargarPropiedades();
	    mostrarOcultar(1);
	    estado = 1;
	});

	 $(document).on('click', '#descripcion', function(){ 		
		var imgsrc=$('#order2').attr('src');  
		$('#order1').attr('src','');
		$('#order1').hide();
		$('#order2').show();
		if(imgsrc.trim()== ''){
			$('#order2').attr('src','images/up.png'); 
			$('#rowContent').html('');
			 ordenarA(arrRoles,3);
        	 listaRoles(arrRoles);
		}else if (imgsrc.trim()== 'images/up.png'){
			$('#order2').attr('src','images/down.png'); 
			$('#rowContent').html('');
			 ordenarA(arrRoles,4);
        	 listaRoles(arrRoles);
		}else{
			$('#order2').attr('src','images/up.png'); 
			$('#rowContent').html('');
			 ordenarA(arrRoles,3);
        	 listaRoles(arrRoles);
		};
		cargarPropiedades();
		mostrarOcultar(1);
	});

	validarSesion();
	CargarRoles();
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
		var id = $('#idRol').val().trim();
		var descR = $('#descRol').val().trim();
		cerrarV('myModal2');
		if($('#myModal2').data('accion').trim() == 'guardar'){
			guardarInformacion(id,descR);
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


function CargarRoles(){
	MostrarVWait();
	$.ajax({
        type: "POST",
        url: rutaWCF + "RolesList",
        data: JSON.stringify({pUsuario: sessionStorage.Usuario.trim(), pSession: sessionStorage.session.trim()}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
        	 CerrarVWait();
        	 mostrarOcultar(1);
        	 estado = 1;
        	 $('#rowContent').html('');
        	 arrRoles = msg;
        	 $("#grid").empty().append('<table class="data" id="myTable01"> <thead> <tr> <th class="shrink"> &nbsp; </th> <th class="shrink2"> <div id="id" style="float: left;cursor: pointer;">Id Rol</div> <img id="order1" src="" style="float: left;"> </th> <th> <div id="descripcion" style="float: left;cursor: pointer;">Descripción</div> <img id="order2" src="" style="float: left;"> </th> </tr> </thead> <tbody id="rowContent"> </tbody> </table>');
        	 cargarLista();
        	 $('#myTable01').fixedHeaderTable({ footer: false, cloneHeadToFoot: true, altClass: 'odd', autoShow: true });
    		 $('#myTable01').fixedHeaderTable('show', 1000);
             return;
        },
        error: function (e) {
        	clear();
        	CerrarVWait();
             $("#pError").text("Error de conexion, No se pudo obtener la lista de roles, intentelo nuevamente o consulte con el administrador del sistema.");
             $('#iMsj').attr('src','./images/errorM.png'); 
             mostrarV('myModal');
             return;
        }

    });
}


function listaRoles(arrayF){
    arrayF.map(function (element) {
      $('#rowContent').append(' <tr id="' + element.nIdRol + '"> <td class="fila"> <img src="images/icons/trash.png" class="icono" /> </td> <td class="fila">' + element.nIdRol + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td> <td class="fila">' + element.cDescripcion+ '</td> </tr>');
    });
}


function ordenarA(arrayF,tipo){
	if(tipo==1){
		arrayF.sort(function(x,y){
			return x.nIdRol - y.nIdRol; 
		});
		return;
	}
	if(tipo==2){
		arrayF.sort(function(x,y){
			return y.nIdRol - x.nIdRol; 
		});
		return;
	}
	if(tipo==3){
		arrayF.sort(function(x,y){
			 return ((x.cDescripcion == y.cDescripcion) ? 0 : ((x.cDescripcion > y.cDescripcion) ? 1 : -1 ));
		});
		return;
	}
	if(tipo==4){
		arrayF.sort(function(x,y){
			return ((y.cDescripcion == x.cDescripcion) ? 0 : ((y.cDescripcion > x.cDescripcion) ? 1 : -1 ));
		});
		return;
	}
}


function mostrarOcultar(tipo){
	if(tipo==1){
		$("#lidRol").hide();
		$("#idRol").hide();
		$("#descRol").val('');
		$('#descRol').focus();
	}else{
		$("#lidRol").show();
		$("#idRol").show();
	}
}


function llenarCampos(id){
	var idRol= id;
	var descRol = $('#' + id).find('td:eq(2)').text();
	$("#idRol").val(idRol);
	$("#descRol").val(descRol);
}


function cargarLista(){
	$('#order1').attr('src',''); 
	$('#order2').attr('src',''); 
	$('#order2').hide();
	$('#order1').hide();
	ordenarA(arrRoles,1);
    listaRoles(arrRoles);
}


function guardarInformacion(id,descripcion){
	

	if(estado==1 && validaPPantalla('rol.html',1) != 1){
		$("#pError").text("No tiene permisos para guardar información.");
	     $('#iMsj').attr('src','./images/errorM.png'); 
	     mostrarV('myModal');
	     return;
	}


	if(estado==2 && validaPPantalla('rol.html',2)!= 1){
		$("#pError").text("No tiene permisos para modificar información.");
	     $('#iMsj').attr('src','./images/errorM.png'); 
	     mostrarV('myModal');
	     return;
	}


	if(descripcion.trim()==''){
		 $("#pError").text("Debe digitar un nombre de rol valido.");
	     $('#iMsj').attr('src','./images/errorM.png'); 
	     mostrarV('myModal');
	     return;
	}



	if (estado==1){
		MostrarVWait();
		$.ajax({
	        type: "POST",
	        url: rutaWCF + "crearModifRol",
	        data: JSON.stringify({idRol:"0", pNomRol: descripcion.trim(), pAccion: 0,pUsuario: sessionStorage.Usuario.trim(), pSession: sessionStorage.session.trim()}),
	        contentType: "application/json; charset=utf-8",
	        dataType: "json",
	        success: function (msg) {
	        	 CerrarVWait();
	        	if(msg == 1){
	        		$("#pError").text("Registro agregado correctamente");
		             $('#iMsj').attr('src','./images/info.png'); 
		             mostrarV('myModal');
		             CargarRoles();
		             cargarPropiedades();
		             return;
	        	}else{
	        		$("#pError").text("No se pudo agregar el nuevo rol, intentelo nuevamente o consulte con el administrador del sistema.");
		             $('#iMsj').attr('src','./images/errorM.png'); 
		             mostrarV('myModal');
		             return;
	        	}
	        },
	        error: function (e) {
	        	clear();
	        	 cerrarV('myModal3');
	             $("#pError").text("Error de conexión, No se pudo agregar el nuevo rol, intentelo nuevamente o consulte con el administrador del sistema.");
	             $('#iMsj').attr('src','./images/errorM.png'); 
	             mostrarV('myModal');
	             return;
	        }

	    });
	}else{
		MostrarVWait();
		$.ajax({
	        type: "POST",
	        url: rutaWCF + "crearModifRol",
	        data: JSON.stringify({idRol:id.trim(), pNomRol: descripcion.trim(), pAccion: 1,pUsuario: sessionStorage.Usuario.trim(), pSession: sessionStorage.session.trim()}),
	        contentType: "application/json; charset=utf-8",
	        dataType: "json",
	        success: function (msg) {
	        	CerrarVWait();
	        	if(msg == 1){
	        		$("#pError").text("Registro modificado correctamente correctamente");
		             $('#iMsj').attr('src','./images/info.png'); 
		             mostrarV('myModal');
		             CargarRoles();
		             cargarPropiedades();
					return;
	        	}else{
	        		CerrarVWait();
	        		$("#pError").text("No se pudo actualizar el rol, intentelo nuevamente o consulte con el administrador del sistema.");
		             $('#iMsj').attr('src','./images/errorM.png'); 
		             mostrarV('myModal');
		             return;
	        	}
	        },
	        error: function (e) {
	        	clear();
	        	CerrarVWait();
	             $("#pError").text("Error de conexión, No se pudo actualizar el rol, intentelo nuevamente o consulte con el administrador del sistema.");
	             $('#iMsj').attr('src','./images/errorM.png'); 
	             mostrarV('myModal');
	             return;
	        }

	    });
	}




}


function eliminarRegistro(id){
	
	if(validaPPantalla('rol.html',3) != 1){
		 $("#pError").text("No tiene permisos para eliminar registros.");
	     $('#iMsj').attr('src','./images/errorM.png'); 
	     mostrarV('myModal');
	     return;
	}


	var nombre = "";
	MostrarVWait();
	$.ajax({
	        type: "POST",
	        url: rutaWCF + "crearModifRol",
	        data: JSON.stringify({idRol:id.trim(), pNomRol:nombre, pAccion: 2,pUsuario: sessionStorage.Usuario.trim(), pSession: sessionStorage.session.trim()}),
	        contentType: "application/json; charset=utf-8",
	        dataType: "json",
	        success: function (msg) {
	        	 CerrarVWait();
	        	if(msg == 1){
	        		$("#pError").text("Registro eliminado correctamente");
		             $('#iMsj').attr('src','./images/info.png'); 
		             mostrarV('myModal');
		             CargarRoles();
		             cargarPropiedades();
		             return;
	        	}else{
	        		$("#pError").text("No se pudo eliminar el rol, verifique no tenga usuarios y permisos asignados.");
		             $('#iMsj').attr('src','./images/errorM.png'); 
		             mostrarV('myModal');
		             return;
	        	}
	        },
	        error: function (e) {
	        	clear();
	        	CerrarVWait();
	             $("#pError").text("Error de conexión, No se pudo eliminar el rol, verifique no tenga usuarios y permisos asignados.");
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