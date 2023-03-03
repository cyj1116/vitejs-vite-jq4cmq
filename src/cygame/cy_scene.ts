export class CyScene {
  game: any
  debugModeEnabled: boolean
  elements: any[]
  constructor(game: any) {
    this.game = game
    this.debugModeEnabled = true
    this.elements = []
  }
  static new(game: any) {
    const i = new this(game)
    return i
  }
  addElement(img: any) {
    img.scene = this
    this.elements.push(img)
  }

  removeElement() {
    for (let i = 0; i < this.elements.length; i++) {
      const e = this.elements[i]
      if (e.alive === false) {
        this.elements.splice(i, 1)
      }
    }
  }

  draw() {
    for (let i = 0; i < this.elements.length; i++) {
      const e = this.elements[i]
      e.draw()
    }
  }
  update() {
    this.debug && this.debug()
    if (this.debugModeEnabled) {
      for (let i = 0; i < this.elements.length; i++) {
        const e = this.elements[i]
        e.debug && e.debug()
      }
    }
    for (let i = 0; i < this.elements.length; i++) {
      const e = this.elements[i]
      e.update()
    }
  }
}
