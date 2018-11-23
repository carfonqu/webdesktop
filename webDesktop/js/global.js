
var rutaWCF = "http://172.16.7.4/wcfDesktop/WDService.svc/";
var rutaWCFN = "http://172.16.7.4/wcfAsync/WASYService.svc/";
//var rutaWCF = "http://cgonzalez7684-001-site4.ctempurl.com/wcfDesktop/WDService.svc/";
//var rutaWCFN = "http://cgonzalez7684-001-site4.ctempurl.com/wcfAsync/WASYService.svc/";

function clear(){
		//console.clear();
}



//valida session y permisos en pantalla
function validarSesion(){

    if (!sessionStorage.Usuario || !sessionStorage.session || !sessionStorage.nomUsuario ||  !sessionStorage.idRol) {
        parent.cerrarSesion();
        return;
    }

    if (sessionStorage.Usuario.trim() =="" || sessionStorage.session.trim() ==""  || sessionStorage.nomUsuario.trim() =="" ||  sessionStorage.idRol == 0) {
        parent.cerrarSesion();
        return;
    }



    $.ajax({
        type: "POST",
        url: rutaWCF + "validaSession",
        data: JSON.stringify({ pUsuario: sessionStorage.Usuario.trim(), pSession: sessionStorage.session.trim()}),
        crossDomain: true,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
          if(msg != 1){
             parent.cerrarSesion();
             return;
          }
        },
        error: function (e) {
        	clear();
             parent.cerrarSesion();
             return;
        }

    });
}


function validaPPantalla(pantalla,tipo){
    var respuesta;



     $.ajax({
        type: "POST",
        url: rutaWCF + "Permisos",
        data: JSON.stringify({ pNombreP: pantalla, pUsuario: sessionStorage.Usuario.trim(), pSession: sessionStorage.session.trim()}),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {

            if(msg.nLeer == 0){
                 VentanaError();
            }
            if (tipo==1){
                respuesta = msg.nGuardar;
               
            }else if(tipo==2){
                 respuesta = msg.nModificar;
            }else if(tipo==3){
                 respuesta = msg.nBorrar;
            }else{
                 respuesta = msg.nAdministra;
            }
        },
        error: function (e) {
            clear();
             respuesta = 0;
        }
    });


     return respuesta;
}


function VentanaError(){
     window.open ('error.html','_self',false)
}

function MostrarVWait(){
    $('body').append('<div id="Vwait" class="modalVW" data-accion = "guardar"> <div style="overflow: hidden;margin: 0px auto;width: 300px;height: 300px;"><img style="left: 40%;" src="images/load.gif"/></div></div>');
    $('#Vwait').show();
}

function CerrarVWait(){
     $('#Vwait').hide();
      $('#Vwait').remove();
}