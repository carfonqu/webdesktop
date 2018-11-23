

/*----Funciones para la creación de formularios------------------------------ */
var Ventana_MINIM = 0;
var Ventana_NORMAL = 1;
var Ventana_MAXIM = 2;
var arrayP; //arreglo que almacena las ventanas a las cuales tiene acceso
var arrayListaN;




//Prototipo
Ventana.prototype.Titulo = '';

//Ventana.prototype.Nombre = '';
Ventana.prototype.Url = '';
Ventana.prototype.ClienteId = '';
Ventana.prototype.Mostrar = Ventana_Mostrar;
Ventana.prototype.Refrescar = Ventana_Refrescar;
Ventana.prototype.Minimizar = Ventana_Minimizar;
Ventana.prototype.Cerrar = Ventana_Cerrar;
Ventana.prototype.FocusFrame = Ventana_FocusFrame;
Ventana.prototype.CrearVentana = Ventana_CrearVentana;
Ventana.prototype.Focus = Ventana_Focus;
Ventana.prototype.ClickPanelBar = Ventana_ClickPanelBar;
Ventana.prototype.Obj = null;
Ventana.prototype.FrameObj = null;
Ventana.prototype.TituloObj = null;
Ventana.prototype.IsVisible = false;
Ventana.prototype.IsHidden = false;
Ventana.prototype.MenuObj = null;
Ventana.prototype.State = Ventana_NORMAL;
Ventana.prototype.PrevState = Ventana_NORMAL;
//Ventana.prototype.Coord = new CWindowCoordinates(0, 0, 0, 0);


function Ventana(Nombre, Padre, UrlImg, height, width,fHeight,Vleft,Vtop) {
    this.Nombre = Nombre;
    this.ClienteId = Nombre;
    this.Padre = Padre
    this.UrlImg = UrlImg;
    this.Prueba = Ventana_Prueba;
    this.height = height;
    this.width = width;
    this.fHeight = fHeight;
    this.Vleft = Vleft;
    this.Vtop = Vtop;
}

String.Format = function (text) {

    if (arguments.length <= 1) {
        return text;
    }

    var tokenCount = arguments.length - 2;
    for (var token = 0; token <= tokenCount; token++) {
        text = text.replace(new RegExp("\\{" + token + "\\}", "gi"),
                                                arguments[token + 1]);
    }
    return text;
}

function AddEvent(elemento, evt, fnc, useCapture) {
    if (elemento.addEventListener) {
        elemento.addEventListener(evt, fnc, useCapture);
    }
    else {
        elemento.attachEvent(evt, fnc, useCapture);
    }
}


function Ventana_CrearVentana() {

    if (this.Obj == null) {
        var oDiv = document.createElement("DIV");
        oDiv.id = "div" + this.Nombre;
        oDiv.className = "abs window";
        oDiv.addEventListener("click", _winHandler.FocusW);
        oDiv.style.height = this.height;
        oDiv.style.width = this.width;
        oDiv.style.top = this.Vtop;
        oDiv.style.left = this.Vleft;

        var oTitle = document.createElement("DIV");
        oTitle.className = "window_top";

        
        //oTitle.innerText = this.Title;

        var oTextTi = document.createElement("SPAN");
        oTextTi.className = "float_left";

        var oImgTi = document.createElement("IMG");
        oImgTi.src = this.UrlImg;
        oImgTi.href="#"
        
        var oATexto = document.createElement("a");
        oATexto.innerText = this.Titulo;
        
        

        var oBotonTi = document.createElement("SPAN");
        oBotonTi.className = "float_right";

        var oBtnMin = document.createElement("a");
        oBtnMin.className = "window_min";
        oBtnMin.href = "#";
        oBtnMin.id = this.ClienteId + "_minimize";
        oBtnMin.addEventListener("click", this.Minimizar);



        var oBtnRes = document.createElement("a");
        oBtnRes.className = "window_resize";
        oBtnRes.href = "#";
        oBtnRes.id = this.ClienteId + "_refresh";
        oBtnRes.addEventListener("click", this.Refrescar);



        

        var oBtnClo = document.createElement("a");
        oBtnClo.className = "window_close";
        oBtnClo.href = "#";
        oBtnClo.id = this.ClienteId + "_close";
        oBtnClo.addEventListener("click", this.Cerrar);

        oTextTi.appendChild(oImgTi);
        oTextTi.appendChild(oATexto);

        oBotonTi.appendChild(oBtnMin);
        oBotonTi.appendChild(oBtnRes);
        oBotonTi.appendChild(oBtnClo);

        oTitle.appendChild(oTextTi);
        oTitle.appendChild(oBotonTi);

        oDiv.appendChild(oTitle);
        
        document.getElementById(this.Padre).appendChild(oDiv);

        this.TituloObj = oTitle;
        this.Obj = oDiv;
        oTitle.ID = this.Nombre;
        //Se registra la ventana en la lista de objetos
       _winHandler.Add(this);

    }
}


function Ventana_Refrescar() {
    var oFrm;
    _winHandler.FocusB(this.id);
    if (_winHandler.CurrentWindow.FrameObj) {
        oFrm = _winHandler.CurrentWindow.FrameObj;
        var src = oFrm.src;
        oFrm.src = "";
        oFrm.src = src;
    }
}


function Ventana_FocusFrame() {

    _winHandler.FocusB(this.id);

}

function Ventana_Minimizar() {
    //this.Focus();
    _winHandler.FocusB(this.id);

    _winHandler.CurrentWindow.PrevState = _winHandler.CurrentWindow.State;
    _winHandler.CurrentWindow.State = Ventana_MINIM;
    _winHandler.CurrentWindow.IsVisible = false;

    //_winHandler.CurrentWindow.Obj.classList.remove('show');
    //_winHandler.CurrentWindow.Obj.classList.add('hide');
    _winHandler.CurrentWindow.Obj.style.display = 'none';
}

function Ventana_Cerrar() {
    

    //  _winHandler.FocusB(this.id);
    // //this.Focus();
    // //this = Ventana2;
    // var answer = confirm("¿Desea cerrar esta ventana?")
    // if (answer) {
    //     _winHandler.CurrentWindow.Obj.removeChild(_winHandler.CurrentWindow.FrameObj);
    //     _winHandler.CurrentWindow.FrameObj = null;
        

    //     document.getElementById(_winHandler.CurrentWindow.Padre).removeChild(_winHandler.CurrentWindow.Obj);
    //     _winHandler.CurrentWindow.Obj = null;
    //     _winHandler.CurrentWindow.IsVisible = false;
    //     _winHandler.Remove(_winHandler.CurrentWindow);
    // }



    var idClose = this.id;



    var btnAceptar = document.getElementById('yes');
    btnAceptar.addEventListener("click", function () {
         // _winHandler.FocusB(idClose); 
        //this.Focus();
        //this = Ventana2;
        //var answer = confirm("¿Desea cerrar esta ventana?")
        //if (answer) {

            if (_winHandler.CurrentWindow != null){
                _winHandler.CurrentWindow.Obj.removeChild(_winHandler.CurrentWindow.FrameObj);
                _winHandler.CurrentWindow.FrameObj = null;
                document.getElementById(_winHandler.CurrentWindow.Padre).removeChild(_winHandler.CurrentWindow.Obj);
                _winHandler.CurrentWindow.Obj = null;
                _winHandler.CurrentWindow.IsVisible = false;
                _winHandler.Remove(_winHandler.CurrentWindow);
            }
        
        var modal2 = document.getElementById('myModal');
        modal2.style.display = "none";

    });


    var modal = document.getElementById('myModal');
    modal.style.display = "block";
}


function Ventana_Mostrar(src, Titulo) {
    var oFrm;
    this.Titulo = Titulo;
    this.CrearVentana();
    
    if (this.FrameObj)
        oFrm = this.FrameObj;
    else {
        var oLoader = document.createElement("DIV");
        oLoader.className = "loader";

        var oImgLoad = document.createElement("IMG");
        oImgLoad.src = "images/gui/loader.gif";
        oImgLoad.className = "loaderImg";
        oImgLoad.alt = ""

        var oPloader = document.createElement("P");
        oPloader.style.fontWeight = "bold";
        oPloader.innerText = "CARGANDO...";

        oLoader.appendChild(oImgLoad);
        oLoader.appendChild(oPloader);



        oFrm = document.createElement("IFRAME");
        this.FrameObj = oFrm;
        this.FrameObj.setAttribute("frameborder", "0");
        this.Obj.appendChild(oFrm);
        oFrm.onload = function () {
            oLoader.style.visibility = "hidden";

        };

        oFrm.src = src;
        oFrm.className = "DeskPanel_Frame";
        oFrm.height = this.fHeight;
        this.State = Ventana_NORMAL;

        oFrm.id = "frm" + this.Nombre;
        this.Obj.appendChild(oLoader);
    }
    
    this.Obj.style.display = "";
    this.IsVisible = true;
    this.Focus();
}

function Ventana_Focus() {
    if (_winHandler.CurrentWindow != null) {
        if (_winHandler.CurrentWindow.ClienteId == this.ClienteId)
            return;
    }

    _winHandler.CurrentWindow = this;
    _winHandler.ProcessOrder();
}

function Ventana_Prueba() {
    alert("si ingresó");
}

function _PSGet(clienteId) {
  
    var def = document.getElementById(this.Padre).FindControlByClientId(clienteId);
    

    if (def != null){
        
        return def.Obj;
    } else {
        
        return null;
    }
}


function Ventana_ClickPanelBar() {
    if (!_winHandler.CurrentWindow.IsVisible) {
        _winHandler.CurrentWindow.State = _winHandler.CurrentWindow.PrevState;
        _winHandler.CurrentWindow.IsVisible = true;
        _winHandler.CurrentWindow.Obj.style.display = '';
        //_winHandler.CurrentWindow.Obj.classList.add('show');
        //_winHandler.CurrentWindow.Obj.classList.remove('hide');
    }
    this.Focus();
}




CWinHandler.prototype.ZIndexStart = 100;
CWinHandler.prototype.NewWindowIndex = 0;
CWinHandler.prototype.WindowList = new Array();
CWinHandler.prototype.MenuList = new Object();
CWinHandler.prototype.Add = CWinHandler_Add;
CWinHandler.prototype.Remove = CWinHandler_Remove;
CWinHandler.prototype.ProcessOrder = CWinHandler_ProcessOrder;
//CWinHandler.prototype.GetNextZIndex = CWinHandler_GetNextZIndex;
//CWinHandler.prototype.CreateNewWindow = CWinHandler_CreateNewWindow;
//CWinHandler.prototype.RegisterPnlInfoIframe = CWinHandler_RegisterPnlInfoIframe;
//CWinHandler.prototype.RefreshPnlInfoIframe = CWinHandler_RefreshPnlInfoIframe;
CWinHandler.prototype.CurrentWindow = null;
CWinHandler.prototype.PnlInfoIframe = null;
CWinHandler.prototype.MenuBarObj = null;
CWinHandler.prototype.InitMenuBar = CWinHandler_InitMenuBar;
CWinHandler.prototype.AddMenu = CWinHandler_AddMenu;
CWinHandler.prototype.Asign = CWinHandler_Asign;
CWinHandler.prototype.Buscar = CWinHandler_Buscar;
CWinHandler.prototype.FocusW = CWinHandler_FocusW;
CWinHandler.prototype.FocusB = CWinHandler_FocusB;
CWinHandler.prototype.OcultarT = CWinHandler_OcultarT;

//constructor
function CWinHandler() {
}

function CWinHandler_InitMenuBar() {
    //Creamos la barra

    var divContainer = document.getElementById("bar_bottom");
    this.MenuBarObj = document.getElementById("bar_bottom");
    
  
}

function CWinHandler_AddMenu(id, text, src) {
    this.MenuBarObj = document.getElementById("bar_bottom");

    
    
    var div = document.createElement("a");
    div.className = "float_left";
    div.id = id;
    //div.innerText = text;
    div.title = text;
    //div.href = "#"

    var oImgbar = document.createElement("IMG");
    oImgbar.src = src;
    oImgbar.height = 22;
    //oImgbar.href = "#"

  

    div.appendChild(oImgbar);

    

    this.MenuBarObj.appendChild(div);

   
    this.MenuList[id] = div;
    div.addEventListener("click", _winHandler.Asign);
}


function CWinHandler_ProcessOrder() {
    var index;
    var order = 10;
    var currentWindowId = '';
    var currentWindowIndex = -1;

    if (this.CurrentWindow != null) {
        if (this.CurrentWindow.Obj) {
            currentWindowId = this.CurrentWindow.ClienteId;
            this.CurrentWindow.Obj.style.zIndex = this.ZIndexStart;
        }
    }

    for (index = 0; index < this.WindowList.length; index++) {
        var obj = this.WindowList[index];
        //this.MenuList[obj.ClientId].className = "DeskPanel_Title_PanelBar_Item";

        if (currentWindowId != obj.ClienteId) {
            if (obj.IsVisible) {
                order++;
                obj.Obj.style.zIndex = order;
            }
        }
        else
            currentWindowIndex = index;
    }

}

function CWinHandler_Buscar(id) {
    var index;
    var order = 10;
    var currentWindowId = '';
    var currentWindowIndex = -1;
    for (index = 0; index < this.WindowList.length; index++) {
        var obj = this.WindowList[index];
        //this.MenuList[obj.ClientId].className = "DeskPanel_Title_PanelBar_Item";
        if (id == obj.ClienteId) {
            _winHandler.CurrentWindow = obj;
        }
    }

}

function CWinHandler_OcultarT() {
    var index;
    for (index = 0; index < this.WindowList.length; index++) {
        var obj = this.WindowList[index];
 
        _winHandler.CurrentWindow = obj;
        _winHandler.CurrentWindow.PrevState = _winHandler.CurrentWindow.State;
        _winHandler.CurrentWindow.State = Ventana_MINIM;
        _winHandler.CurrentWindow.IsVisible = false;
        //_winHandler.CurrentWindow.Obj.classList.remove('show');
        //_winHandler.CurrentWindow.Obj.classList.add('hide');
        _winHandler.CurrentWindow.Obj.style.display = 'none'; 
    }

}



function CWinHandler_Add(obj) {
    //obj es un objeto tipo window
    this.WindowList.push(obj);
    this.AddMenu(obj.ClienteId, obj.Titulo, obj.UrlImg);
}

function CWinHandler_Remove(obj) {
    //obj es un objeto tipo window
    //Debemos eliminar la ventana de la lista
    this.MenuBarObj = document.getElementById("bar_bottom");
    var index;
    var found = -1;
    for (index = 0; index < this.WindowList.length; index++) {
        if (this.WindowList[index].ClienteId == obj.ClienteId) {
            found = index;
            break;
        }
    }

    if (found > -1) {
        this.WindowList.splice(found, 1);
    }

    //eliminamos el menu

    this.MenuBarObj.removeChild(this.MenuList[obj.ClienteId]);
    this.MenuList[obj.ClienteId] = null;

    if (this.CurrentWindow != null) {
        if (this.CurrentWindow == obj) {
            this.CurrentWindow = null;
        }
    }
}


function CWinHandler_Asign() {
    //current
    _winHandler.Buscar(this.id);
    _winHandler.ProcessOrder()
    _winHandler.CurrentWindow.ClickPanelBar();
}

function CWinHandler_FocusW() {
    _winHandler.Buscar(this.id.substr(3));
    _winHandler.ProcessOrder()
}

function CWinHandler_FocusB(id) {
    var idP = document.getElementById(id).parentNode.parentNode.parentNode.id;
    _winHandler.Buscar(idP.substr(3));
    _winHandler.ProcessOrder()
}


function _InitMenuBar() {
    _winHandler.InitMenuBar();
}



var _winHandler = new CWinHandler();
_winHandler.InitMenuBar();

/*----Fin Funciones para la creación de formularios--------------------------------------------- */




/*-------------------Funciones propias del escritorio---------------------------------------------*/
/*Cerrar Modal ventana*/
function cerrarV() {
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
}


/*Cerrar Modal ventana*/
function cerrarV2() {
    var modal = document.getElementById('myModal2'); 
    modal.style.display = "none";
}

function mostrarV2(){
    var modal = document.getElementById('myModal2'); 
    modal.style.display = "block";
}

function mostrarVentana(id){
    var modal = document.getElementById(id); 
    modal.style.display = "block";
}

function cerrarVentana(id) {
    var modal = document.getElementById(id);
    modal.style.display = "none";
}

function cerrarSesion(){
    MostrarVWait();
    if (!sessionStorage.Usuario) {
        window.open ('index.html','_self',false)
    }
    $.ajax({
        type: "POST",
        url: rutaWCF + "cerrarSession",
        data: JSON.stringify({ pUsuario: sessionStorage.Usuario.trim(), pSession: sessionStorage.session.trim()}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
          if(msg == 0){
               CerrarVWait();
             return;
          }
           if (!sessionStorage.Usuario) {
                 sessionStorage.Usuario = "";
            }
            if (!sessionStorage.session) {
                 sessionStorage.session = "";
            }
            if (!sessionStorage.nomUsuario) {
                 sessionStorage.nomUsuario = "";
            }
            if (!sessionStorage.idRol) {
                 sessionStorage.idRol = 0;
            }
             window.open ('index.html','_self',false)
        },
        error: function (e) {
            CerrarVWait();
             return;
        }
    });
}

function validarSesionP(){
    MostrarVWait();
    if (!sessionStorage.Usuario || !sessionStorage.session || !sessionStorage.nomUsuario ||  !sessionStorage.idRol) {
        cerrarSesion();
        return;
    }
    if (sessionStorage.Usuario.trim() =="" || sessionStorage.session.trim() ==""  || sessionStorage.nomUsuario.trim() =="" ||  sessionStorage.idRol == 0) {
        cerrarSesion();
        return;
    }
    $.ajax({
        type: "POST",
        url: rutaWCF + "validaSession",
        data: JSON.stringify({ pUsuario: sessionStorage.Usuario.trim(), pSession: sessionStorage.session.trim()}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
          if(msg != 1){
                CerrarVWait();
              cerrarSesion();
             return;
          }
          $('#nombreUsuario').html(sessionStorage.nomUsuario.trim()); 
            $.ajax({
                type: "POST",
                url: rutaWCF + "PermisosList",
                data: JSON.stringify({ idRol: sessionStorage.idRol, pUsuario: sessionStorage.Usuario.trim(), pSession: sessionStorage.session.trim(), tipoL: 1}),
                async: false,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    CerrarVWait();
                    arrayP = new Array(msg.length);
                    var contador = 0
                    msg.map(function (element) {
                        arrayP[contador] = 
                        {
                            ventana : new Ventana(element.cDescripcion, "desktop", element.cImageI,element.cHeight,element.cWidth,element.cVFrHeight,element.vLeft,element.vTop),
                            cEjeX : element.cEjeX,
                            cEjeY : element.cEjeY,
                            cnombreP : element.cnombreP,
                            cImageU : element.cImageU,
                            cDescripcion : element.cDescripcion,
                            cDireccion : element.cDireccion,
                            cUbicacion : element.cUbicacion
                        }
                        contador = contador + 1
                    })
                      habilitarF(arrayP);
                     return;
                },
                error: function (e) {
                    CerrarVWait();
                     alert("no se pudo obtener los permisos");
                     return;
                }
            });
        },
        error: function (e) {
           CerrarVWait();
            cerrarSesion();
             return;
        }
    });
}



function habilitarF(arrayF){
    var vent;
    var cont = 0;
    $( ".iconoD" ).remove();
    arrayF.map(function (element) {
        vent = "arrayP[" + cont + "].ventana.Mostrar('" + element.cDireccion + "', '" + element.cnombreP + "')";
        if(element.cUbicacion == 'MENU_ITEM'){
            $("#desktop").append('<a class="abs icon iconoD"  style="left:' + element.cEjeX + ';top:' + element.cEjeY + ';" ondblclick= "' + vent + '" ;> <img src="' + element.cImageU + '";  /> ' + element.cDescripcion + ' </a>');
        }else{
             $("#LeftBar").append('<a class="abs icon2 iconoD"  style="right:' + element.cEjeX + ';top:' + element.cEjeY + ';cursor:pointer" onclick= "' + vent + '";> <img src="' + element.cImageU + '" style="cursor:pointer" /> ' + element.cDescripcion + ' </a>');
        }
        cont = cont + 1;
    });

}



function cargarRegistrosNotifica(fechai,fechaf){
    var fechaInicial;
    var fechaFinal;
    if(fechai == '' || fechaf == '' ){
        fechaInicial = new Date();
        fechaFinal = new Date();
        fechaInicial.setHours(0,0,0,0);
        fechaFinal.setHours(23,59,59,999);
        fechaInicial = fechaInicial.toMSJSON();
        fechaFinal = fechaFinal.toMSJSON();
    }else{
        fechaInicial = new Date(fechai).toMSJSON();
        fechaFinal = new Date(fechaf).toMSJSON();
    }
    $.ajax({
        type: "POST",
        url: rutaWCFN + "listProcsAsync",
        data: JSON.stringify({pUsuario: sessionStorage.Usuario.trim(), pSession: sessionStorage.session.trim(), pFechaI:fechaInicial, pFechaF: fechaFinal}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            $('#table_Container').html('');
            arrayListaN = msg;
            $("#table_Container").empty().append('<table id="notytable"> <tr> <th style=" width: 100px; font-size:15px;">Título</th> <th style=" width: 50px; font-size:15px;">Estado</th> <th style=" width: 50px; font-size:15px;">Fecha</th> </tr> </table>');
            listaRegistros(arrayListaN)
            cargarPropiedades();
             return;
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
            clear();
        }

    });
}

function listaRegistros(arrayLista){
    arrayLista.map(function (element) {
        var currentTime = new Date(parseInt(element.dFecha.substr(6)));
        var month = currentTime.getMonth() + 1;
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();
        var hour = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var segundos = currentTime.getSeconds();
        var date = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + segundos;
        $('#notytable').append('<tr id="' + element.nid + '" ><td class="desNoti" style="color: blue;cursor: pointer;">' + element.cTitulo + '</td> <td>' + element.cEstado + '</td> <td>' + date + '</td> </tr>');
    });
}

function cargarPropiedades(){
     $(document).on('click', '.desNoti', function(){ 
        var id = $(this).parent().attr('id');
        var msj         
        arrayListaN.map(function (element) {
            if(element.nid == id){
                msj = element.cEstado + ': ' +   element.cMensaje
                 $("#pMensNoty").text(msj);
                 mostrarVentana('myModalNoty');
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

$(document).bind("mousemove keypress", function () {

    var date1 = new Date();
    var diff = Math.abs(date1 - Date.parse(sessionStorage.fecha));
    var diffM = Math.floor((diff/1000)/60);
    if(diffM > 5){
        cerrarSesion();
    }
    sessionStorage.fecha = new Date();
});


/*-------------------Fin Funciones propias del escritorio------------------------------------------*/