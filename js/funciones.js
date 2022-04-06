import Presupuesto from "./classes/Presupuesto.js";
import UI from "./classes/UI.js";
import { formulario, gastoListado } from "./selectores.js";

//Instancias
const ui = new UI();
let presupuesto;

//Función pedir prespuesto
export function preguntarPresupuesto() {
  const presupuestoUsuario = prompt("¿Cual es tu presupuesto?");
  if (
    presupuestoUsuario === "" ||
    isNaN(presupuestoUsuario) ||
    presupuestoUsuario === null ||
    presupuestoUsuario <= 0
  ) {
    //Recarga la ventana actual
    window.location.reload();
  }
  presupuesto = new Presupuesto(presupuestoUsuario);

  ui.insertarPresupuesto(presupuesto);
}

//función que añade gastos
export function agregarGasto(e) {
  e.preventDefault();
  const nombre = document.querySelector("#gasto").value;
  const cantidad = Number(document.querySelector("#cantidad").value);
  //Validar datos del formulario
  if (nombre === "" || cantidad === "") {
    ui.imprimirAlerta("Ambos campos son obligatorios", "error");
    return;
  } else if (cantidad <= 0 || isNaN(cantidad)) {
    ui.imprimirAlerta("Introduce una cantidad válida", "error");
    return;
  }

  //Generar objeto con el gasto
  const gastoObj = {
    nombre,
    cantidad,
    id: Date.now(),
  };

  //Añade el nuevo gasto
  presupuesto.nuevoGasto(gastoObj);
  ui.imprimirAlerta("Gasto añadido correctamente");

  //Del objeto, extraigo solo los gastos
  const { gastos, restante } = presupuesto;

  //Imprimir los gastos
  ui.mostrarGastoHTML(gastos);

  //Actualizar restante
  ui.actualizarRestante(restante);

  //comprobar presupuesto
  ui.comprobarPresupuesto(presupuesto);

  //Resetear formulario
  formulario.reset();
}

export function limpiarHTML() {
  while (gastoListado.firstChild) {
    gastoListado.removeChild(gastoListado.firstChild);
  }
}

export function eliminarGasto(id) {
  presupuesto.eliminarGasto(id);
  const { gastos, restante } = presupuesto;
  ui.mostrarGastoHTML(gastos);
  ui.actualizarRestante(restante);
  ui.comprobarPresupuesto(presupuesto);
}
