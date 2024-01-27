class Ghost{
    constructor({x,y,radius,img , targetRadius , speed , pacman , color}){
        this.x = x
        this.y = y
        this.radius = radius
        this.img = img
        this.targetRadius = targetRadius
        this.speed = speed
        this.pacman = pacman
        this.target = null;
        this.chasemode = false
        this.color = color
    }
    draw(){
        context.beginPath()
        context.fillStyle = this.color
        context.arc(this.y, this.x , this.radius , Math.PI*2 , false)
        context.fill()
        context.closePath()

        
        // draw target circle
        context.beginPath()
        context.strokeStyle = 'red'
        context.arc(this.y , this.x , this.targetRadius , Math.PI*2 , false)
        context.stroke()
        context.closePath()
    }
    update(){
        let flag = this.checkRange()
        if(flag){
            this.target = this.pacman
            this.chasemode = true
        }
        else if(this.target == null){
            this.target = this.getRandomCell()
        }
        if(this.chasemode == true && flag == false){
            this.chasemode = false
            this.target = null
        }
        this.move()
        flag = this.checkTargetIsReached()
        if(flag){
            this.target = this.getRandomCell()
        }

        if(allPoints.length == 0){
            alert("bfs path finding algorithm visual implementation")
            allPoints.push("temp")
            location.reload()
        }
    }
    move(){
        if(true){
            // dijkstra path finding
            var from = this.findPositionOnMatrix(this.x , this.y)
            if(this.target == this.pacman) var to = this.findPositionOnMatrix(this.pacman.x,this.pacman.y)
            else to = this.target 

            const path = this.BFSshortestPathFinding(AREA , from , to)
            const nextNode = path[1]

            if(nextNode != undefined){

                const diffx = (nextNode.row * Wall.size + (Wall.size / 2)- this.x)
                const diffy = (nextNode.column * Wall.size + (Wall.size / 2) - this.y) 

                if(from[0] < nextNode.row){
                    this.down(diffy)
                }
                else if(from[0] > nextNode.row){
                    this.up(diffy)
                }
                else if(from[1] < nextNode.column){
                    this.right(diffx)
                }
                else if(from[1] > nextNode.column){
                    this.left(diffx)
                }
            }
            else{
                // restartGame()
            }

        }
    }

    BFSshortestPathFinding(matrix , from , to){
        if(matrix[from[0]][from[1]] == 1 || matrix[to[0]][to[1]] == 1){ 
            return []
        }
        var map = [];
        for(var i = 0 ; i < matrix.length ; i++){
            const row = []
            for(var j = 0; j < matrix[0].length ; j++){
                if(matrix[i][j] == 2){
                    row.push(this.createNode(i,j,Number.MAX_VALUE,null))
                }
                else row.push(null)
            }
            map.push(row)
        }
        var dest = null
        var node = map[from[0]][from[1]]
        node.dist = 0
        var queue = []
        queue.push(node)
        while((node = queue.shift()) != null){
            if(node.row == to[0] && node.column == to[1]){
                dest = node
                break
            }
            this.visitNode(node.row + 1 , node.column , node , queue , map)
            this.visitNode(node.row - 1 , node.column , node , queue, map)
            this.visitNode(node.row , node.column +1 , node , queue, map)
            this.visitNode(node.row , node.column -1, node , queue, map)
        }
        if(dest != null){
            const path = []
            var node = dest
            while(node != null){
                path.unshift(node)
                node = node.prev
            }

            return path
        }
        else{
   
            return []
        }
    }
    createNode(row , column , dist , prev){
        return {row,column,dist,prev}
    }
    visitNode(row,column,parent ,queue,map){
        if(row < 0 || row >= map.length || column < 0 || column >= map[0].length || map[row][column] == null) return
        const node = map[row][column]
        if(parent.dist + 1 < node.dist){
            node.prev = parent
            node.dist = parent.dist + 1
            queue.push(node)
        }

    }
    findPositionOnMatrix(x,y){
        const i = Math.floor(x / Wall.size)
        const j = Math.floor(y / Wall.size)
        return [i,j]
    }
    up(diff){
        if(diff >0){
            this.right(0)
            return
        }
        else if(diff < 0){
            this.left(0)
            return
        }
        this.x -= this.speed
    }
    down(diff){
        if(diff >0){
            this.right(0)
            return
        }
        else if(diff < 0){
            this.left(0)
            return
        }
        else this.x += this.speed
    }
    left(diff){
        if(diff > 0){
            this.down(0)
            return
        }
        else if(diff <0){
            this.up(0)
            return
        }else this.y -= this.speed
    }
    right(diff){
        if(diff > 0){
            this.down(0)
            return
        }
        else if(diff <0){
            this.up(0)
            return
        }else this.y += this.speed
    }
    checkRange(){
        const diff = Math.hypot(this.x - this.pacman.x , this.y - this.pacman.y)
        const flag = (diff <= this.targetRadius + this.pacman.radius)
        return flag
    }
    getRandomCell(){
        const i = Math.floor(Math.random()*AREA.length)
        const j = Math.floor(Math.random()*AREA[0].length)
        if(AREA[i][j] != 2){
            return this.getRandomCell()
        }
        else return[i,j]
    }
    checkTargetIsReached(){
        const row_col = this.findPositionOnMatrix(this.x,this.y)
        if(row_col[0] == this.target[0] && row_col[1] == this.target[1]) return true
        return false
    }

}