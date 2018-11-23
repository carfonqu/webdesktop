
var arrUsuarios = [];
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

	 $(document).on('click', '#usuario', function(){ 	
		var imgsrc=$('#order1').attr('src');  
		$('#order2').attr('src','');
		$('#order2').hide();
		$('#order1').show();
		if(imgsrc.trim()== ''){
			$('#order1').attr('src','images/up.png'); 
			 $('#rowContent').html('');
			 ordenarA(arrUsuarios,1);
        	 listaUsuarios(arrUsuarios);
		}else if (imgsrc.trim()== 'images/up.png'){
			$('#order1').attr('src','images/down.png'); 
			$('#rowContent').html('');
			 ordenarA(arrUsuarios,2);
        	 listaUsuarios(arrUsuarios);
		}else{
			$('#order1').attr('src','images/up.png'); 
			$('#rowContent').html('');
			 ordenarA(arrUsuarios,1);
        	 listaUsuarios(arrUsuarios);
		};
	   cargarPropiedades();
	    limpiarC();
	    estado = 1;
	});

	   

	 $(document).on('click', '#nombre', function(){ 	
		var imgsrc=$('#order2').attr('src');  
		$('#order1').attr('src','');
		$('#order1').hide();
		$('#order2').show();
		if(imgsrc.trim()== ''){
			$('#order2').attr('src','images/up.png'); 
			$('#rowContent').html('');
			 ordenarA(arrUsuarios,3);
        	 listaUsuarios(arrUsuarios);
		}else if (imgsrc.trim()== 'images/up.png'){
			$('#order2').attr('src','images/down.png'); 
			$('#rowContent').html('');
			 ordenarA(arrUsuarios,4);
        	 listaUsuarios(arrUsuarios);
		}else{
			$('#order2').attr('src','images/up.png'); 
			$('#rowContent').html('');
			 ordenarA(arrUsuarios,3);
        	 listaUsuarios(arrUsuarios);
		};
		cargarPropiedades();
		limpiarC();
	});



	validarSesion();
	CargarUsuarios();
	CargarRoles();
	limpiarC();
	$('#idUser').focus();

    cargarPropiedades();


	$("#guardarR").click(function() {
		 $("#pMensaje").text("¿Desea guardar la información?");
     	mostrarV('myModal2');
	});

	$("#nuevoR").click(function() {	
		limpiarC();
		$("tbody tr").removeClass("active");
		$('#idUser').focus();
		estado = 1;
	});


	$("#aceptar2").click(function() {	
		var id = $('#idUser').val().trim().toUpperCase();
		var descU = $('#descUser').val().trim();
		var email = $('#email').val().trim();
		var rol = $('#rol option:selected').attr('value');
		var activo = (($("input:radio[name ='activo']:checked").attr('value') == 'si') ? '1' : '0');
		var password = (($("input:radio[name ='password']:checked").attr('value') == 'psi') ? 'si' : 'no');
		var active = (($("input:radio[name ='activeD']:checked").attr('value') == 'ACsi') ? 'S' : 'N');
		cerrarV('myModal2');
		guardarInformacion(id,descU,password,rol,activo,email,active);
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


function CargarUsuarios(){
	MostrarVWait();
	$.ajax({
        type: "POST",
        url: rutaWCF + "UsuariosList",
        data: JSON.stringify({pUsuario: sessionStorage.Usuario.trim(), pSession: sessionStorage.session.trim()}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
        	 CerrarVWait();
        	 limpiarC();
        	 estado = 1;
        	 $('#rowContent').html('');
        	 arrUsuarios = msg;

        	 $("#grid").empty().append('<table class="data" id="myTable01"> <thead> <tr> <th class="shrink"> &nbsp; </th> <th class="shrink2"> <div id="usuario" style="float: left;cursor: pointer;">Usuario</div> <img id="order1" src="" style="float: left;"> </th> <th> <div id="nombre" style="float: left;cursor: pointer;">Nombre</div> <img id="order2" src="" style="float: left;"> </th>  <th><div  style="float: left;">Email</div> </th> <th> <div style="float: left;">Fecha Camb. Pass.</div> </th> <th> <div style="float: left;">Activo</div> </th> <th> <div style="float: left;">Id Rol</div> </th> <th> <div style="float: left;">Rol</div> </th> <th><div  style="float: left;">Active Directory</div> </th> </tr> </thead> <tbody id="rowContent"> </tbody> </table>');

        	 cargarLista();

        	 $('#myTable01').fixedHeaderTable({ footer: false, cloneHeadToFoot: true, altClass: 'odd', autoShow: true });
    		 $('#myTable01').fixedHeaderTable('show', 1000);

             return;
        },
        error: function (e) {
        	clear();
        	CerrarVWait();
             $("#pError").text("Error de conexión, No se pudo obtener la lista de usuarios, intentelo nuevamente o consulte con el administrador del sistema.");
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
        success: function (msg) {
        	 arrRoles = msg;
        	 cargarListaR();
             return;
        },
        error: function (e) {
        	clear();
             $("#pError").text("Error de conexión,No se pudo obtener la lista de roles, intentelo nuevamente o consulte con el administrador del sistema.");
             $('#iMsj').attr('src','./images/errorM.png'); 
             mostrarV('myModal');
             return;
        }

    });
}


function listaUsuarios(arrayF){
    arrayF.map(function (element) {
     
    var activo;
    var active;
    if(element.nActivo == '1'){
    	activo = 'SI';
    }else{
    	activo = 'NO';
    }

    if(element.cLActive == 'S'){
    	active = 'SI';
    }else{
    	active = 'NO';
    }

    var regex = /-?\d+/;
	var match = regex.exec(element.dFechaCambio);
	var fecha = new Date(parseInt(match[0]));


	
	var currentTime = new Date(parseInt(element.dFechaCambio.substr(6)));
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();
	var hour = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	var segundos = currentTime.getSeconds();
	var date = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + segundos;



      $('#rowContent').append(' <tr id="' + element.cUsuario + '"> <td class="fila">  </td> <td class="fila">' + element.cUsuario + '&nbsp;&nbsp;&nbsp;&nbsp;</td> <td class="fila">' + element.cNombre + '</td> <td class="fila">' + element.cEmail + '</td> <td class="fila">' + date + '</td> <td class="fila">' + activo + '</td> <td class="fila">' + element.nidrol + '</td><td class="fila">' + element.cDesRol + '</td><td class="fila">' + active + '</td></tr>');
    });
}


function ordenarA(arrayF,tipo){
	if(tipo==1){
		arrayF.sort(function(x,y){
			 return ((x.cUsuario == y.cUsuario) ? 0 : ((x.cUsuario > y.cUsuario) ? 1 : -1 ));
		});
		return;
	}
	if(tipo==2){
		arrayF.sort(function(x,y){
			return ((y.cUsuario == x.cUsuario) ? 0 : ((y.cUsuario > x.cUsuario) ? 1 : -1 ));
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


function limpiarC(){
	$("#idUser").val("");
	$("#descUser").val("");
	$("#email").val("");

	$('input:radio[name=activo][value=si]').click();
	$('input:radio[name=password][value=pno]').click();
	$('#rol option:first-child').prop('selected',true);
	$('#idUser').prop('readonly', false);
}


function llenarCampos(id){
	var idUser= id;
	var descUser = $('#' + id).find('td:eq(2)').text();

	var email = $('#' + id).find('td:eq(3)').text();

	var activo = $('#' + id).find('td:eq(5)').text();
	var rol = $('#' + id).find('td:eq(7)').text().trim();

	var active = $('#' + id).find('td:eq(8)').text().trim();

	$("#idUser").val(idUser);
	$("#descUser").val(descUser);
	$("#email").val(email);
	if (activo =='SI'){
		$('input:radio[name=activo][value=si]').click();
	}else{
		$('input:radio[name=activo][value=no]').click();
	}

	if (activo =='SI'){
		$('input:radio[name=activeD][value=ACsi]').click();
	}else{
		$('input:radio[name=activeD][value=ACno]').click();
	}


	$('input:radio[name=password][value=pno]').click();
	$('#rol option:contains(' + rol + ')').prop('selected',true);

	$('#idUser').prop('readonly', true);
}


function cargarLista(){
	$('#order1').attr('src',''); 
	$('#order2').attr('src',''); 
	$('#order2').hide();
	$('#order1').hide();
	ordenarA(arrUsuarios,1);
    listaUsuarios(arrUsuarios);
}

function cargarListaR(){
	$('#rol').html();
	arrRoles.map(function (element) {
      $('#rol').append(' <option value="' + element.nIdRol + '">' + element.cDescripcion + ' </option>');
    });
}


function guardarInformacion(id,nombre,password,idRol,activo,email,active){
	if(estado==1 && validaPPantalla('usuario.html',1) != 1){
		$("#pError").text("No tiene permisos para guardar información.");
	     $('#iMsj').attr('src','./images/errorM.png'); 
	     mostrarV('myModal');
	     return;
	}

	if(estado==2 && validaPPantalla('usuario.html',2)!= 1){
		$("#pError").text("No tiene permisos para modificar información.");
	     $('#iMsj').attr('src','./images/errorM.png'); 
	     mostrarV('myModal');
	     return;
	}

	if(nombre.trim()==''){
		 $("#pError").text("Debe digitar el nombre completo para el usuario");
	     $('#iMsj').attr('src','./images/errorM.png'); 
	     mostrarV('myModal');
	     return;
	}

	if(id.trim()==''){
		 $("#pError").text("Debe digitar un usuario Valido.");
	     $('#iMsj').attr('src','./images/errorM.png'); 
	     mostrarV('myModal');
	     return;
	}

	if(email.trim()=='' || !ValidarEmail(email)){
		 $("#pError").text("Debe digitar una dirección de correo valida.");
	     $('#iMsj').attr('src','./images/errorM.png'); 
	     mostrarV('myModal');
	     return;
	}



	if (estado==1){
		MostrarVWait();
		$.ajax({
	        type: "POST",
	        url: rutaWCF + "crearModifUsuario",
	        data: JSON.stringify({pUsuario:id.trim(), pNomUsu: nombre.trim(),pContrasena: password, pIdRol: idRol, activo:activo, pEmail: email,pActive:active, usuModif:sessionStorage.Usuario , pAccion: 0,pUsuarioV: sessionStorage.Usuario.trim(), pSession: sessionStorage.session.trim()}),
	        contentType: "application/json; charset=utf-8",
	        dataType: "json",
	        success: function (msg) {
	        	 CerrarVWait();
	        	if(msg == 1){
	        		$("#pError").text("Usuario registrado correctamente");
		             $('#iMsj').attr('src','./images/info.png'); 
		             mostrarV('myModal');
		             CargarUsuarios();
		             cargarPropiedades();
		             return;
	        	}
	        	else if (msg == 9){
	        		$("#pError").text("El usuario ya existe en la base de datos, favor verifique");
		             $('#iMsj').attr('src','./images/errorM.png'); 
		             mostrarV('myModal');
		             return;
	        	}else{
	        		 $("#pError").text("No se pudo registrar el nuevo usuario, intentelo nuevamente o consulte con el administrador del sistema.");
		             $('#iMsj').attr('src','./images/errorM.png'); 
		             mostrarV('myModal');
		             return;
	        	}
	        },
	        error: function (e) {
	        	clear();
	        	 CerrarVWait();
	             $("#pError").text("Error de conexión, No se pudo registrar el nuevo usuario, intentelo nuevamente o consulte con el administrador del sistema.");
	             $('#iMsj').attr('src','./images/errorM.png'); 
	             mostrarV('myModal');
	             return;
	        }

	    });
	}else{
		MostrarVWait();

		$.ajax({
	        type: "POST",
	        url: rutaWCF + "crearModifUsuario",
	        data: JSON.stringify({pUsuario:id.trim(), pNomUsu: nombre.trim(),pContrasena: '-1', pIdRol: idRol, pactivo:activo,pEmail: email,pActive:active, usuModif:sessionStorage.Usuario.trim() , pAccion: 1,pUsuarioV: sessionStorage.Usuario.trim(), pSession: sessionStorage.session.trim()}),
	        contentType: "application/json; charset=utf-8",
	        dataType: "json",
	        success: function (msg) {
	        	 CerrarVWait();
	        	if(msg == 1){
	        		$("#pError").text("Usuario actualizado correctamente");
		             $('#iMsj').attr('src','./images/info.png'); 
		             mostrarV('myModal');
		             CargarUsuarios();
		             cargarPropiedades();
		             return;
	        	}
	        	else{
	        		 $("#pError").text("No se pudo registrar el nuevo usuario, intentelo nuevamente o consulte con el administrador del sistema.");
		             $('#iMsj').attr('src','./images/errorM.png'); 
		             mostrarV('myModal');
		             return;
	        	}
	        },
	        error: function (e) {
	        	clear();
	        	 CerrarVWait();
	             $("#pError").text("Error de conexión,No se pudo actualizar el nuevo usuario, intentelo nuevamente o consulte con el administrador del sistema.");
	             $('#iMsj').attr('src','./images/errorM.png'); 
	             mostrarV('myModal');
	             return;
	        }

	    });
	}
}




function cargarPropiedades(){
	 $(document).on('click', 'tbody tr', function(){ 
        $("tbody tr").removeClass("active");
        $("#" + this.id).addClass("active");
        llenarCampos(this.id);
        estado = 2;
     });
}



    function ValidarEmail(pemail) {

        var resultado = true
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(pemail) == false) {
            resultado = false;
        }
        return resultado;
    }

