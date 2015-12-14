import { winSize, p, MenuItemFont, director, color } from 'cc';
import { LayerColor, MenuItemSprite, Sprite, Menu } from './cc-es6';
import res from './resources';
import PlayScene from './PlayScene';

class GameOverLayer extends LayerColor {
  constructor() {
    super();
    this.init();
  }

  init() {
    super.init(color(0, 0, 0, 180));

    const centerPos = p(winSize.width / 2, winSize.height / 2);
    MenuItemFont.setFontSize(30);
    var menuItemRestart = new MenuItemSprite(
      new Sprite(res.restart_n_png),
      new Sprite(res.restart_s_png),
      this.onRestart, this);
    var menu = new Menu(menuItemRestart);
    menu.setPosition(centerPos);
    this.addChild(menu);
  }

  onRestart(sender) {
    director.resume();
    director.runScene(new PlayScene());
  }
}

export default GameOverLayer;