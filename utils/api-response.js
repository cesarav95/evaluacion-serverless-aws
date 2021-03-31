'use strict';


/**
 * Función para construir el response de los datos obtenidos de SWAPI
 * @param {Integer} status_code 
 * @param {Object} swapi_data 
 * @param {Array} map_data 
 */
const construirRespuestaSwapi = async (status_code, response_swapi, map_data) => {
    let response = {
        statusCode: status_code,
        body: JSON.stringify({
            total: response_swapi.count,
            siguiente: response_swapi.next,
            anterior: response_swapi.previous,
            resultados: map_data
        }),
    };
    return response;
}

/**
 * Funcion para contruir un response general del api
 * @param {Integer} status_code 
 * @param {Object} data 
 * @returns 
 */
const construirRespuestaGeneral = async (status_code, data) => {
    let response = {
        statusCode: status_code,
        body: JSON.stringify(data)
    }
    return response;
}

module.exports = {
    construirRespuestaSwapi,
    construirRespuestaGeneral
}