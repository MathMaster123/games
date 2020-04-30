var canvas = document.getElementById('gameScreen');
var ctx = canvas.getContext('2d');
var RightArrow = 39, LeftArrow = 37;
keystate = {};

player = {
    batvel: 5,
    width: 100,
    height: 20,
    x: 400,
    y: 750,
    ballx: 200,
    bally: 200,
    ballvel: 5,

    drawbat: function () {
        ctx.fillRect(this.x, this.y, this.width, this.height)
    },
    getkey: function () {
        document.addEventListener('keydown', function (evt) {
            keystate[evt.keyCode] = true
        });
        document.addEventListener('keyup', function (evt) {
            delete keystate[evt.keyCode]
        });
    },
    batmove: function () {
        if (keystate[RightArrow]) {
            this.x += this.batvel
        }
        if (keystate[LeftArrow]) {
            this.x -= this.batvel
        }
    },
};
ball = {
    ballx: 200,
    bally: 200,
    ballvel: [5, -5],
    draw: function () {
        ctx.beginPath();
        ctx.fillStyle = 'red'
        ctx.arc(this.ballx, this.bally, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'black';
    },
    batbounce: function () {
        if (this.bally == player.y && 0 <= this.ballx - player.x && 100 >= this.ballx - player.x) {
            if (25 >= this.ballx - player.x) {
                if (this.ballvel[1] < 0) {
                    this.ballvel = [5, 4]
                }
                else if (this.ballvel[1] > 0) {
                    this.ballvel = [5, -4]
                }
                console.log(this.ballvel)
            }
            else if (75 <= this.ballx - player.x) {
                if (this.ballvel[1] < 0) {
                    this.ballvel = [-5, 4]
                }
                else if (this.ballvel[1] > 0) {
                    this.ballvel = [-5, -4]
                }
                console.log(this.ballvel)
            }
            else {
                this.ballvel[1] *= -1
            }
            this.ballvel[0] *= -1

        }
    },
    wallbounce: function () {
        if (this.ballx >= 600 || this.ballx <= 0) {
            this.ballvel[0] *= -1
        }
        if (this.bally >= 800 || this.bally <= 0) {
            this.ballvel[1] *= -1
        }
    },
    move: function () {
        this.wallbounce()
        this.batbounce()
        this.ballx += this.ballvel[0]
        this.bally += this.ballvel[1]
    },
    update: function () {
        this.move()
        this.draw()
    }
};
block = {
    draw: function () {
        ctx.fillRect(200, 200, 25, 25)
    }
}
function main() {
    ctx.clearRect(0, 0, 600, 800);
    player.getkey();
    player.batmove();
    ball.move();
    ball.draw();
    player.drawbat();
    block.draw()
    requestAnimationFrame(main);
};
requestAnimationFrame(main)
