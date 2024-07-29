let canvas=document.querySelector('canvas');

let ctx=canvas.getContext('2d');

let cellSize=50;

let snakeCells=[[0,0]]; 

let direction='right';

let gameOver=false;

let foodCell=generateFood();

let score=0;

document.addEventListener('keydown',(e)=>{
    if(e.key==='ArrowDown'){
        direction='down';
    }
    else if(e.key==='ArrowUp'){
        direction='up';
    }
    else if(e.key==='ArrowLeft'){
        direction='left';
    }
    else{
        direction='right';
    }
})

function draw(){
    if(gameOver===true){
        clearInterval(intervalId);
        ctx.font = '50px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('GAME OVER !!!', canvas.width/2, canvas.height/2);
        return;
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let c of snakeCells){
        ctx.fillStyle="brown";
        ctx.fillRect(c[0],c[1],cellSize,cellSize);
        ctx.strokeStyle='black';
        ctx.strokeRect(c[0],c[1],cellSize,cellSize);
    }

    ctx.fillStyle='orange';
    ctx.fillRect(foodCell[0],foodCell[1],cellSize,cellSize);

    ctx.fillStyle='black';
    ctx.font='24px monospace';
    ctx.fillText(`Score : ${score}`,20,20);
}

function update(){
    let headX=snakeCells[snakeCells.length-1][0];
    let headY=snakeCells[snakeCells.length-1][1];

    let newHeadX;    
    let newHeadY;

    if(direction==='right'){
        newHeadX=headX+cellSize;
        newHeadY=headY;
        if(newHeadX===canvas.width || khelKhatam(newHeadX,newHeadY)){
            gameOver=true;
        }
    }
    else if(direction==='left'){
        newHeadX=headX-cellSize;
        newHeadY=headY;
        if(newHeadX<0 || khelKhatam(newHeadX,newHeadY)){
            gameOver=true;
        }
    }
    else if(direction==='up'){
        newHeadY=headY-cellSize;
        newHeadX=headX;
        if(newHeadY<0 || khelKhatam(newHeadX,newHeadY)){
            gameOver=true;
        }
    }
    else{
        newHeadY=headY+cellSize;
        newHeadX=headX;
        if(newHeadY>=canvas.height || khelKhatam(newHeadX,newHeadY)){
            gameOver=true;
        }
    }

    snakeCells.push([newHeadX,newHeadY]);
    if(newHeadX===foodCell[0] && newHeadY===foodCell[1]){
        foodCell=generateFood();
        score+=1;
    }
    else{
        snakeCells.shift(); 
    }
}

let intervalId=setInterval(()=>{
    update();
    draw();
},100)


function generateFood(){
    return [Math.round((Math.random()*(canvas.width-cellSize))/cellSize)*cellSize,
    Math.round((Math.random()*(canvas.height-cellSize))/cellSize)*cellSize
]
}

function khelKhatam(newHeadX,newHeadY){
    for(let item of snakeCells){
        if(item[0]===newHeadX && item[1]===newHeadY){
            return true;
        }
    }
    return false;
}