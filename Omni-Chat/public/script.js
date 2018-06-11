
var socket = io

function heure() {
    return (moment().format('HH:mm:ss')); // ici ma fonction pour trouver l'heure avec moment.js
}

// On demande le pseudo, on l'envoie au serveur et on l'affiche dans le titre
            var pseudo = prompt('Quel est votre pseudo ?');
            socket.emit('nouveau_client', pseudo); //on envoi le pseudo au serveur
            document.title = pseudo + ' - ' + document.title; // ici je personnalise le titre <head> avec le pseudo de l'utilisateur

            // Quand on reçoit un message, on l'insère dans la page
            socket.on('message', function(data) {
                insereMessage(data.pseudo, data.message,)
            })

            // Quand un nouveau client se connecte, on affiche l'information
                socket.on('nouveau_client', function(pseudo) {
                $('#zone_chat').prepend('<p>' + '<i>' + heure() + '</i>' + ' ' + '<em>' + pseudo + ' a rejoint le Chat !</em></p>');
            })

            // Lorsqu'on envoie le formulaire, on transmet le message et on l'affiche sur la page
            $('#formulaire_chat').submit(function () {
                var message = $('#message').val(); //stock la valeur de l'input dans une variable
                socket.emit('message', message); // Transmet le message aux autres
                insereMessage(pseudo, heure, message); // Affiche le message aussi sur notre page
                $('#message').val('').focus(); // Vide la zone de Chat et remet le focus dessus
                return false; // Permet de bloquer l'envoi "classique" du formulaire
            });

        
            // Ajoute un message dans la page
            function insereMessage(pseudo, heure, message) {
                $('#zone_chat').prepend('<p>' + '<i>' + heure() + '</i>' + ' ' + '<strong>' + pseudo + '</strong>' + ' ' + message + '</p>');
            }

            

