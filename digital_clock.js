
function digitalClock(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    d=date.getDate();
    mn=date.getMonth()+1;
    y=date.getFullYear();
    
    d = (d < 10) ? "0" + d : d;
    mn = (mn < 10) ? "0" + mn : mn;

    var date = "  "+d+'-'+mn+'-'+y;

    var time =  h + ":" + m + ":" + s + " " + session;

    var dateTime=date+" "+time;
    console.clear();
    console.log(dateTime);
    

    setTimeout(digitalClock, 1000);
}

digitalClock();



// 1) Command line based digital clock with date and time.
// 2) Develop a Video streaming server using nodejs.
// 3) Live cricket score application with websocket in nodejs.
// 4) Develop a web based chat bot of any domain using client and server JavaScript. Use ws or socket.io or any library. Use any of mysql/mongodb for data storage.