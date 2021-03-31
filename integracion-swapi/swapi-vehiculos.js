'use strict';

const swapi = require('./conexion-swapi')
const api = require('../utils/api-response')

const modelo = 'vehicles'

module.exports.recuperar_vehiculos = async (event, context, callback) => {
  try{
    // Obtener datos del API Swapi
    let data_swapi = await swapi.consultar(process.env.BASE_URL_SWAPI+"/"+modelo,'GET');
    //Verificar si hubo error al consultar a SWAPI
    if (!data_swapi.exito){
      callback(data_swapi.error, null);    
      return;
    }    
    let data_vehiculos = data_swapi.datos.results;
    let array_vehiculos = [];
    let e;
    for(e of data_vehiculos){
      //Mapear los atributos del modelo vehicles y traducirlos a español
      let datos_esp_vehiculos = {
        capacidad_de_carga : e.cargo_capacity,
        consumibles :e.consumables,
        costo_en_creditos: e.cost_in_credits,
        creado: e.created,
        tripulacion: e.crew,
        editado: e.edited,
        longitud : e.length,
        fabricante: e.manufacturer,
        velocidad_max_atmosferica: e.max_atmosphering_speed,
        modelo: e.model,
        nombre: e.name,
        pasajeros: e.passengers,
        pilotos : e.pilots,
        peliculas: e.films,
        clase_de_vehiculo: vehicle_class,
        url: e.url
      };
      array_vehiculos.push(datos_esp_vehiculos);
    }   

    //Construir respuesta
    let response = await api.construirRespuestaSwapi(200, data_swapi.datos, array_vehiculos);
    //enviar respuesta
    callback(null, response);
  }catch(e){
    callback(e, null);    
  }
  return; 
};
