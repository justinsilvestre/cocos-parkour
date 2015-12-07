import { p, winSize } from 'cc';
import { Layer, Sprite, TMXTiledMap } from './cc-es6';
import res from './resources';
import { ANIMATION } from './tags';

class BackgroundLayer extends Layer {
	constructor() {
		super();
		Object.assign(this, this.defaultProperties());

		this.init();
	}

	defaultProperties() {
		return {
			map00: null,
			map01: null,
			mapWidth: 0,
			mapIndex: 0
		};
	}

	init() {
		super.init();

		this.map00 = new TMXTiledMap(res.map00_tmx);
		this.addChild(this.map00);
		this.mapWidth = this.map00.getContentSize().width;
		this.map01 = new TMXTiledMap(res.map01_tmx);
		this.map01.setPosition(p(this.mapWidth, 0));
		this.addChild(this.map01);

		this.scheduleUpdate();
	}

	checkAndReload(eyeX) {
		var newMapIndex = parseInt(eyeX / this.mapWidth);
		if (this.mapIndex == newMapIndex)
			return false;
		if (0 == newMapIndex % 2) {
			this.map01.setPositionX(this.mapWidth * (newMapIndex + 1));
		} else {
			this.map00.setPositionX(this.mapWidth * (newMapIndex + 1));
		}
		this.mapIndex = newMapIndex;
		return true;
	}

	update(dt) {
		var animationLayer = this.getParent().getChildByTag(ANIMATION);
		var eyeX = animationLayer.getEyeX();
		this.checkAndReload(eyeX);
	}
}

export default BackgroundLayer;