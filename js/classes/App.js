import { preguntarPresupuesto, agregarGasto } from "../funciones.js";
import { formulario } from "../selectores.js";

class App {
  constructor() {
    this.initApp();
  }

  initApp() {
    document.addEventListener("DOMContentLoaded", preguntarPresupuesto);
    formulario.addEventListener("submit", agregarGasto);
  }
}
export default App;
