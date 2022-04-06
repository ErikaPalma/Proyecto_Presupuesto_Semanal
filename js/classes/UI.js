import { formulario, gastoListado } from "../selectores.js";
import {
  limpiarHTML,
  eliminarGasto,
  preguntarPresupuesto,
} from "../funciones.js";

class UI {
  //No requiere constructor. Van a ser métodos que impriman HTML basados en la otra clase

  insertarPresupuesto(cantidad) {
    //Extraer valor
    const { presupuesto, restante } = cantidad;
    //Añadir al html
    document.querySelector("#total").textContent = presupuesto;
    document.querySelector("#restante").textContent = restante;
  }

  imprimirAlerta(mensaje, tipo) {
    const alerta = document.createElement("div");
    alerta.classList.add("alert");
    if (tipo === "error") {
      alerta.classList.add("alert-danger");
    } else {
      alerta.classList.add("alert-success");
    }
    //mensaje de error
    alerta.textContent = mensaje;
    //Insertar en HTML
    document.querySelector(".primario").insertBefore(alerta, formulario);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }

  mostrarGastoHTML(gastos) {
    limpiarHTML();
    //Iterar los gastos para imprimir
    gastos.forEach((gasto) => {
      const { cantidad, id, nombre } = gasto;
      const gastoHTML = document.createElement("li");
      gastoHTML.className =
        "list-group-item d-flex justify-content-between align-items-center";
      gastoHTML.dataset.id = id;
      gastoHTML.innerHTML = `
        ${nombre}<span class="badge rounded-pill bg-primary p-2">${cantidad}</span>`;

      //Botón borrar
      const btnBorrar = document.createElement("button");
      btnBorrar.classList.add("btn", "btn-danger", "borrar-curso");
      btnBorrar.textContent = "Borrar";
      btnBorrar.onclick = () => {
        eliminarGasto(id);
      };
      gastoHTML.appendChild(btnBorrar);

      //Añadir al html
      gastoListado.appendChild(gastoHTML);
    });
  }

  actualizarRestante(restante) {
    document.querySelector("#restante").textContent = restante;
  }

  comprobarPresupuesto(presupuestObj) {
    const { presupuesto, restante } = presupuestObj;
    const restanteDiv = document.querySelector(".restante");
    //Comprobar 25%
    if (presupuesto / 4 > restante) {
      restanteDiv.classList.remove("alert-success");
      restanteDiv.classList.add("alert-danger");
    } else if (presupuesto / 2 > restante) {
      restanteDiv.classList.remove("alert-success");
      restanteDiv.classList.add("alert-warning");
    } else {
      restanteDiv.classList.remove("alert-danger", "alert-warning");
      restanteDiv.classList.add("alert-success");
    }

    //Si el total es <=0
    if (restante <= 0) {
      this.imprimirAlerta("El presupuesto se ha agotado", "error");
      formulario.querySelector('button[type="submit"]').disabled = true;
    } else if (restante > 0) {
      formulario.querySelector('button[type="submit"]').disabled = false;
    }
  }
}

export default UI;
