import { CyjParticle, CyjParticleSystem } from "../../childrens/cyj_particle"
import { CyScene } from "../../cygame/cy_scene"
import { CyImage } from "../../cygame/cy_image"
import { Scene } from "../../scene/title/scene"
export class SceneTitle extends CyScene {
  constructor(game: any) {
    super(game)
    this.setupActions()
    this.setup()
  }

  setup() {
    const s = this
    let i = new CyImage(s.game, { name: "cxk", w: 130, h: 130 })
    i.x = 0
    i.y = 0
    this.addElement(i)
  }

  setupActions() {
    this.game.registerAction("t", () => {
      let s = new Scene(this.game)
      this.game.replaceScene(s)
    })
    this.game.registerAction("f", () => {
      let ps = new CyjParticleSystem(this.game, 100, 200)
      this.addElement(ps)
      console.log(ps, "ps")
    })
  }

  debug() {}

  update() {
    super.update()
  }
}
