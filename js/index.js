/* global mapboxgl */

// Datos para las APIs
const geocodingApi = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const mapboxToken =
  "pk.eyJ1IjoicmFsbGdlIiwiYSI6ImNrcGk4azdjbjBndHcydXBjYXc2MzUweTQifQ.GDFAAG5UrMSO4_xPTFqaeg"; // Mete aquí el Token de Mapbox
const tmbApi = "https://api.tmb.cat/v1/planner/plan";
const appId = "0031bdb3"; // Mete aquí el app_id de TMB
const appKey = "1eef12f633798f1b3f0427e9c6e39525"; // Mete aquí el app_key de TMB
mapboxgl.accessToken = mapboxToken;
const mapa =
  "https://www.google.com/maps?z=19&t=m&q=loc:COORDENADA1+COORDENADA2";

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

// Recogemos las coordenadas de origen y destino con Mapbox
const placesOrigen = "Sagrada familia"; // String con la dirección de la que queremos las coordenadas (máx 20 words). Lo recogeremos de HTML
const placesDestino = "catalunya barcelona";
// Datos de origen
fetch(`${geocodingApi}${placesOrigen}.json?access_token=${mapboxToken}`)
  .then((response) => response.json())
  .then((datos) => {
    const [longitud, latitud] = datos.features[0].geometry.coordinates; // Array de coordenadas [latitud,longitud]
    latitudOrigen = latitud;
    longitudOrigen = longitud;

    // Datos de destino
    fetch(`${geocodingApi}${placesDestino}.json?access_token=${mapboxToken}`)
      .then((response) => response.json())
      .then((datos) => {
        const [longitud, latitud] = datos.features[0].geometry.coordinates; // Array de coordenadas [latitud,longitud]
        latitudDestino = latitud;
        longitudDestino = longitud;

        // Mandamos las coordenadas a la API de TMB
        const fromPlace = `${latitudOrigen},${longitudOrigen}`; // Coordenadas de AM de Barcelona
        const toPlace = `${latitudDestino},${longitudDestino}`;
        fetch(
          `${tmbApi}?app_id=${appId}&app_key=${appKey}&fromPlace=${fromPlace}&toPlace=${toPlace}`
        )
          .then((response) => response.json())
          .then((datos) => {
            const itinerarios = datos.plan.itineraries;
            console.log(itinerarios);
          });
      });
  });

// Integración API Mapbox (obtenemos coordenadas) + API TMB (pasos a seguir para la ruta)
