/**
 * Created by manishp on 20-01-2017.
 */
    var path = require('path');
var express = require('express'),
app=express(),
 server = require('http').createServer(app),
 io= require('socket.io').listen(server);
usernames=[];
server.listen(process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection',function(socket){

    function updateUsernames(){
        socket.emit('usernames',usernames);
    };


        socket.on('new user',function(data){
                if(usernames.indexOf(data)!=-1)
                {
                    socket.emit('userExists', data + ' username is taken! Try some other username.');
                }
                else{

                    socket.username=data;
                    usernames.push(socket.username);
                    socket.emit('userSet', {username: data});
                    updateUsernames();

                }
        });




        socket.on('send message',function(data){
            updateUsernames();
            io.sockets.emit('new message',socket.username, data)});

    socket.on('disconnect',function(data){
        if(!socket.username) return;
        usernames.splice(usernames.indexOf(socket.username),1);
        updateUsernames();
    })

});