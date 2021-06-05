// Al pulsar introducir dirección tiene que aparecer el input
const formulario = document.querySelector(".form-coordenadas");

const inputDireccion = (nodo, boton, input, boolean) => {
  nodo.querySelector(boton).addEventListener("click", () => {
    const clase = nodo.querySelector(`${input}.direccion-definitiva`).classList;
    if (boolean) {
      clase.add("on");
    } else {
      clase.remove("on");
    }
  });
};
inputDireccion(formulario, "#de-direccion", ".de-direccion-definitiva", true);
inputDireccion(formulario, "#a-direccion", ".a-direccion-definitiva", true);
inputDireccion(
  formulario,
  "#de-mi-ubicacion",
  ".de-direccion-definitiva",
  false
);
inputDireccion(formulario, "#a-mi-ubicacion", ".a-direccion-definitiva", false);

// Recogemos string del input
const direccionOrigen = formulario.querySelector(
  ".de-direccion-definitiva.direccion-definitiva"
);
const direccionDestino = formulario.querySelector(
  ".a-direccion-definitiva.direccion-definitiva"
);
const direcciones = (nodo) => {
  nodo.addEventListener("keydown", (e) => {
    setTimeout(() => {
      if (nodo.value !== "") {
        const direccion = e.target.value;
        console.log(direccion);
        return direccion; // Este es el string que tenemos que exportar
      }
    }, 500);
  });
};

export const direccionDesde = direcciones(direccionOrigen); // No funciona. No puedo exportar datos dentro del evento
export const direccionHasta = direcciones(direccionDestino);
console.log(direccionDesde); // Undefined porque se ejecuta al principio y ya está
// Al pulsar usar mi ubicación tenemos que obtener la localización del navegador en un string de coordenadas
