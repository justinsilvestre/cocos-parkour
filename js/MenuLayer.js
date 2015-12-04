import { p, winSize, MenuItemFont } from 'cc';
import { Layer, Sprite, MenuItemSprite, Menu } from './cc-es6';
import res from './resources';

class MenuLayer extends Layer {
	constructor() {
		super();
	}

	init(){
		super.init();

		const centerPos = p(winSize.width / 2, winSize.height / 2);
		var spriteBG = new Sprite(res.helloBG_png);
		spriteBG.setPosition(centerPos);
		this.addChild(spriteBG);

		MenuItemFont.setFontSize(60);

		var menuItemPlay = new MenuItemSprite(
			new Sprite(res.start_n_png),
			new Sprite(res.start_s_png),
			this.onPlay, this);
		var menu = new Menu(menuItemPlay);
		menu.setPosition(centerPos);
		this.addChild(menu);
	}

	onPlay() {
		cc.log("==onplay clicked");
	}
}

export default MenuLayer;