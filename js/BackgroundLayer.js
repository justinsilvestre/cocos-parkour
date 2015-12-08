import { p, winSize, spriteFrameCache } from 'cc';
import { Layer, Sprite, TMXTiledMap, SpriteBatchNode } from './cc-es6';
import res from './resources';
import { ANIMATION } from './tags';
import Coin from './Coin';
import Rock from './Rock';

class BackgroundLayer extends Layer {
	constructor(space) {
		super();
		Object.assign(this, this.defaultProperties(space));

		this.init();
	}

	defaultProperties(space) {
		return {
			map00: null,
			map01: null,
			mapWidth: 0,
			mapIndex: 0,
			space,
			objects: [],
			spriteSheet: null
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

		spriteFrameCache.addSpriteFrames(res.background_plist);
		this.spriteSheet = new SpriteBatchNode(res.background_png);
		this.addChild(this.spriteSheet);

		this.loadObjects(this.map00, 0);
		this.loadObjects(this.map01, 1);

		this.scheduleUpdate();
	}

	loadObjects(map, mapIndex) {
		var coinGroup = map.getObjectGroup('coin');
		var coinArray = coinGroup.getObjects();
		for (let i = 0; i < coinArray.length; i++) {
			let coin = new Coin(this.spriteSheet,
				this.space,
				p(coinArray[i]['x'] + this.mapWidth * mapIndex, coinArray[i]['y']));
			coin.mapIndex = mapIndex;
			this.objects.push(coin);
		}

		var rockGroup = map.getObjectGroup('rock');
		var rockArray = rockGroup.getObjects();
		for (let i = 0; i < rockArray.length; i++) {
			let rock = new Rock(this.spriteSheet,
				this.space,
				rockArray[i]['x'] + this.mapWidth * mapIndex);
			rock.mapIndex = mapIndex;
			this.objects.push(rock);
		}
	}

	checkAndReload(eyeX) {
		var newMapIndex = parseInt(eyeX / this.mapWidth);
		if (this.mapIndex == newMapIndex)
			return false;
		if (0 == newMapIndex % 2) {
			this.map01.setPositionX(this.mapWidth * (newMapIndex + 1));
			this.loadObjects(this.map01, newMapIndex + 1)
		} else {
			this.map00.setPositionX(this.mapWidth * (newMapIndex + 1));
			this.loadObjects(this.map00, newMapIndex + 1);
		}
		this.removeObjects(newMapIndex - 1)
		this.mapIndex = newMapIndex;
		return true;
	}

	update(dt) {
		var animationLayer = this.getParent().getChildByTag(ANIMATION);
		var eyeX = animationLayer.getEyeX();
		this.checkAndReload(eyeX);
	}

	removeObjects(mapIndex) {
		while((function(obj, index) {
			for (let i = 0; i < obj.length; i++) {
				if (obj[i].mapIndex === index) {
					obj[i].removeFromParent();
					obj.splice(i, 1);
					return true;
				}
			}
			return false
		})(this.objects, mapIndex));
	}

	removeObjectByShape(shape) {
		for (let i = 0; i < this.objects.length; i++) {
			if (this.objects[i].getShape() == shape) {
				this.objects[i].removeFromParent();
				this.objects.splice(i, 1);
				break;
			}
		}
	}
}

export default BackgroundLayer;