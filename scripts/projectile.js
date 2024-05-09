import canvas from "./canvas.js";

export default class Projectile {
    constructor(left, top, angleInRadians) {
        this.angleInRadians = angleInRadians;
        this.projectileOffsetX = -110;
        this.projectileOffsetY = -35;
        this.left = left;
        this.top = top;
        this.speed = -10;
        this.dirX = 0;
        this.dirY = 0;
    }

    update(){
        this.dirX = this.speed * Math.cos(this.angleInRadians);
        this.dirY = this.speed * Math.sin(this.angleInRadians);

        this.left += this.dirX;
        this.top +=  this.dirY;
    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.left, this.top);
        ctx.rotate(this.angleInRadians);
        ctx.translate(this.projectileOffsetX, this.projectileOffsetY);
        canvas.ctx.fillStyle = 'red';        
        canvas.ctx.fillRect(0, 0, 10, 10);
        ctx.restore();
    }
}