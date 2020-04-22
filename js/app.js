var primervalor = 0,segundovalor = 0,accion= '';
InicializaArray();
CrearListeners();
//Inicializa las variables de las operaciones
function InicializaArray(){
    primervalor = 0;
    segundovalor = 0;
    accion = '';

}

function CrearListeners(){
    document.getElementById("1").onclick = function() {CapturaTecla(1)};
    document.getElementById("2").onclick = function() {CapturaTecla(2)};
    document.getElementById("3").onclick = function() {CapturaTecla(3)};
    document.getElementById("4").onclick = function() {CapturaTecla(4)};
    document.getElementById("5").onclick = function() {CapturaTecla(5)};
    document.getElementById("6").onclick = function() {CapturaTecla(6)};
    document.getElementById("7").onclick = function() {CapturaTecla(7)};
    document.getElementById("8").onclick = function() {CapturaTecla(8)};
    document.getElementById("9").onclick = function() {CapturaTecla(9)};
    document.getElementById("0").onclick = function() {CapturaTecla(0)};
    document.getElementById("on").onclick = function() {CapturaTecla('on')};
    document.getElementById("sign").onclick = function() {CapturaTecla('n')};
    document.getElementById("x").onclick = function() {CapturaTecla('*')};
    document.getElementById("menos").onclick = function() {CapturaTecla('-')};
    document.getElementById("punto").onclick = function() {CapturaTecla('.')};
    document.getElementById("mas").onclick = function() {CapturaTecla('+')};
    document.getElementById("igual").onclick = function() {CapturaTecla('=')};
    document.getElementById("dividido").onclick = function() {CapturaTecla('/')};
}




//funcion principal que recibe el id del evento onclick de la Imagen
function CapturaTecla(e){
    
    var x = document.getElementById("display");  

    //Valida si las teclas son las de Operaciones o de los digitos
    if (isNaN(e)){
        switch (e ) {
            case "on":{
                variarTamanoImagen(e);  //Funcion que genera el efecto sobre la imagen de los botones de la calculadora
                x.innerHTML = '0';
                accion = '';
                InicializaArray();
                break;
            }
            case "+":{
                variarTamanoImagen(e);
                primervalor = x.innerHTML;
                x.innerHTML = '';
                if (accion=="+"){
                   x.innerHTML = '0';
                }
                else
                {
                    accion = "+";
                }
                break;
            }
            case "-":{
                variarTamanoImagen(e);
                primervalor = x.innerHTML;
                x.innerHTML = '';
                if (accion=="-"){
                   x.innerHTML = '0';
                }
                else
                {
                    accion = "-";
                }
                break;
            }
            case "*":{
                variarTamanoImagen(e);
                primervalor = x.innerHTML;
                x.innerHTML = '';
                if (accion=="*"){
                   x.innerHTML = '0';
                }
                else
                {
                    accion = "*";
                }
                break;
            }
            case "/":{
                variarTamanoImagen(e);
                primervalor = x.innerHTML;
                x.innerHTML = '';
                if (accion=="/"){
                   x.innerHTML = '0';
                }
                else
                {
                    accion = "/";
                }
                break;
            }
            case "n":{
                variarTamanoImagen(e);
                switch (parseInt(x.innerHTML)>0){
                  case true:
                    x.innerHTML = '-'+x.innerHTML;
                    break;
                  case false:
                    x.innerHTML = Math.abs(x.innerHTML);
                    break;
                }
                break;
            }
            case ".":{
                variarTamanoImagen(e);
                
                    validar = x.innerHTML.indexOf("."); //Valida si no se le ha agregado el punto a la cantidad
                    if (validar==-1){
                        x.innerHTML = x.innerHTML+".";
                    }
                
                break;
            }
            case "=":{
                variarTamanoImagen(e);
                if(x.innerHTML.length > 0)
                  segundovalor = x.innerHTML;
                
                MostrarResultado(x) ;
                break;
            }
        }
        
    }
    else{
        variarTamanoImagen(e);
        VerificaCeros(x,e);  //si los boletos presionados son numeros los agrega al display de la calculadora
    }
    
}

function MostrarResultado(y){
    switch (accion){
       case "+" :{
        var resul = Calculadora(parseFloat(primervalor),parseFloat(segundovalor)).sumar();
        y.innerHTML =  parseFloat(resul).toString().substring(0,8); //Modifica salida a 8 Digitos Maximo
        break;
       }
       case "-" :{
        var resul = Calculadora(parseFloat(primervalor),parseFloat(segundovalor)).restar();
        y.innerHTML = parseFloat(resul).toString().substring(0,8); //Modifica salida a 8 Digitos Maximo
        break;
       }
       case "*" :{
        var resul = Calculadora(parseFloat(primervalor),parseFloat(segundovalor)).multiplicar();
        y.innerHTML = parseFloat(resul).toString().substring(0,8); //Modifica salida a 8 Digitos Maximo
        break;
       }
       case "/" :{
        var resul = Calculadora(parseFloat(primervalor),parseFloat(segundovalor)).dividir();
        y.innerHTML = parseFloat(resul).toString().substring(0,8); //Modifica salida a 8 Digitos Maximo
        break;
       }
    }
    accion='';
}


function VerificaCeros(y,ev){
    //recibe el objeto del boton y el nombre del id del boton, valida si ya se agrego el punto  y que no sobre pase la cantidad de 8 digitos en el display

    if (parseInt(y.innerHTML) == 0 && y.innerHTML.indexOf(".") == -1 )
    {
        if ((y.innerHTML.length+1) < 9){  
          ModificarDisplay(true,y,ev);
        }

    }
    else if(parseInt(y.innerHTML) == 0 && y.innerHTML.indexOf(".") > -1 ){
        if ((y.innerHTML.length+1) < 9)
        {
        ModificarDisplay(false,y,ev);
        }
    }
    else{
        if ((y.innerHTML.length+1) < 9)
        {
        ModificarDisplay(false,y,ev);
        }
    }
}


//Actualiza la informacion del display
function ModificarDisplay(opcion,y,e){
    if (opcion)
    {
        y.innerHTML = '';
        y.innerHTML = y.innerHTML + e ;
    }
    else
    {
        y.innerHTML = y.innerHTML + e ;
    }
}



//Java script Module Patern con funciones closures

Calculadora = (function(val1,val2){
   this.resultado = 0;
   this.v1 = val1;
   this.v2 = val2;
 

   function sumar(){
         resultado = v1 + v2;
         return resultado;
   }
 
   function restar(){
    resultado = v1 - v2;
    return resultado;
    }

    function multiplicar(){
        resultado = v1 * v2;
        return resultado;
    }

    function dividir(){
        resultado = v1 / v2;
        return resultado;
    }
    
    function muestraResultado(){
        return resultado;
    }
   //Definiendo Funciones tipo closures
   return{
       sumar: sumar,
       restar: restar, 
       multiplicar: multiplicar,
       dividir: dividir,
       iguala: muestraResultado
   }
})



function variarTamanoImagen(ev)
{
    if (isNaN(ev)){
        switch (ev){
            case "+":
                var imagen = document.getElementById("mas"); 
                imagen.style = "width:87%;height:97%;"
                regresarTamañoSuma(imagen); // Funcion para regresar tamaño del  boton suma
                break;
            case "=":
            var imagen = document.getElementById("igual"); 
            imagen.style = "width:74;height:61px;"
            regresarTamaño2(imagen); // existen diferentes funciones segun el tamaño
            break;
        }
    }
    else{
        var imagen = document.getElementById(ev); 
        if (parseInt(ev)<3){
           imagen.style = "width:26%;height:61px;"
           regresarTamaño2(imagen);   // Funcion para regresar tamaño del boton igual
        }
        else{
            imagen.style = "width:74px;;height:61px;"
            regresarTamaño3(imagen); // Funcion para regresar tamaño de los  botones del 4 al 9
        }
        
    }
    

}

//funcion que regresa el tamaño de la imagen con un setinterval
function regresarTamaño(imagen){
   var c=  setInterval(
        function(){
            imagen.style = "width:22%;height:62.91px";
        },
        300
    )
}

//funcion que regresa el tamaño de la imagen con un setinterval
function regresarTamaño2(imagen){
    var c=  setInterval(
         function(){
             imagen.style = "width:76.68px;height:62.91px";
         },
         300
     )
 }

 //funcion que regresa el tamaño de la imagen con un setinterval
 function regresarTamaño3(imagen){
    var c=  setInterval(
         function(){
             imagen.style = "width:77.88px;height:62.91px";
         },
         300
     )
 }

 //funcion que regresa el tamaño de la imagen con un setinterval
 function regresarTamañoSuma(imagen){
    var c=  setInterval(
         function(){
             imagen.style = "width:90%;height:100%";
         },
         300
     )
 }