//randomly gives an integer between integers a and b
function range(a,b){
    return a + Math.floor(Math.random() * (b - a))
}

function degToRad(deg){
    return deg/180 * Math.PI
}

//returns the x and y length of a right triangle with hypotenuse of "length"
// and an angle of "angle".

function findXY(length,angle){
    return{
        y: Math.sin(angle) * length * -1,
        x: Math.cos(angle) * length
    }
}

//functions for the rotating arms of the spirograph
function Arm(radius,speed,draws = false, direction = 270){
    this.radius = radius;
    this.draws = draws;
    this.direction = direction
    this.speed = speed;
}

let canvas = document.getElementById("draw-canvas")

let draw = canvas.getContext("2d")

let arms = []

let hue = 0;

function randomizeArms(number){
    arms = [];

    for(let i = 0; i < number; i++){
        arms[i] = new Arm(range(30,100),range(-10,10))

        if(i === number - 1)
            arms[i].draws = true
    }

    console.log(arms)
}

//determining the position of "drawing point" of the rotating arms.

function determineDrawPos(){
    let pos ={
        x: 0,
        y: 0
    }
    arms.forEach(function(index){
        let indexPos = findXY(pos.radius,degToRad(pos.direction))

        pos.x += indexPos.x

        pos.y += indexPos.y
    })

    return pos
}

function drawStep(){

    //adjusting the color
    hue += 1;

    let red = 0;

    let green = 0;

    let blue = 0;

    if(hue <= 100 || hue > 500){
        red = 255
    }

    if(hue > 100 && hue <= 200)
        red = 255 - ((hue -100) *2.55)

    if(hue > 400 && hue <= 500)
        red = ((hue -400) *2.55)

    if(hue > 100 && hue <= 300)
        green = 255

    if(hue <= 100)
        green = ((hue) *2.55)

    if(hue > 300 && hue <= 400)
        green = 255 - ((hue -300) *2.55)

    if(hue > 300 && hue <= 500)
        blue = 255

    if(hue > 200 && hue <= 300)
        blue = ((hue -200) *2.55)

    if(hue > 500)
        blue = 255 - ((hue -500) *2.55)
    
    red = Math.round(red).toString(16)

    green = Math.round(green).toString(16)

    blue = Math.round(blue).toString(16)

    if(red.length === 1)
        red = "0" + red

    if(green.length === 1)
        green = "0" + green

    if(blue.length === 1)
        blue = "0" + blue

    let drawColor = `#${red}${green}${blue}`
    // -end adjust color

    // starting a new line

    draw.beginPath();
}