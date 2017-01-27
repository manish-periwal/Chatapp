
   var socket = io.connect();
    var $messageForm = $("#messageForm");
    var $message = $("#message");
    var $chat = $("#chatWindow");
   var $usernameForm=$("#usernameForm");
   var $users = $("#users");
   var $username = $("#username");
    var $error = $('#error');
    $usernameForm.submit(function(e){
        e.preventDefault();
        socket.emit('new user',$username.val());

        socket.on('userSet', function(data) {
            $('#namesWrapper').hide();
            $('#mainWrapper').show();

        });

        socket.on('userExists', function(data){
                $error.html(data);
            });

        $username.val('');
        });

   socket.on('usernames',function(data) {
       var html = '';
       for (var i = 0; i < data.length; i++) {
           html += data[i] + '<br>';
       }
       $users.html(html);
   });

    $messageForm.submit(function(e){
        e.preventDefault();
        if(!$message.val()){}
        else {
            socket.emit('send message', $message.val());
            $message.val('');
        }
    });

        socket.on('new message', function(user,data){
            $chat.append('<strong>' + user + '</strong>:' + data + '<br>');
        });

