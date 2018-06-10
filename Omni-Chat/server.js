//on require express
var express = require("express");
var ent = require('ent'); // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)

//on declare express dans app
var app = express();

//on utilise le moteur de template ejs
app.set("view engine", "ejs");

//appel du dossier public (css, stripts.js)
app.use(express.static("public"));


//appel du fichier index.ejs (accueil)
app.get("/", function (req, res) {
    res.render('index');
});

// erreur 404
app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

//server sur port 8080
server = app.listen(8080);


//on require socket.io
var io = require('socket.io')(server); 


//connection socket.io
io.sockets.on('connection', function (socket, pseudo) {

    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('nouveau_client', function(pseudo) {
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        socket.broadcast.emit('nouveau_client', pseudo);
    });

    // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
    socket.on('message', function (message) {
        message = ent.encode(message);
        socket.broadcast.emit('message', {
            pseudo: socket.pseudo,
            message: message
        });
    }); 

});
