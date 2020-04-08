// test socket.io
var http = require('http');
var fs = require('fs');

// Chargement du client
var server = http.createServer(function(req, res) {
    fs.readFile('./client.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
	// Affichage d'un message dans la console du server
    console.log('Connexion détectée');
    // Envoi d'un message en retour
    socket.emit('welcome', 'Connexion réussie')
});


server.listen(8282);