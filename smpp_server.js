import smpp from 'smpp';
import { checkAsyncUserPass } from './utils/auth.js';
import { logger } from './utils/logger.js';
import { sendData } from './utils/request.js';

var server = smpp.createServer({
	debug: true
}, function(session) {
	session.on('error', function (err) {
        //console.log('Err ', error);
        logger.error(JSON.stringify(err));
		// Something ocurred, not listening for this event will terminate the program
  	});
	session.on('bind_transceiver', async (pdu) => {
        console.log('pdu', pdu);
        logger.info(JSON.stringify({type:"PDU command", PDU:pdu}));
        
		session.pause();
		checkAsyncUserPass(pdu.system_id, pdu.password, function(err) {
            logger.info("system id, passwrod " + pdu.system_id + pdu.password);
            //console.log("system id, passwrod ", pdu.system_id, pdu.password);
			if (err) {
				session.send(pdu.response({
					command_status: smpp.ESME_RBINDFAIL
				}));
				session.close();
				return;
			}
			session.send(pdu.response());
			session.resume();
		});
		
	});
	session.on('debug', function(type, msg, payload) {
		console.log('debug', {type: type, msg: msg, payload: payload});
		logger.info(JSON.stringify({type: type, msg: msg, payload: payload}));
	});
	session.on('submit_sm', async (pdu) => {
		logger.info(JSON.stringify(pdu));
		if (pdu.destination_addr != undefined && pdu.short_message != undefined) {
			await sendData(pdu.destination_addr, pdu.short_message.message);
		}
	});
});

//TODO: move to env
server.listen(2775);


