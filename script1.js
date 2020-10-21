var log = $("#log");
var ul = $("#log-ul");
var input = $("#input");
var logs = [];

var button =  $("<button>").text("button");
$("#log").append(button);
var clear =  $("<button>").text("Clear");
$("#log").append(clear);

clear.on("click",function(){
    window.location.reload(true);
   window.localStorage.clear();
   ul.style.display ="none";
   
})


    button.on("click",function(){
      //  window.location.reload(true);
    var input = $("#input").val();

       // var curlogs={input:input}
       
    
        
            if (localStorage.getItem("log") !== null) {
            
                logs = JSON.parse(localStorage.getItem("log"));
            
            }
            
            logs.push(input);       
            localStorage.setItem("log",JSON.stringify(logs));
            stor();
    });



function stor(){
    $("#log-ul").empty();
  
    if (localStorage.getItem("log") !== null) {
        logs = JSON.parse(localStorage.getItem("log"));
       
    }

    for(var i =0 ; i< logs.length; i++){
        var one = logs[i]
      //  var two = one.input;
        var li = $("<li>").text(one);
            $("#log-ul").prepend(li);
          //  li.addclass("liel");
            $("#input").val("");
    }

   
}
stor();
//renderLogs();
