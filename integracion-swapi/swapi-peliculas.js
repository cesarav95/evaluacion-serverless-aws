'use strict';

const swapi = require('./conexion-swapi')
const api = require('../utils/api-response')

const modelo = 'films'

/**
 * Función para recuperar lista de peliculas de SWAPI
 */
const recuperar_peliculas = async (event, context, callback) => {
  try{
    // Obtener datos del API Swapi
    let data_swapi = await swapi.consultar(process.env.BASE_URL_SWAPI+"/"+modelo,'GET');
    //Verificar si hubo error al consultar a SWAPI
    if (!data_swapi.exito){
      callback(data_swapi.error, null);    
      return;
    }    
    let data_films = data_swapi.datos.results;
    let array_peliculas = [];
    let film;
    for(film of data_films){
      //Mapear los atributos del modelo film y traducirlos a español
      let datos_esp_pelicula = {
        personajes : film.characters,
        creado :film.created,
        director: film.director,
        editado: film.edited,
        id_episodio: film.episode_id,
        dialogo_apertura: film.opening_crawl,
        planetas : film.planets,
        productor: film.producer,
        fecha_estreno: film.release_date,
        especies: film.species,
        naves: film.starships,
        titulo: film.title,
        url : film.url,
        vehiculos: film.vehicles
      };
      array_peliculas.push(datos_esp_pelicula);
    }   

    //Construir respuesta
    let response = await api.construirRespuestaSwapi(200, data_swapi.datos, array_peliculas);
    //enviar respuesta
    callback(null, response);
  }catch(e){
    callback(e, null);    
  }
  return; 
};

/**
 * Función que recuperar datos de una sola pelicula de SWAPI
 */
const recuperar_pelicula = async(event, context, callback) => {

  try{
    //Recuperar parametros
    const id_pelicula =  event.pathParameters.id;
    // Obtener datos del API Swapi
    let data_swapi = await swapi.consultar(process.env.BASE_URL_SWAPI+"/"+modelo+"/"+id_pelicula,'GET');
    //Verificar si hubo error al consultar a SWAPI
    if (!data_swapi.exito){
      callback(data_swapi.error, null);    
      return;
    } 
    //convertir la respuesta de SWAPI a formato JSON
    let film = await data_swapi.datos
   
    //Mapear los atributos del modelo film y traducirlos a español
    let datos_esp_pelicula = {
      personajes : film.characters,
      creado :film.created,
      director: film.director,
      editado: film.edited,
      id_episodio: film.episode_id,
      dialogo_apertura: film.opening_crawl,
      planetas : film.planets,
      productor: film.producer,
      fecha_estreno: film.release_date,
      especies: film.species,
      naves: film.starships,
      titulo: film.title,
      url : film.url,
      vehiculos: film.vehicles
    }; 

    //Construir respuesta
    let response = await api.construirRespuestaGeneral(200,datos_esp_pelicula);
    //enviar respuesta
    callback(null, response);
  }catch(e){
    callback(e, null);    
  }
  return; 

}
module.exports = {
  recuperar_peliculas,
  recuperar_pelicula
}
