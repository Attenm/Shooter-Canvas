import canvas from './canvas.js';
import Projectile from './projectile.js';

class Player {
    constructor(){
        this.image = null;
        this.left = null;
        this.top = null;
        this.angleInRadians = null;
        this.speed = 10;
        this.positionInterval = 20;
        this.isMoving = false;
        this.centerLeft = null;
        this.centerTop = null;
        this.playerSize = 90;
        this.rifleX = null;
        this.rifleY = null;
    }

    setPosition(){
        this.left = window.innerWidth / 2 - this.image.width / 2;
        this.top = window.innerHeight / 2 - this.image.height / 2; 
    }

    setCenterPos(){
        this.centerLeft = this.left + this.image.width / 2;
        this.centerTop = this.top + this.image.height / 2;
    }

    setRiflePos(){
        this.rifleX = this.centerLeft;
        this.rifleY = this.centerTop;
    }

    createImage(){
        this.image = document.createElement('img');
        this.image.setAttribute('src', 'assets/player.png');
        this.setPosition();
        this.setCenterPos();
        this.setRiflePos();
    }

    render(ctx){
        ctx.save();
        ctx.translate(this.centerLeft, this.centerTop)
        ctx.rotate(this.angleInRadians);
        ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2, this.image.width, this.image.height);
        ctx.restore();
    }

    moveWithAnimation(action){
        this.isMoving = true;

        const animate = () => {
            action();
            this.setCenterPos();
            this.setRiflePos();
            if(!this.isMoving){
                return
            }
            requestAnimationFrame(animate);
        }
        animate();
    }
    
    changePosition(e){

        if(this.isMoving){
            return;
        }
    
        switch (e.key) {
            case 'w':
            case 'ArrowUp':
                this.moveWithAnimation(()=>{
                    const isTouchingTopWall = this.centerTop - this.playerSize <= 0;
                    !isTouchingTopWall && (this.top -= this.speed);
                });
                break;  
            case 's':
            case 'ArrowDown':
                this.moveWithAnimation(()=>{
                    const isTouchingBottomWall = (this.centerTop + this.playerSize) >= window.innerHeight;
                    !isTouchingBottomWall && (this.top += this.speed);
                });
                break;
            case 'a':
            case 'ArrowLeft':
                this.moveWithAnimation(()=>{
                    const isTouchingLeftWall = this.centerLeft - this.playerSize <= 0;
                    !isTouchingLeftWall && (this.left -= this.speed);
                });
                break;
            case 'd':
            case 'ArrowRight':
                this.moveWithAnimation(()=>{
                    const isTouchingRightWall = (this.centerLeft + this.playerSize) >= window.innerWidth;
                    !isTouchingRightWall && (this.left += this.speed);
                });
                break;
        }
    }

    shoot(){
        canvas.projectiles.push(new Projectile(this.centerLeft, this.centerTop, this.angleInRadians));
    }

    handleKeyUp(){
        document.addEventListener('keyup', ()=>{this.isMoving = false})
    }

    handleKeyDown(){
        document.addEventListener('keydown', this.changePosition.bind(this));
    }

    handleMouseClick(){
        document.addEventListener('click', this.shoot.bind(this));
    }

    rotate(mouseX, mouseY){
        const deltaX = this.centerLeft - mouseX;
        const deltaY = this.centerTop - mouseY;
        this.angleInRadians = Math.atan2(deltaY, deltaX);
    }

    handleMouseMove(){
        canvas.getElem()
            .addEventListener('mousemove', (e)=>this.rotate(e.offsetX, e.offsetY))
    }

    init(){
        this.createImage();
    }
}

export default Player;