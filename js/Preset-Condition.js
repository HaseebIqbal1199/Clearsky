const img_block = document.getElementsByClassName('weather-presets')[0]
var is_day = 0
function weather_preset(data) {
    is_day = Number(JSON.stringify(data.current.is_day))
    if (is_day) {
        img_block.src = '../img/sunnyday.png'
        console.log("day:"+is_day);
    } else { 
        img_block.src = '../img/night.png'
        console.log("day:"+is_day);
    }
}