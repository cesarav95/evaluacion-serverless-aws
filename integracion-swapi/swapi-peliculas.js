'use strict';

const fetch = require('node-fetch')

const modelo = 'films'

const recuperar_peliculas = async (event, context, callback) => {
  try{
    // Obtener datos del API Swapi
    let data_swapi = await fetch(
      process.env.BASE_URL_SWAPI+"/"+modelo, {
      method: 'GET',                   
      headers: {
        'Content-type': 'application/json'
      }
    });
    //convertir la respuesta de SWAPI a formato JSON
    let response_swapi_films = await data_swapi.json().catch(e => { if (e) { throw e } });
    let data_films = response_swapi_films.results;
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
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        total: response_swapi_films.count,
        siguiente: response_swapi_films.next,
        anterior: response_swapi_films.previous,
        resultados: array_peliculas
      }),
    };
    //enviar respuesta
    callback(null, response);
  }catch(e){
    callback(e, null);    
  }
  return; 
};

const recuperar_pelicula = async(event, context, callback) => {

  try{
    //Recuperar parametros
    const id_pelicula =  event.pathParameters.id;
    // Obtener datos del API Swapi
    let data_swapi = await fetch(
      process.env.BASE_URL_SWAPI+"/"+modelo+"/"+id_pelicula, {
      method: 'GET',                   
      headers: {
        'Content-type': 'application/json'
      }
    });
    //convertir la respuesta de SWAPI a formato JSON
    let film = await data_swapi.json().catch(e => { if (e) { throw e } });
   
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
    const response = {
      statusCode: 200,
      body: JSON.stringify(datos_esp_pelicula),
    };
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
