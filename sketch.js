var paddle1,paddle2,bg,ball,ballimg,pong1,pong2;
var gamestate;
var player1_score=0;
var player2_score=0;
function preload(){
    bg=loadImage("images/bg.jpg");
    ballimg=loadImage("images/ball.png");
    pong1=loadImage("images/pong1.png");
    pong2=loadImage("images/pong2.png");
}

function setup(){
    createCanvas(400,400);
    paddle1=createSprite(380,200,10,100);
    paddle1.addImage(pong1);
    paddle1.scale=0.2;
    paddle2=createSprite(20,200,10,100);
    paddle2.addImage(pong2);
    paddle2.scale=0.2;
    ball=createSprite(200,200,10,10);
    ball.addImage(ballimg);
    ball.scale=0.03;
    edges=createEdgeSprites();
    gamestate="play";
}

function draw(){
    background(bg);

    paddle1.y=mouseY;


    for(i=0;i<400; i=i+20){
        line(200,i,200,i+10);
    }

    ball.bounceOff(edges[2]);
    ball.bounceOff(edges[3]);
    ball.bounceOff(paddle1);
    ball.bounceOff(paddle2);

    if(gamestate === "play"){
        text("Press SPACE to Start",150,180);
    }
    fill("black");
    text(("Player 1 Score :"+player1_score),90,10);
    text(("Player 2 Score :"+player2_score),220,10);

    paddle2.y=ball.y;

    if(ball.x >400 || ball.x <0){
        if(ball.x >400){
            player1_score=player1_score+1;
        }
        if(ball.x <0){
            player2_score=player2_score+1;
        }

        reset();
    }

    if(keyDown("space") && gamestate==="play"){
        serve();
        gamestate="play";
    }

    if((player1_score===5) || (player2_score===5)){
        gamestate="over";
        text("Game Over",165,180);
        text("Pres 'r' to Start Over", 140,140);
    }

    if(keyDown("r") && gamestate==="over"){
        gamestate="play";
        player1_score=0;
        player2_score=0;
    }




    drawSprites();
}

function serve(){
    ball.velocityX=3;
    ball.velocityY=5;
}

function reset(){
    ball.velocityX=0;
    ball.velocityY=0;
    ball.x=200;
    ball.y=200;
}
