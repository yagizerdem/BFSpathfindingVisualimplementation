const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Wall{
    static size = 30
    constructor({x , y}){
        this.x = x 
        this.y = y 
    }
    draw(){
        context.beginPath()
        context.fillStyle = 'blue'
        context.fillRect(this.y,this.x , Wall.size , Wall.size)
        context.closePath()
    }
}
class Point{
    constructor({x,y,radius}){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = 'orange'
    }
    draw(){
        context.beginPath()
        context.fillStyle = this.color
        context.arc(this.y ,this.x , this.radius , Math.PI*2 , false)
        context.fill()
        context.closePath()
    }
}


// varibales
const AREA = [  
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
const allWalls = []
const fps = 30
var player = new Pacman({x:Wall.size*21 +Wall.size/ 2  ,y:Wall.size*10 + Wall.size/ 2 , radius:10})
var allPoints = []
var allGhosts = [
    new Ghost({x:10*Wall.size + Wall.size / 2 , y: 9*Wall.size + Wall.size /2, radius:10,targetRadius:250 , speed:1 , pacman:player , color:'pink'}),
    new Ghost({x:10*Wall.size + Wall.size / 2 , y: 11*Wall.size + Wall.size /2, radius:10,targetRadius:50 , speed:5 , pacman:player ,  color:'purple'}),
    new Ghost({x:11*Wall.size + Wall.size / 2 , y: 9*Wall.size + Wall.size /2, radius:10,targetRadius:100 , speed:Pacman.baseSpeed / 2 , pacman:player ,color:'red'}),
    new Ghost({x:11*Wall.size + Wall.size / 2 , y: 11*Wall.size + Wall.size /2, radius:10,targetRadius:100 , speed:Pacman.baseSpeed / 2 , pacman:player, color:'green'}),
]
//
AREA.forEach((row , i) => {
    row.forEach((element ,j) => {
        if(element == 1){
            allWalls.push(new Wall({x:i*Wall.size,y:j*Wall.size}))
        }
        else if(element == 2){
            allPoints.push(new Point({x:i*Wall.size + Wall.size / 2, y:j*Wall.size + Wall.size / 2 , radius:4}))
        }
    });
});

// ui updating
function draw(){
    drawWalls()
    drawPoints()
    drawGhosts()
    player.draw()
}
function drawWalls(){
    allWalls.forEach((wall)=>{
        wall.draw()
    })
}
function drawPoints(){
    allPoints.forEach(point => {
        point.draw()
    });
}
function drawGhosts(){
    allGhosts.forEach(ghost => {
        ghost.draw()
    });
}
// state logic
function update(){
    context.clearRect(0,0,canvas.width,canvas.height)
    player.update()
    updateGhosts()
}
function updateGhosts(){
    for(var ghost of allGhosts){
        ghost.update()
    }
}
function game(){
    update()
    draw()
}
var loop = setInterval(game, 1000/fps)

window.addEventListener('keydown',({key})=>{
    // if(key == "Enter"){
    //     allPoints = []
    // }
    player.changeDirectionIfPossible(key)
})

function restartGame(){
    player = new Pacman({x:Wall.size*21 +Wall.size/ 2  ,y:Wall.size*10 + Wall.size/ 2 , radius:10})
     allGhosts =  [
        new Ghost({x:10*Wall.size + Wall.size / 2 , y: 9*Wall.size + Wall.size /2, radius:10,targetRadius:250 , speed:1 , pacman:player , color:'pink'}),
        new Ghost({x:10*Wall.size + Wall.size / 2 , y: 11*Wall.size + Wall.size /2, radius:10,targetRadius:50 , speed:5 , pacman:player ,  color:'purple'}),
        new Ghost({x:11*Wall.size + Wall.size / 2 , y: 9*Wall.size + Wall.size /2, radius:10,targetRadius:100 , speed:Pacman.baseSpeed / 2 , pacman:player ,color:'red'}),
        new Ghost({x:11*Wall.size + Wall.size / 2 , y: 11*Wall.size + Wall.size /2, radius:10,targetRadius:100 , speed:Pacman.baseSpeed / 2 , pacman:player, color:'green'}),
    ]
    clearInterval(loop)
    loop = setInterval(game, 1000/fps)
}