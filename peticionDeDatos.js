var url = "https://script.google.com/macros/s/AKfycbwnvUoy7_6K3aVjRTifm2egifIKmaortmAETiW9IcJWm0b-qVVwkfv_7tbYdl7KMQ/exec"; 
let $siguiente = document.querySelector(".siguiente");
var SemanaUno,DiasSemanaUno;



async function ponerDias(arg2){
  let arg1 = "obtenerDias",
      urlInterno = url + "?arg1=" + arg1 + "&arg2=" + arg2;
  let $tabla = document.getElementById('tablaHorarios');
    const $filas = $tabla.rows;
    const $tituloTabla = document.querySelector("th");
  try {
    const response = await fetch(urlInterno);
    if (!response.ok) {
      throw new Error('La solicitud falló.');
    }
    const data = await response.json();
    if(arg2 == 0) DiasSemanaUno = data;
    let $celda;
    for (let i = 0; i < 6; i++) {
      if(i == 0) $tituloTabla.innerHTML = "Horarios " + data[0] + "<br>(Las que estan en color blanco son los disponibles)";
      $celda = $filas[1].cells[i+1];
      $celda.innerHTML = data[i+1];
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function modificarCelda(fila,columna){
    let $tabla = document.getElementById('tablaHorarios');
    const $filas = $tabla.rows;
    
    const $celda = $filas[fila].cells[columna];
    $celda.style.backgroundColor = 'inherit';
}

function cambiarColorMatriz() {
  // Obtener todas las celdas de la matriz
  var celdas = document.querySelectorAll("table tr td");
  
  // Iterar sobre todas las celdas
  celdas.forEach(function(celda) {
    // Obtener el índice de fila y columna de la celda actual
    var fila = celda.parentNode.rowIndex;
    var columna = celda.cellIndex;

    // Verificar si la celda está dentro del rango [2,1] y [31,6]
    if ((fila >= 2 && fila <= 31) && (columna >= 1 && columna <= 6) && celda.id != "inmovible") {
      // Cambiar el color de fondo de la celda
      celda.style.backgroundColor = "white"; // Cambia el color como desees
    }
  });

}

(async function () {
  let arg1 = 0,
      urlInterno = url + "?arg1=" + arg1;
    try {
      const response = await fetch(urlInterno);
      if (!response.ok) {
        throw new Error('La solicitud falló.');
      }
      const data = await response.json();
      SemanaUno = data;
      data.forEach(objeto => {
        modificarCelda(objeto.fila, objeto.columna);
      });
      await ponerDias(0);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      document.querySelector("table").style.display = "table";
      document.getElementById("loader").style.display = "none";
      $siguiente.style.display = "flex";
    }
})()

async function siguiente () {
      let arg1 = 1,
        urlInterno = url + "?arg1=" + arg1;

    document.querySelector("table").style.display = "none";
    console.log("llegue hasta aca");
    cambiarColorMatriz();
    let $tituloTable = document.querySelector("th");
    $tituloTable.innerHTML =  'Horarios Mayo Semana ' + (arg1+1) + '<br>(Los que estan en celeste son disponibles)';
    document.getElementById("loader").style.display = "block";
    $siguiente.style.display = "none";
      try {
        const response = await fetch(urlInterno);
        if (!response.ok) {
          throw new Error('La solicitud falló.');
        }
        const data = await response.json();
        data.forEach(objeto => {
          modificarCelda(objeto.fila, objeto.columna);
        });
        await ponerDias(1); // Espera a que ponerDias(1) termine antes de continuar
      } catch (error) {
        console.error("Error:", error);
      } finally {
        // Ocultar loader cuando la solicitud Fetch se complete (ya sea exitosa o con error)
        document.querySelector("table").style.display = "table";
        document.getElementById("loader").style.display = "none";
        $siguiente.id = "anterior";
        document.querySelector(".siguiente p").style.order = "2";
        document.querySelector(".siguiente svg").style.order = "1";
        document.querySelector(".siguiente svg image").setAttribute("href", "assets/fotos/FlechaHaciaIzquierda.svg");
        document.querySelector(".siguiente svg").style.marginLeft = "0";
        document.querySelector(".siguiente svg").style.marginRight = "1vw";
        document.querySelector(".siguiente p").innerHTML = "Volver atras"
        $siguiente.style.display = "flex";
      }
    }

function anterior () {
  console.log("llegue hasta aca");
  let $tabla = document.querySelector("table");
  $tabla.style.display = "none";
  $siguiente.style.display = "none";
  cambiarColorMatriz();
    SemanaUno.forEach(objeto => {
      modificarCelda(objeto.fila, objeto.columna);
    });
    //poner bien los dias
    const $filas = $tabla.rows;
    let $celda;
    const $tituloTabla = document.querySelector("th");
    for (let i = 0; i < 6; i++) {
      if(i == 0) $tituloTabla.innerHTML = "Horarios " + DiasSemanaUno[0] + "<br>(Las que estan en color blanco son los disponibles";
      $celda = $filas[1].cells[i+1];
      $celda.innerHTML = DiasSemanaUno[i+1];
    }
    document.getElementById("loader").style.display = "none";
    $siguiente.id = "siguiente";
    document.querySelector(".siguiente p").style.order = "1";
    document.querySelector(".siguiente svg").style.order = "2";
    document.querySelector(".siguiente svg image").setAttribute("href", "assets/fotos/FlechaHaciaDerecha.svg");
    document.querySelector(".siguiente svg").style.marginLeft = "1vw";
    document.querySelector(".siguiente svg").style.marginRight = "0";
    document.querySelector(".siguiente p").innerHTML = "Semana siguiente";
    $tabla.style.display = "table";
    $siguiente.style.display = "flex";
}

$siguiente.addEventListener("click", ()=> {
  if($siguiente.id == "siguiente") siguiente();
  else anterior();
})




