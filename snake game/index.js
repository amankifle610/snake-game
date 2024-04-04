var gameDiv=document.querySelector('#gameDiv')
var gameEnd=document.querySelector('.gameEnd')
var sco=document.querySelector('.sco')
var restart=document.querySelector('.restart')
let Dirction={x:0,y:0}
var randomNum=()=>Math.floor(Math.random()*35+1)
let food={x:randomNum(),y:randomNum()}
var snakeStart=randomNum()
var horizontal=true,vertical=true;
var snak=0;
var score=0;
const snake=[
    {x:snakeStart, y:snakeStart},
    {x:snakeStart+1, y:snakeStart}
]
var time=setInterval(StartGame,200)
function StartGame(){
   Snake()
   Food()
   game_over()
}
window.addEventListener('keydown',e=>{
    if(e.key=='ArrowUp'&&vertical==true){
        Dirction={x:0,y:-1}
        vertical=false
        horizontal=true
    }
    else if(e.key=='ArrowDown'&&vertical==true){
        Dirction={x:0,y:1}
        vertical=false
        horizontal=true
    }
    else if(e.key=='ArrowLeft'&&horizontal==true){
        Dirction={x:-1,y:0}
        horizontal=false
        vertical=true
    }
    else if(e.key=='ArrowRight'&&horizontal==true){
        Dirction={x:1,y:0}
        horizontal=false
        vertical=true
    }
})
function Food(){
    let val=false;
    if(snake[0].x==food.x&&snake[0].y==food.y){
        val=true
    }
    if(val){
        snak++
        let X=randomNum(),Y=randomNum()
        snake.some(e=>{
            if(e.x==X&&e.y==Y){
                X=randomNum()
                Y=randomNum()
            }
        })
        food={x:X,y:Y}
        score+=1
        sco.innerHTML=score
    }
    var a=document.createElement('div')
    a.style.gridRowStart=food.y
    a.style.gridColumnStart=food.x
    a.classList.add('food')
    gameDiv.appendChild(a)
}

function game_over(){
    if(snake[0].x<=0||snake[0].y<=0||snake[0].y>=35||snake[0].x>=35){
        stop()
    }
    for(let i=1;i<snake.length;i++){
        if(snake[0].x==snake[i].x&&snake[0].y==snake[i].y&&snake.length>3){
            stop()
        }
    }
}
function stop(){
    clearInterval(time)
    gameEnd.style.display='flex'
    gameDiv.style.opacity=0.3
}
function Snake(){
    for(let i=0;i<snak;i++){
        let s;
        snake.push(s)
    }
    snak=0
    for(let i=snake.length-2;i>=0;i--){
        snake[i+1]={ ...snake[i]}
    }
    snake[0].x+=Dirction.x
    snake[0].y+=Dirction.y
    gameDiv.innerHTML=''
    snake.forEach(e=>{
        const snakeElement=document.createElement('div')
        snakeElement.style.gridRowStart=e.y
        snakeElement.style.gridColumnStart=e.x
        snakeElement.classList.add('snake')
        gameDiv.appendChild(snakeElement)
    })
}
restart.addEventListener('click',()=>{
    location.reload();
})