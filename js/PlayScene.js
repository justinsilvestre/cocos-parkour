import { p } from 'cc';
import { Space, v, SegmentShape } from 'cp';
import { Scene, Layer } from './cc-es6';
import { GROUND_HEIGHT } from './globals'
import BackgroundLayer from './BackgroundLayer';
import AnimationLayer from './AnimationLayer';
import StatusLayer from './StatusLayer';
import { BACKGROUND, ANIMATION, STATUS } from './tags';

class PlayScene extends Scene {
	constructor() {
		super();

		this.space = null;
	}

	onEnter() {
		super.onEnter();

		this.initPhysics();

		this.gameLayer = new Layer();
		this.gameLayer.addChild(new BackgroundLayer(), 0, BACKGROUND);
		this.gameLayer.addChild(new AnimationLayer(this.space), 0, ANIMATION);
		this.addChild(this.gameLayer);
		this.addChild(new StatusLayer(), 0, STATUS);

		this.scheduleUpdate();
	}

	initPhysics() {
		this.space = new Space();
		this.space.gravity = v(0, -350);
		var wallBottom = new SegmentShape(this.space.staticBody,
			v(0, GROUND_HEIGHT), // start point
			v(4294967295, GROUND_HEIGHT), // MAX INT:4294967295
			0); // thickness of wall
		this.space.addStaticShape(wallBottom);
	}

	update(dt) {
		this.space.step(dt);

		var animationLayer = this.gameLayer.getChildByTag(ANIMATION);
		var eyeX = animationLayer.getEyeX();

		this.gameLayer.setPosition(p(-eyeX, 0))
	}
}

export default PlayScene;