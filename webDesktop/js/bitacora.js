
var arrRegistros = [];
var arrUsuarios = [];
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

	$(document).on('click', '#idUsuario', function(){ 
		var imgsrc=$('#order1').attr('src');  
		$('#order2').attr('src','');
		$('#order2').hide();
		$('#order1').show();
		if(imgsrc.trim()== ''){
			$('#order1').attr('src','images/up.png'); 
			 $('#rowContent').html('');
			 ordenarA(arrRegistros,1);
        	 listaRegistros(arrRegistros);
		}else if (imgsrc.trim()== 'images/up.png'){
			$('#order1').attr('src','images/down.png'); 
			$('#rowContent').html('');
			 ordenarA(arrRegistros,2);
        	 listaRegistros(arrRegistros);
		}else{
			$('#order1').attr('src','images/up.png'); 
			$('#rowContent').html('');
			 ordenarA(arrRegistros,1);
        	 listaRegistros(arrRegistros);
		};
	   cargarPropiedades();
	});


	 $(document).on('click', '#fecha', function(){ 	
		var imgsrc=$('#order2').attr('src');  
		$('#order1').attr('src','');
		$('#order1').hide();
		$('#order2').show();
		if(imgsrc.trim()== ''){
			$('#order2').attr('src','images/up.png'); 
			$('#rowContent').html('');
			 ordenarA(arrRegistros,3);
        	 listaRegistros(arrRegistros);
		}else if (imgsrc.trim()== 'images/up.png'){
			$('#order2').attr('src','images/down.png'); 
			$('#rowContent').html('');
			 ordenarA(arrRegistros,4);
        	 listaRegistros(arrRegistros);
		}else{
			$('#order2').attr('src','images/up.png'); 
			$('#rowContent').html('');
			 ordenarA(arrRegistros,3);
        	 listaRegistros(arrRegistros);
		};
		cargarPropiedades();
	});





	validarSesion();
	cargarRegistros("TODOS",formatDate(new Date()) + " 00:00:00",formatDate(new Date()) + " 23:59:59");
	CargarUsuarios();

	$('#descRol').focus();

	$("#consultar").click(function() {

		var usuario = $('#usuario option:selected').attr('value');
		if(new Date($("#fechaI").val() + " 00:00:00") == "Invalid Date" ){
			 $("#pError").text("La fecha inicial es invalida");
	         $('#iMsj').attr('src','./images/errorM.png'); 
	         mostrarV('myModal');
			return
		}

		if(new Date($("#fechaF").val() + " 23:59:59") == "Invalid Date" ){
			 $("#pError").text("La fecha final es invalida");
	         $('#iMsj').attr('src','./images/errorM.png'); 
	         mostrarV('myModal');
			return
		}


		 var fechai = $("#fechaI").val() + " 00:00:00";
		 var fechaf = $("#fechaF").val() + " 23:59:59";
		cargarRegistros(usuario,fechai,fechaf);
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


function cargarRegistros(usuario,fechai,fechaf){
	MostrarVWait();

	var fechaInicial = new Date(fechai).toMSJSON();
	var fechaFinal = new Date(fechaf).toMSJSON();

	$.ajax({
        type: "POST",
        url: rutaWCF + "BitacoraList",
        data: JSON.stringify({pUsuario: sessionStorage.Usuario.trim(), pSession: sessionStorage.session.trim(), pFechaI:fechaInicial, pFechaF: fechaFinal, pUsuarioB:usuario}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
        	 CerrarVWait();
        	 $('#rowContent').html('');
        	 arrRegistros = msg;
        	 $("#grid").empty().append('<table class="data" id="myTable01"> <thead> <tr> <th class="shrink"> &nbsp; </th> <th class="shrink2"> <div id="id" style="float: left;">ID</div> </th> <th class="shrink2"> <div id="idUsuario" style="float: left;cursor: pointer;">Usuario</div> <img id="order1" src="" style="float: left;"> </th> <th> <div id="fecha" style="float: left;cursor: pointer;">Fecha</div> <img id="order2" src="" style="float: left;"> </th> <th> <div id="pantalla" style="float: left;">Pantalla</div> </th> <th> <div id="accion" style="float: left;">Acción</div> </th> <th> <div id="resultado" style="float: left;">Resultado</div> </th> </tr> </thead> <tbody id="rowContent"> </tbody> </table>');
        	 cargarLista();
        	 $('#myTable01').fixedHeaderTable({ footer: false, cloneHeadToFoot: true, altClass: 'odd', autoShow: true });
    		 $('#myTable01').fixedHeaderTable('show', 1000);
             return;
        },
        error: function (xhr, status, error) {

        	console.log(xhr.responseText);
        	clear();
        	CerrarVWait();
             $("#pError").text("Error de conexion, No se pudo obtener los registros de la bit, intentelo nuevamente o consulte con el administrador del sistema.");
             $('#iMsj').attr('src','./images/errorM.png'); 
             mostrarV('myModal');
             return;
        }

    });
}


function CargarUsuarios(){
	$.ajax({
        type: "POST",
        url: rutaWCF + "UsuariosList",
        data: JSON.stringify({pUsuario: sessionStorage.Usuario.trim(), pSession: sessionStorage.session.trim()}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
        	 arrUsuarios = msg;
        	 cargarListaU();
             return;
        },
        error: function (e) {
        	 clear();
             $("#pError").text("Error de conexión, No se pudo obtener la lista de usuarios, intentelo nuevamente o consulte con el administrador del sistema.");
             $('#iMsj').attr('src','./images/errorM.png'); 
             mostrarV('myModal');
             return;
        }

    });
}

function cargarListaU(){
	$('#usuario').html();
	$('#usuario').append(' <option value="TODOS"> TODOS </option>');
	arrUsuarios.map(function (element) {
      $('#usuario').append(' <option value="' + element.cUsuario + '">' + element.cUsuario + ' </option>');
    });

}


function listaRegistros(arrayF){
   	//var cont = 1;
    arrayF.map(function (element) {
    	
    	var currentTime = new Date(parseInt(element.dFecha.substr(6)));
		var month = currentTime.getMonth() + 1;
		var day = currentTime.getDate();
		var year = currentTime.getFullYear();
		var hour = currentTime.getHours();
		var minutes = currentTime.getMinutes();
		var segundos = currentTime.getSeconds();
		var date = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + segundos;

      $('#rowContent').append('<tr id="' + element.nId + '"><td class="fila"></td> <td class="fila">' + element.nId + '</td> <td class="fila">' + element.cUsuario + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td> <td class="fila">' + date + '</td><td class="fila">' + element.cPantalla+ '</td> <td class="fila"> <span class="desBit" style="color: blue;cursor: pointer;">' + element.cAccion.substring(0,10) + '...'   + '</span></td> <td class="fila">' + element.cResultado + '</td></tr>');
   	  //cont++;
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
			return ((x.cUsuario == y.cUsuario) ? 0 : ((x.cUsuario > y.cUsuario) ? 1 : -1 ));
		});
		return;
	}
	if(tipo==3){
		arrayF.sort(function(x,y){
			 return ((x.dFecha == y.dFecha) ? 0 : ((x.dFecha > y.dFecha) ? 1 : -1 ));
		});
		return;
	}
	if(tipo==4){
		arrayF.sort(function(x,y){
			return ((y.dFecha == x.dFecha) ? 0 : ((y.dFecha > x.dFecha) ? 1 : -1 ));
		});
		return;
	}
}

function cargarLista(){
	$('#order1').attr('src',''); 
	$('#order2').attr('src',''); 
	$('#order2').hide();
	$('#order1').hide();
	//ordenarA(arrRegistros,1);
    listaRegistros(arrRegistros);
}





function cargarPropiedades(){
	 $(document).on('click', 'tbody tr', function(){ 
        $("tbody tr").removeClass("active");
        $("#" + this.id).addClass("active");
        estado = 2;
     });

     $(document).on('click', '.desBit', function(){ 
       
     	var id = $(this).parent().parent().attr('id')
     	var msj     	
        arrRegistros.map(function (element) {
    		if(element.nId == id){
    			msj = element.cAccion
    			console.log(msj);
    			 $("#pMensajeB").text(msj);
    			 mostrarV('myModalM');
    			return
    		}
	    });	

       
     });
}

function formatDate(value)
{
   return value.getMonth()+1 + "/" + value.getDate() + "/" + value.getYear();
}

Date.prototype.toMSJSON = function () {
    var date = '/Date(' + this.getTime() + ')/'; //CHANGED LINE
    return date;
};


