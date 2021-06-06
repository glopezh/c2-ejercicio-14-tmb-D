// Al pulsar introducir dirección tiene que aparecer el input
const formulario = document.querySelector(".form-coordenadas");

const inputDireccion = (nodo, boton, input, addRemove, origenDestino) => {
  nodo.querySelector(boton).addEventListener("click", () => {
    const clase = nodo.querySelector(`${input}.direccion-definitiva`).classList;
    if (addRemove === "add") {
      clase.add("on");
    } else if (addRemove === "remove") {
      clase.remove("on");
      const nodosCoordenadas = nodo.querySelectorAll(".coordenadas");
      if (origenDestino === "origen") {
        nodosCoordenadas[0].querySelector(".nombre-lugar").textContent = "";
      } else if (origenDestino === "destino") {
        nodosCoordenadas[1].querySelector(".nombre-lugar").textContent = "";
      }
    }
  });
};
inputDireccion(formulario, "#de-direccion", ".de-direccion-definitiva", "add");
inputDireccion(formulario, "#a-direccion", ".a-direccion-definitiva", "add");
inputDireccion(
  formulario,
  "#de-mi-ubicacion",
  ".de-direccion-definitiva",
  "remove",
  "origen"
);
inputDireccion(
  formulario,
  "#a-mi-ubicacion",
  ".a-direccion-definitiva",
  "remove",
  "destino"
);

// Al pulsar usar mi ubicación tenemos que obtener la localización del navegador en un string de coordenadas
