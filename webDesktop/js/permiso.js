
var arrPermisos = [];
var arrRoles = [];
var arrPantallas = [];
var estado = 1;
var idPant = '0';


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

	    $(document).on('click', '#pantallaN', function(){	
		var imgsrc=$('#order1').attr('src');  
		$('#order2').attr('src','');
		$('#order2').hide();
		$('#order1').show();
		if(imgsrc.trim()== ''){
			$('#order1').attr('src','images/up.png'); 
			 $('#rowContent').html('');
			 ordenarA(arrPermisos,1);
        	 listaPermisos(arrPermisos);
		}else if (imgsrc.trim()== 'images/up.png'){
			$('#order1').attr('src','images/down.png'); 
			$('#rowContent').html('');
			 ordenarA(arrPermisos,2);
        	 listaPermisos(arrPermisos);
		}else{
			$('#order1').attr('src','images/up.png'); 
			$('#rowContent').html('');
			 ordenarA(arrPermisos,1);
        	 listaPermisos(arrPermisos);
		};
	   cargarPropiedades();
	    limpiarC();
	    estado = 1;
	});

	 $(document).on('click', '#identificador', function(){		
		var imgsrc=$('#order2').attr('src');  
		$('#order1').attr('src','');
		$('#order1').hide();
		$('#order2').show();
		if(imgsrc.trim()== ''){
			$('#order2').attr('src','images/up.png'); 
			$('#rowContent').html('');
			 ordenarA(arrPermisos,3);
        	 listaPermisos(arrPermisos);
		}else if (imgsrc.trim()== 'images/up.png'){
			$('#order2').attr('src','images/down.png'); 
			$('#rowContent').html('');
			 ordenarA(arrPermisos,4);
        	 listaPermisos(arrPermisos);
		}else{
			$('#order2').attr('src','images/up.png'); 
			$('#rowContent').html('');
			 ordenarA(arrPermisos,3);
        	 listaPermisos(arrPermisos);
		};
		cargarPropiedades();
		limpiarC();
	});



	validarSesion();

	CargarRoles();
	CargarPantallas();
	CargarPermisos();
	limpiarC();
	$('#idUser').focus();
    cargarPropiedades();





	$("#guardarR").click(function() {
		 $("#pMensaje").text("¿Desea guardar la información?");
  		 $('#myModal2').data('accion','guardar');
     	mostrarV('myModal2');
	});

	$("#nuevoR").click(function() {	
		limpiarC();
		$("tbody tr").removeClass("active");
		$('#idUser').focus();
		estado = 1;
	});


	$("#aceptar2").click(function() {	
		
		var idPantalla;
		var idRol = $('#rol option:selected').attr('value');

		if(estado!=1){
			idPantalla = idPant;
		}else{
			idPantalla = $('#pantalla option:selected').attr('value'); 
		}


		var guardar = (($("input:radio[name ='guardar']:checked").attr('value') == 'gsi') ? '1' : '0');
		var modificar = (($("input:radio[name ='modificar']:checked").attr('value') == 'msi') ? '1' : '0');
		var eliminar = (($("input:radio[name ='eliminar']:checked").attr('value') == 'esi') ? '1' : '0');
		var administra = (($("input:radio[name ='administra']:checked").attr('value') == 'adsi') ? '1' : '0');
		cerrarV('myModal2');
		if($('#myModal2').data('accion').trim() == 'guardar'){
			guardarInformacion(idPantalla,idRol,guardar,modificar,eliminar,administra);
		}else{
			idPantalla = idPant; 
			eliminarRegistro(idPantalla,idRol);
		}	
	});

	$( "#rol" ).change(function() {
	  CargarPantallas();
	  CargarPermisos();
	  cargarPropiedades();
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


function CargarPermisos(){
	MostrarVWait();
	var rol = $('#rol option:selected').attr('value');

	$.ajax({
        type: "POST",
        url: rutaWCF + "PermisosList",
        data: JSON.stringify({idRol:rol, pUsuario: sessionStorage.Usuario.trim(), pSession: sessionStorage.session.trim(),tipoL:1}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
        	 CerrarVWait();
        	 limpiarC();
        	 estado = 1;
        	 $('#rowContent').html('');
        	 arrPermisos = msg;
        	  $("#grid").empty().append('<table class="data" id="myTable01"> <thead> <tr> <th class="shrink"> &nbsp; </th> <th class="shrink2"> <div id="pantallaN" style="float: left;cursor: pointer;">Objeto</div> <img id="order1" src="" style="float: left;"> </th> <th> <div id="identificador" style="float: left;cursor: pointer;">Identificador</div> <img id="order2" src="" style="float: left;"> </th> <th> <div style="float: left;">Guardar</div> </th> <th> <div style="float: left;">Modificar</div> </th> <th> <div style="float: left;">Eliminar</div> </th> <th> <div style="float: left;">Administra</div> </th></tr> </thead> <tbody id="rowContent"> </tbody> </table>');
        	 cargarLista();
        	 $('#myTable01').fixedHeaderTable({ footer: false, cloneHeadToFoot: true, altClass: 'odd', autoShow: true });
    		 $('#myTable01').fixedHeaderTable('show', 1000);
             return;
        },
        error: function (e) {
        	clear();
        	CerrarVWait();
        	 clear();
             $("#pError").text("Eror de conexion, No se pudo obtener la lista de permisos, intentelo nuevamente o consulte con el administrador del sistema.");
             $('#iMsj').attr('src','./images/errorM.png'); 
             mostrarV('myModal');
             return;
        }

    });
}



function CargarRoles(){
	$.ajax({
        type: "POST",
        url: rutaWCF + "RolesList",
        data: JSON.stringify({pUsuario: sessionStorage.Usuario.trim(), pSession: sessionStorage.session.trim()}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (msg) {
        	 arrRoles = msg;
        	 cargarListaR();
             return;
        },
        error: function (e) {
        	 clear();
             $("#pError").text("Error de conexión, No se pudo obtener la lista de roles, intentelo nuevamente o consulte con el administrador del sistema.");
             $('#iMsj').attr('src','./images/errorM.png'); 
             mostrarV('myModal');
             return;
        }

    });
}


function CargarPantallas(){
	 $('#pantalla').html('');
	var rol = $('#rol option:selected').attr('value');
	$.ajax({
        type: "POST",
        url: rutaWCF + "PermisosList",
        data: JSON.stringify({idRol:rol, pUsuario: sessionStorage.Usuario.trim(), pSession: sessionStorage.session.trim(),tipoL:0}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
        	 arrPantallas = msg;
        	 cargarListaP();
             return;
        },
        error: function (e) {
        	clear();
        	cerrarV('myModal3');
             $("#pError").text("Error de conexión, No se pudo obtener la lista de pantallas, intentelo nuevamente o consulte con el administrador del sistema.");
             $('#iMsj').attr('src','./images/errorM.png'); 
             mostrarV('myModal');
             return;
        }

    });
}


function listaPermisos(arrayF){

    arrayF.map(function (element) {
	   var guardar = ((element.nGuardar == '1') ? 'SI' : 'NO');
	   var modificar = ((element.nModificar == '1') ? 'SI' : 'NO');
	   var eliminar = ((element.nBorrar == '1') ? 'SI' : 'NO');
	   var administra = ((element.nAdministra == '1') ? 'SI' : 'NO');
	   $('#rowContent').append('<tr id="' + element.nidPantalla + '"> <td class="fila"> <img src="images/icons/trash.png" class="icono" /> </td> <td class="fila">' + element.cnombreP + '&nbsp;&nbsp;&nbsp;&nbsp;</td> <td class="fila">' + element.cNombreT + '</td> <td class="fila">' + guardar + '</td> <td class="fila">' + modificar + '</td> <td class="fila">' + eliminar + '</td><td class="fila">' + administra + '</td></tr>');
    });
}


function ordenarA(arrayF,tipo){
	if(tipo==1){
		arrayF.sort(function(x,y){
			 return ((x.cnombreP == y.cnombreP) ? 0 : ((x.cnombreP > y.cnombreP) ? 1 : -1 ));
		});
		return;
	}
	if(tipo==2){
		arrayF.sort(function(x,y){
			return ((y.cnombreP == x.cnombreP) ? 0 : ((y.cnombreP > x.cnombreP) ? 1 : -1 ));
		});
		return;
	}
	if(tipo==3){
		arrayF.sort(function(x,y){
			 return ((x.cNombreT == y.cNombreT) ? 0 : ((x.cNombreT > y.cNombreT) ? 1 : -1 ));
		});
		return;
	}
	if(tipo==4){
		arrayF.sort(function(x,y){
			return ((y.cNombreT == x.cNombreT) ? 0 : ((y.cNombreT > x.cNombreT) ? 1 : -1 ));
		});
		return;
	}
}


function limpiarC(){

	$('input:radio[name=guardar][value=gsi]').click(); 
	$('input:radio[name=modificar][value=msi]').click();
	$('input:radio[name=eliminar][value=esi]').click();
	$('input:radio[name=administra][value=adsi]').click();
	CargarPantallas();
}


function llenarCampos(id){
	idPant= id;
	var pantalla = $('#' + id).find('td:eq(1)').text();
	var identificador = $('#' + id).find('td:eq(2)').text();
	var guardar = $('#' + id).find('td:eq(3)').text();
	var modificar = $('#' + id).find('td:eq(4)').text();
	var eliminar = $('#' + id).find('td:eq(5)').text();
	var administra = $('#' + id).find('td:eq(6)').text();

	if (guardar =='SI'){
		$('input:radio[name=guardar][value=gsi]').click();
	}else{
		$('input:radio[name=guardar][value=gno]').click();
	}

	if (modificar =='SI'){
		$('input:radio[name=modificar][value=msi]').click();
	}else{
		$('input:radio[name=modificar][value=mno]').click();
	}


	if (eliminar =='SI'){
		$('input:radio[name=eliminar][value=esi]').click();
	}else{
		$('input:radio[name=eliminar][value=eno]').click();
	}

	if (administra =='SI'){
		$('input:radio[name=administra][value=adsi]').click();
	}else{
		$('input:radio[name=administra][value=adno]').click();
	}

	$("#lpantalla").hide();
	$("#pantalla").hide();
}


function cargarLista(){
	$('#order1').attr('src',''); 
	$('#order2').attr('src',''); 

	$('#order1').hide();
	$('#order2').hide();

	ordenarA(arrPermisos,1);
    listaPermisos(arrPermisos);
}

function cargarListaR(){
	$('#rol').html();
	arrRoles.map(function (element) {
      $('#rol').append(' <option value="' + element.nIdRol + '">' + element.cDescripcion + ' </option>');
    });
}

function cargarListaP(){
	$('#pantalla').html();
	arrPantallas.map(function (element) {
      $('#pantalla').append(' <option value="' + element.nidPantalla + '">' + element.cnombreP + ' </option>');
    });
    $("#lpantalla").show();
	$("#pantalla").show();
}


function guardarInformacion(idPantalla,idRol,guardar,modificar,eliminar,administra){
	if(estado==1 && validaPPantalla('permiso.html',1) != 1){
		$("#pError").text("No tiene permisos para guardar información.");
	     $('#iMsj').attr('src','./images/errorM.png'); 
	     mostrarV('myModal');
	     return;
	}



	if(estado==2 && validaPPantalla('permiso.html',2)!= 1){
		$("#pError").text("No tiene permisos para modificar información.");
	     $('#iMsj').attr('src','./images/errorM.png'); 
	     mostrarV('myModal');
	     return;
	}


	if(idPantalla === undefined || idPantalla === null){
		$("#pError").text("Debe escoger una pantalla.");
	     $('#iMsj').attr('src','./images/errorM.png'); 
	     mostrarV('myModal');
	     return;
	}



	if (estado==1){
		MostrarVWait();
		$.ajax({
	        type: "POST",
	        url: rutaWCF + "crearModifPermiso",
	        data: JSON.stringify({pidPantalla:idPantalla, pidRol:idRol,pleer:1,pguardar:guardar, pmodificar:modificar, pborrar:eliminar,pAdmin:administra,pAccion:0,pUsuario: sessionStorage.Usuario.trim(), pSession: sessionStorage.session.trim()}),
	        contentType: "application/json; charset=utf-8",
	        dataType: "json",
	        success: function (msg) {
	        	 CerrarVWait();
	        	if(msg == 1){
	        		$("#pError").text("Permisos asignados correctamente");
		             $('#iMsj').attr('src','./images/info.png'); 
		             mostrarV('myModal');
		             CargarPermisos();
		             cargarPropiedades();
		             return;
	        	}
	        	else{
	        		 $("#pError").text("No se pudo asignar los permisos, intentelo nuevamente o consulte con el administrador del sistema.");
		             $('#iMsj').attr('src','./images/errorM.png'); 
		             mostrarV('myModal');
		             return;
	        	}
	        },
	        error: function (e) {
	        	clear();
	        	 CerrarVWait();
	             $("#pError").text("Error de conexión, No se pudo asignar los permisos, intentelo nuevamente o consulte con el administrador del sistema.");
	             $('#iMsj').attr('src','./images/errorM.png'); 
	             mostrarV('myModal');
	             return;
	        }

	    });
	}else{
		MostrarVWait();
		$.ajax({
	        type: "POST",
	        url: rutaWCF + "crearModifPermiso",
	        data: JSON.stringify({pidPantalla:idPantalla, pidRol:idRol,pleer:1,pguardar:guardar, pmodificar:modificar, pborrar:eliminar,pAdmin:administra,pAccion:1,pUsuario: sessionStorage.Usuario.trim(), pSession: sessionStorage.session.trim()}),
	        contentType: "application/json; charset=utf-8",
	        dataType: "json",
	        success: function (msg) {
	        	 CerrarVWait();
	        	if(msg == 1){
	        		$("#pError").text("Permisos modificados correctamente");
		             $('#iMsj').attr('src','./images/info.png'); 
		             mostrarV('myModal');
		             CargarPermisos();
		             cargarPropiedades();
		             return;
	        	}
	        	else{
	        		 $("#pError").text("No se pudo modificar los permisos, intentelo nuevamente o consulte con el administrador del sistema.");
		             $('#iMsj').attr('src','./images/errorM.png'); 
		             mostrarV('myModal');
		             return;
	        	}
	        },
	        error: function (e) {
	        	clear();
	        	 CerrarVWait();
	             $("#pError").text("Error de conexión, No se pudo asignar los permisos, intentelo nuevamente o consulte con el administrador del sistema.");
	             $('#iMsj').attr('src','./images/errorM.png'); 
	             mostrarV('myModal');
	             return;
	        }

	    });
	}
}


function eliminarRegistro(idpantalla,idrol){
	if(validaPPantalla('permiso.html',3) != 1){
		 $("#pError").text("No tiene permisos para eliminar registros.");
	     $('#iMsj').attr('src','./images/errorM.png'); 
	     mostrarV('myModal');
	     return;
	}
	var nombre = "";
	MostrarVWait();
		$.ajax({
	        type: "POST",
	        url: rutaWCF + "crearModifPermiso",
	        data: JSON.stringify({pidPantalla:idpantalla, pidRol:idrol,pleer:0,pguardar:0, pmodificar:0, pborrar:0,pAccion:2,pUsuario: sessionStorage.Usuario.trim(), pSession: sessionStorage.session.trim()}),
	        contentType: "application/json; charset=utf-8",
	        dataType: "json",
	        success: function (msg) {
	        	 CerrarVWait();
	        	if(msg == 1){
	        		$("#pError").text("Permiso eliminado correctamente");
		             $('#iMsj').attr('src','./images/info.png'); 
		             mostrarV('myModal');
		             CargarPermisos();
		             cargarPropiedades();
		             return;
	        	}
	        	else{
	        		 $("#pError").text("No se pudo eliminar el permiso, intentelo nuevamente o consulte con el administrador del sistema.");
		             $('#iMsj').attr('src','./images/errorM.png'); 
		             mostrarV('myModal');
		             return;
	        	}
	        },
	        error: function (e) {
	        	clear();
	        	 CerrarVWait();
	             $("#pError").text("Error de conexión, No se pudo eliminar el permiso, intentelo nuevamente o consulte con el administrador del sistema.");
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
        estado = 2;
     });

    $(document).on('click', 'tbody tr td img', function(){ 
        $("#pMensaje").text("¿Desea eliminar el registro?");
  		 $('#myModal2').data('accion','eliminar');
	 	 $('#myModal2').data('idR',$(this).parent().parent().attr('id'));
     	mostrarV('myModal2');
     });
}


