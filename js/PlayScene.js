import { Space, v, SegmentShape } from 'cp';
import { Scene } from './cc-es6';
import { GROUND_HEIGHT } from './globals'
import BackgroundLayer from './BackgroundLayer';
import AnimationLayer from './AnimationLayer';
import StatusLayer from './StatusLayer';

class PlayScene extends Scene {
	constructor() {
		super();

		this.space = null;
	}

	onEnter() {
		super.onEnter();

		this.initPhysics();

		this.addChild(new BackgroundLayer());
		this.addChild(new AnimationLayer(this.space));
		this.addChild(new StatusLayer());

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
	}
}

export default PlayScene;