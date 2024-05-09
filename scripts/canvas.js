class Canvas {
    constructor() {
        this.elem = null;
        this.ctx = null;
        this.projectiles = [];
    }

    createCanvas() {
        this.elem = document.createElement('canvas');
        this.ctx = this.elem.getContext('2d');
    }

    updateProjectiles() {
        this.projectiles.forEach(projectile => {
            projectile.update();
            projectile.draw(this.ctx);
        })
    }

    getElem() {
        return this.elem;
    }

    handleWindowResize() {
        window.addEventListener('resize', this.resizeCanvas.bind(this));
    }
    
    resizeCanvas() {
        this.elem.width = window.innerWidth;
        this.elem.height = window.innerHeight;
    }

    drawImage(img, left=100, top=100) {
        this.ctx.drawImage(img, left, top);
    }

    clearRect(){
        this.ctx.clearRect(0, 0, this.elem.width, this.elem.height);
    }

    init() {
        this.createCanvas();
        this.elem.backgroundColor = 'lightgray';
        this.resizeCanvas();
        this.handleWindowResize();
    }
}

const canvas = new Canvas();
export default canvas;