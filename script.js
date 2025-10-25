function draw(){

const canvas = document.getElementById('canvas');

const context = canvas.getContext('2d');

context.fillStyle = "rgb(0 200 0)";
context.fillRect(0,0,10,10);

}

function resizeWindow(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    draw();
}



resizeWindow();
window.addEventListener('resize', resizeWindow);


draw();