import fetch from "node-fetch";
import { logger } from './logger.js';

async function sendData (phone, message) {
    let data = {
        message: phone + "&&" + message,  
        sender:"admin"
    }

    try {
        //TODO: move to env
        let response = await fetch('http://138.68.87.41:5006/webhooks/rest/webhook', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data) 
        }); 
		console.log(response);
		logger.info(response);
    } catch (error) {
        console.log('ERR', error);
		logger.error(JSON.stringify(error));
    }
}

export { sendData }
