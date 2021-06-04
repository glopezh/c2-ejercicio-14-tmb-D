/* global mapboxgl */

// Datos para las APIs
const geocodingApi = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const mapboxToken =
  "pk.eyJ1IjoicmFsbGdlIiwiYSI6ImNrcGk4azdjbjBndHcydXBjYXc2MzUweTQifQ.GDFAAG5UrMSO4_xPTFqaeg"; // Mete aquí el Token de Mapbox
const tmbApi = "https://api.tmb.cat/v1/planner/plan";
const appId = "0031bdb3"; // Mete aquí el app_id de TMB
const appKey = "1eef12f633798f1b3f0427e9c6e39525"; // Mete aquí el app_key de TMB
mapboxgl.accessToken = mapboxToken;

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

// Pruebas MapBox
const places = "Barcelona.json";
fetch(`${geocodingApi}${places}?access_token=${mapboxToken}`)
  .then((response) => response.json())
  .then((datos) => {
    const coordenadas = datos.features[0].geometry.coordinates;
    console.log(coordenadas);
    return coordenadas;
  });

// Pruebas TMB
const fromPlace = "41.3755204,2.1498870"; // Coordenadas de Barcelona
const toPlace = "41.3789985,2.1377242";
// Datos no required
const date = "06-06-2021";
const time = "14:00";
const arriveBy = "false"; // false: date y time tipo salida; true: date y time tipo llegada
const mode = "WALK";
/* fetch(
  `${tmbApi}?app_id=${appId}&app_key=${appKey}&fromPlace=${fromPlace}&toPlace=${toPlace}&date=${date}&time=${time}&arriveBy=${arriveBy}&mode=${mode}`
); */
fetch(
  `${tmbApi}?app_id=${appId}&app_key=${appKey}&fromPlace=${fromPlace}&toPlace=${toPlace}`
);
