class Pacman{
    static baseSpeed = 5
    static score = 0
    constructor({x,y,radius}){
        this.x = x
        this.y = y
        this.radius = radius
        this.speed = {x:0,y:0}
        this.nextDirection = null
        this.color = 'yellow'

    }
    draw(){
        context.beginPath()
        context.fillStyle = this.color
        context.arc(this.y,this.x , this.radius , Math.PI *2 , false)
        context.fill()
    }
    changeDirectionIfPossible(key){
        if(key ==undefined) return
        const sx = this.speed.x
        const sy = this.speed.y
        this.speed.x = 0 , this.speed.y = 0
        if(key == "ArrowUp") this.speed.x = -Pacman.baseSpeed 
        else if(key == "ArrowDown") this.speed.x = Pacman.baseSpeed 
        else if(key == "ArrowLeft") this.speed.y = -Pacman.baseSpeed 
        else if(key == "ArrowRight") this.speed.y = Pacman.baseSpeed 
        
        // check collision
        const flag = this.checkWall()
        if(flag){
            // collison occured
            this.nextDirection = key
            this.speed.x = sx
            this.speed.y = sy
            return false
        }
        return true

    }
    update(){
        this.changeDirectionIfPossible()
        this.nextDirectionIfPossible()
        this.move()
        this.eat()
        this.teleport()

        if(this.checkGhost()){
            restartGame()
        }
    }
    move(){

        const flag = this.checkWall()
        if(flag){
            this.speed.x = 0
            this.speed.y =0
        }
        else{
            this.x += this.speed.x
            this.y += this.speed.y   
        }
    }
    // collision detection
    checkWall(){
        var flag;
        this.x += this.speed.x
        this.y += this.speed.y
        for(var wall of allWalls){
            flag = (
                this.x + this.radius >= wall.x && // check left
                this.x - this.radius <= wall.x + Wall.size &&  // check right
                this.y + this.radius >= wall.y  && // check top
                this.y -this.radius <= wall.y + Wall.size
            )
            if(flag) break
        }
        this.x -= this.speed.x
        this.y -= this.speed.y
        return flag
    }
    
    nextDirectionIfPossible(){
        const flag = this.changeDirectionIfPossible(this.nextDirection)
        if(flag) this.nextDirection = null
    }

    eat(){
        for(var i = allPoints.length -1 ; i >= 0 ; i--){
            const point = allPoints[i]
            const diff = Math.abs( Math.hypot(point.x - this.x , point.y - this.y))
            if(diff <= this.radius + point.radius){
                allPoints.splice(i,1)                
                Pacman.score += 10
                const element = document.getElementById("yoursocre")
                element.innerHTML = Pacman.score
            }
        }
    }
    teleport(){
        if(this.y < 0){
            this.y = Wall.size * AREA[0].length
        }
        else if(this.y > Wall.size * AREA[0].length){
            this.y = 0
        }
    }
    checkGhost(){
        for(var ghost of allGhosts){
            const diff = Math.hypot(ghost.x - this.x , ghost.y - this.y)
            if(diff <= this.radius + ghost.radius){
                return true
            }
        }
        return false
    }
}