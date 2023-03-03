type data = {
  name: string
  x?: number
  y?: number
  w?: number
  h?: number
}
export class CyImage {
  game: any
  texture: any
  x: number
  y: number
  w: number
  h: number
  flipY: boolean
  rotation: number
  constructor(game: any, data: data) {
    this.game = game
    this.texture = game.textureByName(data.name)
    this.x = data.x || 0
    this.y = data.y || 0
    this.w = data.w || this.texture.width
    this.h = data.h || this.texture.height
    this.flipY = false
    this.rotation = 0
  }

  draw() {
    this.game.drawImage(this)
  }
  update() {}
}
