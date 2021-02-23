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
function Arm(id,radius,speed,draws = false, direction = 90){
    this.id = "arm-" + String(id)
    this.name = "Arm " + String(id + 1)
    this.radius = radius;
    this.draws = draws;
    this.direction = direction
    this.speed = speed;
}

let canvas = document.getElementById("draw-canvas")

let draw = canvas.getContext("2d")

draw.translate(500,500)

draw.linejoin = "round"

let drawInterval

let drawing = false;

let arms = []

let hue = 0;

function randomizeArms(number){
    arms = [];

    for(let i = 0; i < number; i++){
        arms[i] = new Arm(i,range(30,100),range(-30,30)/2)

        if(i === number - 1)
            arms[i].draws = true
    }

    //Add controls for each arm

    $("#arm-settings").html("")

    arms.forEach(function(index){
        console.log(index.id)

        $("#arm-settings").append(`
            <div>
                <p> ${index.name} </p>

                <span> Length </span>

                <input type=range min = "30" max = "100" value = ${index.radius} id = "${index.id}-length">
            </div>
        `)
    })

    hue = range(1,600);

    $("#colorRange").val(hue)

    console.log(arms)
}

//determining the position of "drawing point" of the rotating arms.

function determineDrawPos(){
    let pos ={
        x: 0,
        y: 0
    }
    arms.forEach(function(index){
        let indexPos = findXY(index.radius,degToRad(index.direction))

        pos.x += indexPos.x

        pos.y += indexPos.y
    })

    return pos
}

//Prepares and begins the interval for drawing the spirograph.

function drawStart(){
    drawing = true;

    hue = $("#colorRange").val()

    arms.forEach(function(index){
        index.radius = $("#" + index.id +"-length").val()
    })

    $(".button").css("background","transparent")
    $(".button").css("cursor","default")
    draw.clearRect(-500,-500,canvas.offsetWidth,canvas.offsetHeight)

    drawInterval = setInterval(function(){
        drawStep();
    }, 6)
}

function drawStep(){

    //adjusting the color
    //hue += 1;

    if(hue > 600){
        hue = 1
    }

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

    draw.strokeStyle = drawColor;

    draw.beginPath();

    let pos = determineDrawPos();

    draw.moveTo(pos.x,pos.y)

    //moving the arms according to their speed.

    let done = true

    arms.forEach(function(index){
        index.direction += index.speed

        if(index.direction > 360){
            index.direction -= 360
        }

        if(index.direction < 0){
            index.direction += 360
        }

        if(index.direction !== 90)
            done = false
    })

    // finishing the line

    pos = determineDrawPos();

    draw.lineTo(pos.x,pos.y)

    draw.stroke();

    if(done === true){
        drawing = false
        clearInterval(drawInterval);

        $("#random-button").css("background","#888822")
        $("#start-button").css("background","#11cc22")
        $(".button").css("cursor","pointer")
    }
}

function createSettings(){

    arms.forEach(function(index){
        $("#settings").append(

        )
    })

}

$("body").on("click","#random-button",function(event){
    if(drawing === false){
        randomizeArms(3)

        drawStart();
    }
})

$("body").on("click","#start-button",function(event){
    if(drawing === false){
        drawStart();
    }
})

randomizeArms(3)

drawStart();