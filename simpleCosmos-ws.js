// Call webSocket from tendermint
// https://docs.tendermint.com/master/rpc/
// Coded by @atmon3r for Bitcanna 💚

import WebSocket from 'ws';

const ws = new WebSocket('ws://seed1.bitcanna.io:26657/websocket');

ws.on('open', function open() {
	console.log('Connected on Bitcanna testnet-1 blockchain form WebSocket');
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
	if (finalData.result.data)
		console.log(finalData.result);
}); 
