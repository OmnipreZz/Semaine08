
//appel dépendances
var express = require('express');
var lodash = require('lodash');
var bodyParser = require('body-parser');

//variables
var msg = "";
var number;
var message;
var count = 0; //conteur pour le nombre d'essai
var nbrRandom;

//express() est déclaré dans app
var app = express();

//on utilise le moteur de template ejs
app.set("view engine", "ejs");

//appel le bodyParser
app.use(bodyParser.urlencoded({ extended: false}));

//appel du fichier css
app.use(express.static('public'));


//appel de ma page d'accueil index.ejs
app.get('/', function (req, res) {
    res.render('index');
    nbrRandom = lodash.random(0, 9); // je déclare ici mon number random
    msg= "";
});

//appel mystere.ejs
app.post('/mystere', function (req, res) {
    var nbr = req.body.num; // je recupére la valeur de mon input par son name, avec bodyparser
    console.log(nbrRandom);
    if (nbr == nbrRandom) {
        count = 0;
        res.render("gagne");
    } else if (nbr < nbrRandom) {
        count++;                                  //Nombre mystère !!!!
        msg = "Non c'est + essaye encore";
    } else if (nbr > nbrRandom) {
        count++;
        msg = "Non c'est - essaye encore";
    }
    
    if (count === 3) {
        count = 0;
        msg = " " + "C'été le" + " " + nbrRandom;
        res.render("perdu", {
            message: msg //C'est perdu !!! j'affiche ici le nombre aléatoire choisi par le programme
        });
    }  

    res.render('mystere', {
        number: nbr, message: msg  //j'affiche le nombre choisi par l'utilisateur et le message associé
    });
    
})

//appel perdu.ejs
app.post('/perdu', function (req, res) {
    res.render('/'); //retour a l'accueil
})

//appel gagne.ejs
app.post('/gagne', function (req, res) {
    res.render('/'); //retour a l'accueil
})

// erreur 404
app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

// localhost:8080
app.listen(8080);

