'use strict';

const swapi = require('./conexion-swapi')
const api = require('../utils/api-response')

const modelo = 'starships'

module.exports.recuperar_naves = async (event, context, callback) => {
  try{
    // Obtener datos del API Swapi
    let data_swapi = await swapi.consultar(process.env.BASE_URL_SWAPI+"/"+modelo,'GET');
    //Verificar si hubo error al consultar a SWAPI
    if (!data_swapi.exito){
      callback(data_swapi.error, null);    
      return;
    }    
    let data_naves = data_swapi.datos.results;
    let array_naves = [];
    let e;
    for(e of data_naves){
      //Mapear los atributos del modelo starships y traducirlos a español
      let datos_esp_nave = {
        MGLT : e.MGLT,
        capacidad_carga :e.cargo_capacity,
        consumibles: e.consumables,
        costo_en_creditos: e.cost_in_credits,
        creado: e.created,
        tripulacion: e.crew,
        editado : e.edited,
        indice_de_hiperimpulso: e.hyperdrive_rating,
        longituf: e.length,
        fabricante: e.manufacturer,
        velocidad_max_atmosferica: e.max_atmosphering_speed,
        modelo: e.model,
        pasajeros : e.passengers,
        peliculas: e.films,
        pilotos: e.pilots,
        clase_nave: e.starship_class,
        url: e.url
      };
      array_naves.push(datos_esp_nave);
    }   
    //Construir respuesta
    let response = await api.construirRespuestaSwapi(200, data_swapi.datos, array_naves);
    //enviar respuesta
    callback(null, response);
  }catch(e){
    callback(e, null);    
  }
  return; 
};
