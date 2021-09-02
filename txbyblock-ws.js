import WebSocket from 'ws';
import crypto from 'crypto';
 


const ws = new WebSocket('ws://168.119.4.123:26657/websocket'); // ws://168.119.4.123:26657/websocket

ws.on('open', function open() {
	console.log('Connected on Atom blockchain form WebSocket');
	ws.send(JSON.stringify({
		"method":"subscribe",
		"params": ["tm.event='NewBlock'"],
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
		console.log('');
		console.log('************** Tx\'s in block '+finalData.result.data.value.block.header.height+' ****************');
		var getTxBlock = finalData.result.data.value.block.data.txs;
		getTxBlock.forEach(function(item){
			console.log(decodeCosmosData(item));
		});
		console.log('');
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
