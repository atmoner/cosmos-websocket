import WebSocket from 'ws';
import crypto from 'crypto';
 


const ws = new WebSocket('ws://seed1.bitcanna.io:26657/websocket'); 

ws.on('open', function open() {
	console.log('Connected on Bitcanna testnet blockchain form WebSocket');
	ws.send(JSON.stringify({
		"method":"subscribe",
		"params": ["tm.event='Tx'"],
		"id":"1",
		"jsonrpc":"2.0"
	}));
});

ws.on('close', function close() {
	console.log('disconnected');
});
 
ws.on('message', function incoming(data) {
	var finalData = JSON.parse(data.toString('utf-8'));

	if (finalData.result.data) {
		console.log(finalData.result.data.value.TxResult.result);
		finalData.result.data.value.TxResult.result.events.forEach(function(item){
			console.log(item.attributes);
		});
		
		//console.log(finalData.result.data.value.block.header.height);
	}
}); 

function decodeCosmosData(data) {
	var hash = crypto.createHash('sha256');
	// 1. Decode base64
	var buf = Buffer.from(data, 'base64');	
	// 2. Encode buffer to sha256 
	var dataa = hash.update(buf, 'utf-8');
	//Creating the hash in the required format
	var gen_hash = dataa.digest('hex');
 
	//console.log("Start decode: " + data);
	//console.log("hash : " + gen_hash);
	return gen_hash
}
