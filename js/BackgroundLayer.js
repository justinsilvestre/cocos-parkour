import { p, winSize } from 'cc';
import { Layer, Sprite } from './cc-es6';
import res from './resources';

class BackgroundLayer extends Layer {
	constructor() {
		super();
		this.init();
	}

	init() {
		super.init();

		const centerPos = p(winSize.width / 2, winSize.height / 2);
		var SpriteBG = new Sprite(res.PlayBG_png);
		SpriteBG.setPosition(centerPos);
		this.addChild(SpriteBG);
	}
}

export default BackgroundLayer;