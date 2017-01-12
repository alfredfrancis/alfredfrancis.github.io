window.onload = function(){  
    document.getElementById('ftnt_topbar_script').setAttribute("async", "");
}

$(document).ready(function () {

     $( ".chat").hide();
     $( ".user-input-area").hide();
    payload = {
        "currentNode": "",
        "complete": null,
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
        url: 'http://89.33.207.202/api/v1',
        type: 'POST',
        data: JSON.stringify(payload),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(data) {
            put_text(data);
            $("#btn-input").focus();
        }
        });
        return true;
    };

    setTimeout(function(){
          $(".slide1").hide('slide',{direction: 'left'}, 400,function(){
            $(".slide2").show('slide');
            setTimeout(function(){
              $(".slide2").hide('slide',{direction: 'left'}, 400,function(){
                $(".slide3").show('slide');
                $(".chat").show( "slow" );
                $( ".user-input-area").show("slow");
                $("#btn-input").focus();
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