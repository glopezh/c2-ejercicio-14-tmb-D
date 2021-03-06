/* global mapboxgl */

import * as dom from "./dom.js";

// Datos para las APIs
const geocodingApi = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const mapboxToken =
  "pk.eyJ1IjoicmFsbGdlIiwiYSI6ImNrcGk4azdjbjBndHcydXBjYXc2MzUweTQifQ.GDFAAG5UrMSO4_xPTFqaeg"; // Mete aquí el Token de Mapbox
const tmbApi = "https://api.tmb.cat/v1/planner/plan";
const appId = "0031bdb3"; // Mete aquí el app_id de TMB
const appKey = "1eef12f633798f1b3f0427e9c6e39525"; // Mete aquí el app_key de TMB
mapboxgl.accessToken = mapboxToken;
const mapa = (longitud, latitud) =>
  `https://www.google.com/maps?z=19&t=m&q=loc:${longitud}+${latitud}`;

// LLama a esta función para generar el pequeño mapa que sale en cada paso
// Le tienes que pasar un array con las dos coordenadas y el elemento HTML donde tiene que generar el mapa
const generaMapa = (coordenadas, mapa) => {
  const mapbox = new mapboxgl.Map({
    container: mapa,
    style: "mapbox://styles/mapbox/streets-v11",
    center: coordenadas,
    zoom: 14,
  });
};

// Coordenadas que se mandarán a la API de TMB. Tienes que alimentar este objeto a partir de las coordenadas que te dé la API de Mapbox
const coordenadas = {
  desde: {
    latitud: 0,
    longitud: 0,
  },
  hasta: {
    latitud: 0,
    longitud: 0,
  },
};
let {
  desde: { latitud: latitudOrigen, longitud: longitudOrigen },
  hasta: { latitud: latitudDestino, longitud: longitudDestino },
} = coordenadas;

const resumenDirecciones = { resumenOrigen: "", resumenDestino: "" };
let { resumenOrigen, resumenDestino } = resumenDirecciones;

// Función auxiliar para vaciar lista de pasos
const vaciarPasos = () => {
  for (const paso of document.querySelectorAll(".paso")) {
    paso.remove();
    console.log("a");
  }
};

// Elementos del DOM
const formulario = document.querySelector(".form-coordenadas");
const deDireccion = formulario.querySelector(
  ".de-direccion-definitiva.direccion-definitiva"
); // String con la dirección de la que queremos las coordenadas
const aDireccion = formulario.querySelector(
  ".a-direccion-definitiva.direccion-definitiva"
);
const nodosCoordenadas = formulario.querySelectorAll(".coordenadas");
const nombreDireccionOrigen =
  nodosCoordenadas[0].querySelector(".nombre-lugar");
const nombreDireccionDestino =
  nodosCoordenadas[1].querySelector(".nombre-lugar");

// Cuando tecleamos se mandan los datos a Mapbox
formulario.addEventListener("keydown", (e) => {
  // Esperamos para mandar los datos a Mapbox
  setTimeout(() => {
    if (deDireccion.value !== "") {
      // Recogemos las coordenadas de origen con Mapbox
      const placesOrigen = deDireccion.value;

      // Datos de origen
      fetch(`${geocodingApi}${placesOrigen}.json?access_token=${mapboxToken}`)
        .then((response) => response.json())
        .then((datos) => {
          nombreDireccionOrigen.textContent = "";
          const [longitud, latitud] = datos.features[0].geometry.coordinates; // Array de coordenadas [latitud,longitud]
          latitudOrigen = latitud;
          longitudOrigen = longitud;
          // Escribimos la dirección definitiva que devuelve Mapbox
          nombreDireccionOrigen.textContent = datos.features[0].place_name;
          resumenOrigen = datos.features[0].text;
          nombreDireccionOrigen.classList.add("direccion-definitiva", "on");
        });
    }
  }, 500);
});

formulario.addEventListener("keydown", (e) => {
  setTimeout(() => {
    if (aDireccion.value !== "") {
      // Recogemos las coordenadas de origen con Mapbox
      const placesDestino = aDireccion.value;

      // Datos de destino
      fetch(`${geocodingApi}${placesDestino}.json?access_token=${mapboxToken}`)
        .then((response) => response.json())
        .then((datos) => {
          nombreDireccionDestino.textContent = "";
          const [longitud, latitud] = datos.features[0].geometry.coordinates; // Array de coordenadas [latitud,longitud]
          latitudDestino = latitud;
          longitudDestino = longitud;
          // Escribimos la dirección definitiva que devuelve Mapbox
          nombreDireccionDestino.textContent = datos.features[0].place_name;
          resumenDestino = datos.features[0].text;
          nombreDireccionDestino.classList.add("direccion-definitiva", "on");
        });
    }
  }, 500);
});

// Cuando hacemos submit al formulario se mandan todos los datos
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  // Mandamos las coordenadas a la API de TMB
  const fromPlace = `${latitudOrigen},${longitudOrigen}`; // Coordenadas de AM de Barcelona
  const toPlace = `${latitudDestino},${longitudDestino}`;
  fetch(
    `${tmbApi}?app_id=${appId}&app_key=${appKey}&fromPlace=${fromPlace}&toPlace=${toPlace}`
  )
    .then((response) => response.json())
    .then((datos) => {
      // Limpiamos la lista de pasos
      vaciarPasos();
      // Alimentamos el HTML con los datos de la API de TMB
      const listaPasos = document.querySelector(".pasos");
      const itinerario = datos.plan.itineraries[0];
      const pasos = itinerario.legs;
      let i = 1;
      for (const {
        from,
        to,
        distance,
        duration,
        startTime,
        endTime,
        mode,
      } of pasos) {
        const nuevoPaso = document.querySelector(".paso-dummy").cloneNode(true);
        nuevoPaso.classList.remove("paso-dummy");
        nuevoPaso.classList.add("paso");
        const pasoEncabezado = nuevoPaso.querySelector(".paso-encabezado");
        const pasoNumero = pasoEncabezado.querySelector(".paso-numero");
        pasoNumero.textContent = i;
        const pasoFrom = pasoEncabezado.querySelector(".paso-from");
        if (i === 1) {
          pasoFrom.textContent = resumenOrigen;
        } else {
          pasoFrom.textContent = from.name;
        }
        const pasoTo = pasoEncabezado.querySelector(".paso-to");
        if (i === pasos.length) {
          pasoTo.textContent = resumenDestino;
        } else {
          pasoTo.textContent = to.name;
        }
        const linkMapa = pasoEncabezado.querySelector(".paso-mapa");
        linkMapa.href = mapa(to.lat, to.lon);
        const pasoHora = nuevoPaso.querySelector(".paso-hora .dato");
        pasoHora.textContent = startTime;
        const pasoDistancia = nuevoPaso.querySelector(".paso-distancia .dato");
        pasoDistancia.textContent = distance;
        const pasoDuracion = nuevoPaso.querySelector(".paso-duracion .dato");
        pasoDuracion.textContent = duration;
        const mapaPaso = nuevoPaso.querySelector(".mapa");
        generaMapa([to.lat, to.lon], mapaPaso);
        if (mode.toUpperCase() === "WALK") {
          nuevoPaso.classList.add("walk");
        } else if (mode.toUpperCase() === "BUS") {
          nuevoPaso.classList.add("bus");
        } else if (mode.toUpperCase() === "SUBWAY") {
          nuevoPaso.classList.add("subway");
        }
        listaPasos.append(nuevoPaso);
        i++;
      }
    });
});
