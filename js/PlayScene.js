import { p, director, audioEngine, log } from 'cc';
import { Space, v, SegmentShape } from 'cp';
import { Scene, Layer } from './cc-es6';
import { GROUND_HEIGHT } from './globals'
import BackgroundLayer from './BackgroundLayer';
import AnimationLayer from './AnimationLayer';
import StatusLayer from './StatusLayer';
import GameOverLayer from './GameOverLayer';
import { BACKGROUND, ANIMATION, STATUS, RUNNER, COIN, ROCK } from './tags';
import res from './resources';

class PlayScene extends Scene {
	constructor() {
		super();

		this.space = null;
		this.shapesToRemove = [];
	}

	onEnter() {
		super.onEnter();

		this.initPhysics();

		this.gameLayer = new Layer();
		this.gameLayer.addChild(new BackgroundLayer(this.space), 0, BACKGROUND);
		this.gameLayer.addChild(new AnimationLayer(this.space), 0, ANIMATION);
		this.addChild(this.gameLayer);
		this.addChild(new StatusLayer(), 0, STATUS);

		audioEngine.playMusic(res.background_mp3, true);

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

		this.space.addCollisionHandler(RUNNER, COIN,
			this.collisionCoinBegin.bind(this), null, null, null);
		this.space.addCollisionHandler(RUNNER, ROCK,
			this.collisionRockBegin.bind(this), null, null, null);

	}

	update(dt) {
		this.space.step(dt);

		var animationLayer = this.gameLayer.getChildByTag(ANIMATION);
		var eyeX = animationLayer.getEyeX();

		this.gameLayer.setPosition(p(-eyeX, 0));

		for (let i = 0; i < this.shapesToRemove.length; i++) {
			let shape = this.shapesToRemove[i];
			this.gameLayer.getChildByTag(BACKGROUND).removeObjectByShape(shape);
		}
		this.shapesToRemove = [];
	}

	collisionCoinBegin(arbiter, space) {
				log("==coin");

		audioEngine.playEffect(res.pickup_coin_mp3)

		var statusLayer = this.getChildByTag(STATUS);
		statusLayer.addCoin(1);

		var shapes = arbiter.getShapes();
		// shapes[0] is runner
		this.shapesToRemove.push(shapes[1]);
	}

	collisionRockBegin(arbiter, space) {
		log("==game over");
		this.addChild(new GameOverLayer());
		director.pause();
		audioEngine.stopMusic();
	}
}

export default PlayScene;