import { logger } from './logger.js';

function checkAsyncUserPass(system_id, password, errorCallback) {
    if (system_id == "YOUR_SYSTEM_ID" && password == "YOUR_PASSWORD") {
        //console.log('logged in');
        logger.info('logged in');
		errorCallback(false);
    } else {
        //console.log('login failed');
        logger.info('login failed');
        logger.error(JSON.stringify(new Error('login failed')));
        errorCallback(new Error('login failed'));
    }
}

export { checkAsyncUserPass }