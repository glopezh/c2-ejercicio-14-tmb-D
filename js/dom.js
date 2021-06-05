// export

// Al pulsar introducir dirección tiene que aparecer el input y recoger el string con JS

const formulario = document.querySelector(".form-coordenadas");
formulario.querySelector("#de-direccion").addEventListener("click", (e) => {
  formulario
    .querySelector(".de-direccion-definitiva.direccion-definitiva")
    .classList.add("on");
});
formulario.querySelector("#de-mi-ubicacion").addEventListener("click", (e) => {
  formulario
    .querySelector(".de-direccion-definitiva.direccion-definitiva")
    .classList.remove("on");
});
formulario.querySelector("#a-direccion").addEventListener("click", (e) => {
  formulario
    .querySelector(".a-direccion-definitiva.direccion-definitiva")
    .classList.add("on");
});
formulario.querySelector("#a-mi-ubicacion").addEventListener("click", (e) => {
  formulario
    .querySelector(".a-direccion-definitiva.direccion-definitiva")
    .classList.remove("on");
});

// Al pulsar usar mi ubicación tenemos que obtener la localización del navegador en un string de coordenadas
