import axios from 'axios';
import "dotenv/config";
const apiUrl = process.env.url_cron_api || 'http://localhost:3020/cron/register';
// const apiUrl = 'cron-client.nube-tec.com';
const requestData = {
    domain: process.env.url || ""
};
const headers = {
    'Content-Type': 'application/json', // Establece el tipo de contenido como JSON
    'Authorization': process.env.token || "", // Agrega un encabezado de autorización si es necesario
};
setInterval(async () => {
    axios.post(apiUrl + "/cron/register", requestData, { headers })
        .then(response => {
            // console.log('Respuesta del servidor:', response.data);
        }).catch(error => {
            console.error('Error en la solicitud:', error.message);
        });
}, 10000); // Ejecutar cada 5 minutos