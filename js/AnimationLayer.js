import { p, spriteFrameCache } from 'cc';
import { Body, momentForBox, BoxShape, v } from 'cp';
import { RUNNER_START_X, GROUND_HEIGHT } from './globals'
import { Layer, PhysicsSprite, SpriteBatchNode, Animation, RepeatForever, Animate } from './cc-es6';
import res from './resources';

class AnimationLayer extends Layer {
	constructor(space) {
		super();

		Object.assign(this, this.defaultProperties(space));

		this.init();

		this._debugNode = new cc.PhysicsDebugNode(this.space);
		this.addChild(this._debugNode, 10);
	}

	defaultProperties(space) {
		return {
			spriteSheet: null,
			runningAction: null,
			sprite: null,
			body: null,
			shape: null,
			space
		};
	}

	init() {
		super.init();

		spriteFrameCache.addSpriteFrames(res.running_plist);
		this.spriteSheet = new SpriteBatchNode(res.running_png);
		this.addChild(this.spriteSheet);

		var animFrames = [];
		for (let i = 0; i < 8; i++) {
			let str = `runner${i}.png`;
			let frame = spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}

		var animation = new Animation(animFrames, 0.1);
		this.runningAction = new RepeatForever(new Animate(animation));

		// create runner through physics engine
		this.sprite = new PhysicsSprite('#runner0.png');
		const contentSize = this.sprite.getContentSize();
		// init body
		this.body = new Body(1, momentForBox(1, contentSize.width, contentSize.height));
		this.body.p = p(RUNNER_START_X, GROUND_HEIGHT + contentSize.height / 2);
		this.body.applyImpulse(v(150, 0), v(0, 0));
		this.space.addBody(this.body);
		// init shape
		this.shape = new BoxShape(this.body, contentSize.width - 14, contentSize.height);
		this.space.addShape(this.shape);

		this.sprite.setBody(this.body);
		this.sprite.runAction(this.runningAction);

		this.spriteSheet.addChild(this.sprite);
	}

	getEyeX() {
		return this.sprite.getPositionX() - RUNNER_START_X;
	}
}

export default AnimationLayer;