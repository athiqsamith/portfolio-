let stations = [];
let branches = [];
let particles = [];

let audioStarted = false;
let osc;
let gain;

function setup(){

let canvas = createCanvas(windowWidth, windowHeight);
canvas.parent("sketch-container");

setupStations();
setupParticles();

osc = new p5.Oscillator("sawtooth");
osc.start();
osc.amp(0);

}

function windowResized(){
resizeCanvas(windowWidth, windowHeight);
}

function draw(){

background(5,8,12);

drawNoise();
drawMetroLine();
drawStations();

}

function mousePressed(){
userStartAudio();
audioStarted = true;
}

function setupStations(){

let centerX = width/2;
let gap = height/6;

for(let i=0;i<5;i++){

stations.push({
x:centerX,
y:gap*(i+1),
branches:[]
});

}

branches.push({x:width/2-160,y:height/3});
branches.push({x:width/2+150,y:height/2});
branches.push({x:width/2-180,y:height/1.6});

}

function drawMetroLine(){

stroke(160,160,200);
strokeWeight(3);

line(width/2,0,width/2,height);

}

function drawStations(){

for(let s of stations){

let d = dist(mouseX,mouseY,s.x,s.y);

if(d<40){

fill(220);
stroke(120,200,255);
strokeWeight(2);

playTrainSound();

}else{

fill(200);
noStroke();

}

circle(s.x,s.y,16);

}

stroke(120,200,255,150);
strokeWeight(2);

for(let b of branches){

line(width/2,b.y,b.x,b.y);

fill(120,200,255);
circle(b.x,b.y,10);

}

}

function playTrainSound(){

if(!audioStarted) return;

let freq = random(200,500);

osc.freq(freq);

osc.amp(0.15,0.05);
osc.amp(0,0.3);

}

function setupParticles(){

for(let i=0;i<120;i++){

particles.push({
x:random(width),
y:random(height),
vx:random(-0.2,0.2),
vy:random(-0.2,0.2),
r:random(1,2)
});

}

}

function drawNoise(){

noStroke();

for(let p of particles){

p.x+=p.vx;
p.y+=p.vy;

if(p.x<0)p.x=width;
if(p.x>width)p.x=0;
if(p.y<0)p.y=height;
if(p.y>height)p.y=0;

fill(255,255,255,40);
circle(p.x,p.y,p.r);

}

}
