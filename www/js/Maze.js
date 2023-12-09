/*
 *  
 *  Assignment: NonWimp 2 Fall 2023
 *  Name: Stephanie Kim and Hameedah Lawal 
 *  Email: stephanie.kim640944@tufts.edu and hameedah.lawal@tufts.edu
 *  Maze class to be used by Model.js
 * 
 */

class Maze {
        constructor(mazeId, width, height, ctx, path) {
                this.mazeId = mazeId
                this.width = width
                this.height = height
                this.mazeImg = document.getElementById('maze');
                this.mazePath = path
                this.ctx = ctx
        }

        async drawMaze() {
                this.mazeImg.src = this.mazePath + "maze" + this.mazeId + ".png";
                this.ctx.drawImage(this.mazeImg, 0, 0, this.width, this.height);
        }
}