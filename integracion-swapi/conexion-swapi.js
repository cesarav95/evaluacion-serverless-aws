'use strict';
const fetch = require('node-fetch')

/**
 * Funcion que recuperar datos de SWAPI 
 * @param {String} url : URL del api.
 * @param {String} method : Método de consulta.
 * @returns {Object}
 */
module.exports.consultar = async (url, method) => {
    try {
        // Obtener datos del API Swapi
        let data_swapi = await fetch(
            url, {
            method: method,                   
            headers: {
                'Content-type': 'application/json'
            }
        });
        //convertir la respuesta de SWAPI a formato JSON
        let response_swapi = await data_swapi.json().catch(e => { if (e) { throw e } });
        return { 
            exito : true, 
            datos: response_swapi 
        };
        
    } catch (error) {
        return { exito : false, error: error };        
    }
}
