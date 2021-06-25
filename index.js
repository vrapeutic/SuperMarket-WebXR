var _time = "0";
var items = 0;

function set_timer(time) {
    sessionStorage.setItem('timer', time);
    //  alert(sessionStorage.getItem('level'));
    var data = {
        funcName: 'set_timer',
        params: [
            time
        ]
    }
    _time = time;
    document.getElementById("counter").setAttribute("value", time);

}


function start_game() {
    var gameDiv = document.getElementById('game');

    var data = {
        funcName: 'start_game',
        params: []
    }

    var drMenuDiv = document.getElementById('dr-menu');
    document.getElementById("counter").setAttribute("timecounter", "enabled:true");
    drMenuDiv.style.visibility = 'hidden';
    gameDiv.style.visibility = 'visible';


}