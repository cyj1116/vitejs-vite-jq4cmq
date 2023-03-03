import { Vector } from "../utils/vector"

export class CyjCircle {
  game: any
  x: number
  y: number
  r: number
  vx: number
  vy: number
  cor: number
  mass: number
  gravity: number
  colliding: boolean
  color: string
  constructor(game: any, r: number, vx: number, vy: number, mass = 1, cor = 1) {
    this.game = game
    this.x = 0
    this.y = 0
    this.r = r
    this.vx = vx
    this.vy = vy
    this.cor = cor
    this.mass = mass
    this.gravity = 0.98
    this.colliding = false
    this.color = ""
  }

  isCircleCollided(other: CyjCircle) {
    let squareDistance =
      (this.x - other.x) * (this.x - other.x) +
      (this.y - other.y) * (this.y - other.y)
    let squareRadius = (this.r + other.r) * (this.r + other.r)
    return squareDistance <= squareRadius
  }

  checkCollideWith(other: CyjCircle) {
    if (this.isCircleCollided(other)) {
      this.colliding = true
      other.colliding = true
      this.changeVelocityAndDirection(other)
    }
  }

  changeVelocityAndDirection(other: CyjCircle) {
    // 创建两小球的速度向量
    let velocity1 = new Vector(this.vx, this.vy)
    let velocity2 = new Vector(other.vx, other.vy)
    // 获取连心线方向的向量
    let vNorm = new Vector(this.x - other.x, this.y - other.y)
    // 获取连心线方向的单位向量和切线方向上的单位向量
    let unitVNorm = vNorm.normalize()
    let unitVTan = new Vector(-unitVNorm.y, unitVNorm.x)
    // 使用点乘计算小球速度在两个方向上的投影
    let v1n = velocity1.dot(unitVNorm)
    let v1t = velocity1.dot(unitVTan)

    let v2n = velocity2.dot(unitVNorm)
    let v2t = velocity2.dot(unitVTan)
    // 两小球碰撞后的速度
    let cor = Math.min(this.cor, other.cor)
    let v1nAfter =
      (this.mass * v1n + other.mass * v2n + cor * other.mass * (v2n - v1n)) /
      (this.mass + other.mass)

    let v2nAfter =
      (this.mass * v1n + other.mass * v2n + cor * this.mass * (v1n - v2n)) /
      (this.mass + other.mass)

    if (v1nAfter < v2nAfter) {
      return
    }
    // 给碰撞后的速度加上方向
    let v1VectorNorm = unitVNorm.multiply(v1nAfter)
    let v1VectorTan = unitVTan.multiply(v1t)

    let v2VectorNorm = unitVNorm.multiply(v2nAfter)
    let v2VectorTan = unitVTan.multiply(v2t)
    // 把连心线上的速度向量和切线方向的速度向量相加，获得碰撞后小球的速度向量：
    let velocity1After = v1VectorNorm.add(v1VectorTan)
    let velocity2After = v2VectorNorm.add(v2VectorTan)
    // 把向量中的 x 和 y 分别还原到小球的 vx 和 vy 属性中
    this.vx = velocity1After.x
    this.vy = velocity1After.y

    other.vx = velocity2After.x
    other.vy = velocity2After.y
  }

  draw() {
    let s = this
    s.game.drawCircle(this)
  }

  update() {
    let s = this
    // s.checkEdgeCollision()
    s.color = s.colliding ? "hsl(300, 100%, 70%)" : "hsl(170, 100%, 50%)"
    s.vy += s.gravity
    s.x += s.vx
    s.y += s.vy
  }
}
