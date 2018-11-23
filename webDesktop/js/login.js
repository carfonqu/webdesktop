



$(document).ready(function(){

    if (typeof (Storage) == "undefined") {
        $('#error').html("NAVEGADOR NO COMPATIBLE POR FAVOR. UTILICE UN NAVEGADOR COMPATIBLE CON HTML5");
    }else{
         sessionStorage.nomUsuario = "";
         sessionStorage.session = "";
    };

     $('#btnprueba').on('click', function () {
        MostrarVWait();
     });


     $('#btnIngreso').on('click', function () {

     	var usuario = $('#username').val().trim();
     	var contrasena =  $('#password').val().trim();
      var tipo = 0;

      if($('#active').is(':checked')) {
          tipo = 1;
      }

      $('#correcto').html();

     	if(usuario ==""){
     		 $('#error').html("Debe digitar un usuario");
     		 return;
     	}


      MostrarVWait();

     	$.ajax({
                type: "POST",
                url: rutaWCF + "ingresarSistema",
                data: JSON.stringify({ pUsuario: usuario, pContrasenaAct: contrasena, ptipo: tipo}),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {

                  CerrarVWait();

                  if(msg.nRespuesta == 3){
                     $('#error').html("Usuario incorrecto. Por favor verifique");
                     return;
                  }

                  if(msg.nRespuesta == 11){
                     $('#error').html("El usuario no se encuentra activo, consulte con el administrador del sistema");
                     return;
                  }

                  if(msg.nRespuesta == 12){
                     $('#error').html("El usuario no está configurado para ingresar con datos del active directory");
                     return;
                  }
                  if(msg.nRespuesta == 13){
                     $('#error').html("El usuario no está configurado como usuario externo.");
                     return;
                  }


                  if(msg.nRespuesta == 0){
                     $('#error').html("Error interno. Consulte con el administrador del sistema");
                    return;
                  }
                  if(msg.nRespuesta == 4){
                     $('#error').html("El usuario o la contraseña es incorrecta. Por favor verifique");
                    return;
                  }
                  if(msg.nRespuesta == 5){
                     $('#error').html("La contraseña ha cauducado. Por favor por favor registre una nueva contraseña");
                      $('#n1').show();
                      $('#n2').show();
                      $('#n3').show();
                      $('#n4').show();

                    return;
                  }

                  if(msg.nRespuesta == 1){
                    sessionStorage.Usuario = usuario;
                    sessionStorage.session = msg.cSession;
                    sessionStorage.nomUsuario = msg.cnomUsuario;
                    sessionStorage.idRol = msg.idRol;
                    sessionStorage.fecha = new Date();
                    $('#username').val("");
                    $('#password').val("");
                    window.open ('desktop.html','_self',false)
                    return;
                  }


                },
                error: function (e) {
                  CerrarVWait();
                  clear();
                    $('#error').html("Existe un error de conexión, por favor vuelva a intentar.");
                }

            }); 	
     });




     $('#btnCambiar').on('click', function () {

        

        var usuario = $('#username').val().trim();
        var contrasena =  $('#password').val().trim();

        var contrasena2 =  $('#password2').val().trim();
        var contrasena3 =  $('#password3').val().trim();

        if(usuario ==""){
             $('#error2').html("Debe digitar un usuario");
             return;
        }

        if(contrasena2 != contrasena3){
             $('#error2').html("Las contraseñas no coinciden");
             return;
        }


        if(contrasena2.length > 30 || contrasena2.length < 5){
             $('#error2').html("La nueva contraseña debe tener entre 5 y 30 caracteres");
             return;
        }

        MostrarVWait();
        $.ajax({
                type: "POST",
                url: rutaWCF + "actualizaContrasena",
                data: JSON.stringify({ pUsuario: usuario, pContrasenaAnt: contrasena, pContrasenaAct: contrasena2}),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {

                  CerrarVWait();

                  if(msg == 3){
                     $('#error2').html("Usuario incorrecto. Por favor verifique");
                     return;
                  }
                  if(msg == 0){
                     $('#error2').html("Error interno. Consulte con el administrador del sistema");
                    return;
                  }
                  if(msg == 7){
                     $('#error2').html("La contraseña anterior es incorrecta. Por favor verifique");
                    return;
                  }
                    

                  if(msg == 1){
                     $('#n1').hide();
                     $('#n2').hide();
                     $('#n3').hide();
                     $('#n4').hide();
                     $('#correcto').html("La contraseña ha sido cambiada correctamente");
                     $('#error').html("");
                     $('#error2').html("");

                     $('#password').val("");
                     $('#password2').val("");
                     $('#password3').val("");
                     return;
                  }


                },
                error: function (e) {
                  CerrarVWait();
                  clear();
                    $('#error').html("Existe un error de conexión, por favor vuelva a intentar.");
                }

            });     
     });



});