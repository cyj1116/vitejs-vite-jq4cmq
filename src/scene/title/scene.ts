import { CyScene } from "../../cygame/cy_scene"
import { CyjCircle } from "../../childrens/cyj_circle"
import { randomBetween, randomZF } from "../../utils/utils"
export class Scene extends CyScene {
  circles: any[]
  constructor(game: any) {
    super(game)
    this.circles = []
    this.setup()
    this.setupBackground()
    this.setupBalls()
    console.log(this.circles, "1")
  }
  addCircle(circle: any) {
    circle.scene = this
    this.circles.push(circle)
  }
  setup() {}
  // bg
  setupBackground() {}
  setupBalls() {
    let s = this
    for (let index = 0; index < 6; index++) {
      let a = new CyjCircle(
        s.game,
        randomBetween(1, 60),
        randomZF(),
        randomZF(),
        40,
        0.7
      )
      a.x = randomBetween(0, 700)
      a.y = randomBetween(0, 300)
      this.addCircle(a)
    }
  }

  checkCollision() {
    // 重置碰撞状态
    for (const circle of this.circles) {
      circle.colliding = false
    }

    for (let i = 0; i < this.circles.length; i++) {
      for (let j = i + 1; j < this.circles.length; j++) {
        this.circles[i].checkCollideWith(this.circles[j])
      }
    }
  }

  checkEdgeCollision() {
    let s = this
    let width = s.game.canvas.width
    let height = s.game.canvas.height
    for (let circle of this.circles) {
      // 左右墙壁碰撞
      if (circle.x < circle.r) {
        circle.vx = -circle.vx * circle.cor
        circle.x = circle.r
      } else if (circle.x > width - circle.r) {
        circle.vx = -circle.vx * circle.cor
        circle.x = width - circle.r
      }

      // 上下墙壁碰撞
      if (circle.y < circle.r) {
        circle.vy = -circle.vy * circle.cor
        circle.y = circle.r
      } else if (circle.y > height - circle.r) {
        circle.vy = -circle.vy * circle.cor
        circle.y = height - circle.r
      }
    }
  }

  debug() {
    // this.birdSpeed = config.bird_speed.value;
  }
  draw() {
    super.draw()
    for (let i = 0; i < this.circles.length; i++) {
      const e = this.circles[i]
      e.draw()
    }
  }
  update() {
    super.update()
    for (let i = 0; i < this.circles.length; i++) {
      const e = this.circles[i]
      e.update()
    }
    this.checkCollision()
    this.checkEdgeCollision()
  }
}
