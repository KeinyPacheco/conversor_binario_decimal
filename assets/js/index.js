/**
 * Eventos que se ejecutan al cargar el formulario 
 */
 window.onload = function() {

    document.getElementById("required_decimal").style.display = "none";

    document.getElementById("required_binario").style.display = "none";

    document.getElementById("btn_convertir_decimal").addEventListener("click", decimal_a_binario, false);

    document.getElementById("btn_convertir_binario").addEventListener("click", binario_a_decimal, false);
};

/**
 * Esta funcion retorna el valor del check seleccionado. Por defecto es 8 bits.
 * 
 * @return {string} Valor del check
 */
 function numero_bits(){
    var binaryType = "8", checkBox = document.forms[0].elements["numeroBits"];

    for (let i = 0; i < checkBox.length; i++) {
        if (checkBox[i].checked) {
            binaryType = checkBox[i].value;
            break;
        }
    }
    return binaryType;     
}


/**
 * Esta función se encarga de convertir un decimal a binario. Al terminar, ejecuta el método que calcula los complementos
 * 
 * @return {void}
 */
 function decimal_a_binario(){

   var decimal = document.getElementById("decimal").value,
   binario = [],
   i = 0,
   signo = "0";

   if(decimal.trim() == ""){
    document.getElementById("required_decimal").style.display = "";
}else{
    document.getElementById("required_decimal").style.display = "none";
}

if(decimal < 0){
        decimal = decimal * (-1); //Podemos usar también Math.abs(decimal)
        signo = "1";
    }

    while(decimal > 0)
    {
        binario[i] = decimal%2;
        decimal = parseInt(decimal / 2);
        i++;		
    }    	

    var binarioFinal = "";
    for (let j = i - 1; j >= 0; j--){ 
        binarioFinal += binario[j];
    } 

    var binaryType = numero_bits(), 
    ceros = (Number(binaryType) - binarioFinal.length) - 1,
    rellenoCeros = "";

    for(let i = 0; i < ceros; i++){
        rellenoCeros += "0";
    }
    
    document.getElementById("magnitud").value = signo+""+rellenoCeros+""+binarioFinal;
    document.getElementById("magnitud").dataset.original = binarioFinal;
    encontrar_complementos();
}

/**
 * Esta función se encarga de convertir un número binario a un número decimal  
 * @return {void}
 */
 function binario_a_decimal(){
    
    var binario = document.getElementById("binario").value,
    array = [], 
    decimal = 0, 
    contador = 0;

    if(binario.trim() == ""){
        document.getElementById("required_binario").style.display = "";
    }else{
        document.getElementById("required_binario").style.display = "none";
    }

    for(let i = binario.length-1; i>=0;i--){
        if(binario[i] == 0){
            array[i] = 0;
        }
        else{
            array[i] = Math.pow(2,contador);
        }
        contador++;
    }
    for(let a = 0; a < array.length; a++){
        decimal += array[a];
    }
    
    document.getElementById("respuesta_decimal").value = decimal;  
} 

/**
 * Esta función se encarga de cambiar los digitos por el digito contrario
 * 
 * @param  {string} digito Valor representado en 0 ó en 1
 * 
 * @return {string} Retorna el digito contrario
 */
 function cambiar_digito(digito){
    return (digito == "1" ? "0" : "1");
}

/**
 * Esta función se encarga de encontrar los complementos 1 y 2 del número binario previamente calculado
 * 
 * @return {void}
 */
 function encontrar_complementos()
 {
    var binary = document.getElementById("magnitud").dataset.original, 
    totalDigitos = binary.length, 
    complementoUno = [],
    complementoDos = [], 
    i, carry=1; 

    /* Buscamos el complemento 1 */
    for(i=0; i<totalDigitos; i++)
    {
        complementoUno[i] = cambiar_digito(binary[i]); 
    }

    /* Agregamos 1 al primer complemento */
    for(i=totalDigitos-1; i>=0; i--)
    {
        if(complementoUno[i] == '1' && carry == 1)
        {
            complementoDos[i] = '0';
        }
        else if(complementoUno[i] == '0' && carry == 1)
        {
            complementoDos[i] = '1'; carry = 0;
        }
        else
        {
            complementoDos[i] = complementoUno[i];
        }
    } 

    var binaryType = numero_bits(),
    ceros = (Number(binaryType) - complementoUno.length),
    rellenoComplementoUno = "", 
    rellenoComplementoDos = "";

    complementoUno = complementoUno.join(''); 
    complementoDos = complementoDos.join('');

    var primerDigitoUno = complementoUno.substring(0, 1),
    primerDigitoDos = complementoDos.substring(0, 1);

    for(let i = 0; i < ceros; i++){
        rellenoComplementoUno += cambiar_digito(primerDigitoUno); 
        rellenoComplementoDos += cambiar_digito(primerDigitoDos);  //Este funciona así?
    }    

    document.getElementById("complem1").value = rellenoComplementoUno+""+complementoUno;
    document.getElementById("complem2").value = rellenoComplementoDos+""+complementoDos;
} 
