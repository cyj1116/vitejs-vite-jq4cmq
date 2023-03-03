import testImg from "./assets/test.png"
import cxk from "./assets/test/cxk.jpg"
import fire from "./assets/test/fire.png"
import { CyGame } from "./cygame/cy_game"
import { SceneTitle } from "./scene/title/scene_title"

export const CyGameMain = () => {
  const images = {
    // flappy bird images
    testImg,
    cxk,
    fire,
  }

  const game = CyGame.instance(images, (g: any) => {
    let s = SceneTitle.new(g)
    g.runWithScene(s)
  })
}
