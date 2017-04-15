$(document).ready(function () {

     // $( ".chat").hide();
     // $( ".user-input-area").hide();
    payload = {
        "currentNode": "",
        "complete": null,
         "context":{},
        "parameters": [
        ],
        "extractedParameters": {},
        "speechResponse": "",
        "intent": {},
        "input": "init_conversation",
        "missingParameters": []
    }
    function scrollToBottom() {
        $(".chat ul")[0].scrollTop = $(".chat ul")[0].scrollHeight;
    }

    $(".chat-heading").click(function() {
        if ( $(".chat").is( ":hidden" ) ) 
        {
          $(".chat").show( "medium" );
          $( ".user-input-area").show("medium");
          $("#btn-input").focus();
        } else {
          $(".chat").slideUp();
          $( ".user-input-area").slideUp();
        }
  });

    var put_text = function (bot_say) {
        payload  = bot_say;
        html_data = '<li class="left clearfix"><div class="chat-body clearfix"><strong>Jarvis</strong><p>' + bot_say["speechResponse"] + '</p> </div></li>';
        $(".chat ul").append(html_data);
        scrollToBottom();
    };

    var send_req = function (userQuery) {
        payload["input"] = userQuery;
        $.ajax({
        url: 'https://iky-ai.herokuapp.com/api/v1',
        type: 'POST',
        data: JSON.stringify(payload),
        beforeSend: function() {
                $('.typing').show();
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(data) {
            $('.typing').hide();
            put_text(data);
            $("#btn-input").focus();
        },
        error:function(data){
                    $('.typing').hide();
                    html_data = '<li class="left clearfix"><div class="chat-body clearfix"><strong>Jarvis</strong><p>Hmm.Something went wrong.</p> </div></li>';
                    $(".chat ul").append(html_data);
                    scrollToBottom();

        }
        });
        return true;
    };

    setTimeout(function(){
          $(".slide1").hide('slide',{direction: 'left'}, 700,function(){
            $(".slide2").show('slide');
            setTimeout(function(){
              $(".slide2").hide('slide',{direction: 'left'}, 700,function(){
                $(".slide3").show('slide');
                $(".chat-area").show(function(){
                    $(".chat").show("fast");
                    $( ".user-input-area").show("fast");
                    $("#btn-input").focus();
                });
              });
            },3000);

          });
        
   }, 3000);

    send_req("init_conversation");


    $('#btn-input').keydown(function (e) {
        if (e.keyCode == 13) {
            userQuery = $("#btn-input").val();
            $("#btn-input").val("");
            html_data = '<li class="right clearfix"><div class="chat-body"><strong>you</strong><p>' + userQuery + '</p> </div></li>';
            $(".chat ul").append(html_data);
            scrollToBottom();
            send_req(userQuery);
        }
    })
});
