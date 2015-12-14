import { p, spriteFrameCache, eventManager, EventListener } from 'cc';
import { Body, momentForBox, BoxShape, v } from 'cp';
import { RUNNER_START_X, GROUND_HEIGHT } from './globals'
import { Layer, PhysicsSprite, SpriteBatchNode, Animation, RepeatForever, Animate } from './cc-es6';
import res from './resources';
import { STATUS } from './tags';
import SimpleRecognizer from './SimpleRecognizer';

const RUNNING = 0;
const JUMP_UP = 1;
const JUMP_DOWN = 2;

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
			space,
			jumpUpAction: null,
			jumpDownAction: null,
			recognizer: null,
			stat: RUNNING
		};
	}

	init() {
		super.init();

		spriteFrameCache.addSpriteFrames(res.running_plist);
		this.spriteSheet = new SpriteBatchNode(res.running_png);
		this.addChild(this.spriteSheet);

		this.initAction();

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

		this.scheduleUpdate();

		eventManager.addListener({
			event: EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: this.onTouchBegan,
			onTouchMoved: this.onTouchMoved,
			onTouchEnded: this.onTouchEnded
		}, this);

		this.recognizer = new SimpleRecognizer();
	}

	getEyeX() {
		return this.sprite.getPositionX() - RUNNER_START_X;
	}

	update(dt) {
		var statusLayer = this.getParent().getParent().getChildByTag(STATUS)
		statusLayer.updateMeter(this.sprite.getPositionX() - RUNNER_START_X);

		var vel = this.body.getVel();
		if (this.stat === JUMP_UP) {
			if (vel.y < 0.1) {
				this.stat = JUMP_DOWN;
				this.sprite.stopAllActions();
				this.sprite.runAction(this.jumpDownAction);
			}
		} else if (this.stat === JUMP_DOWN) {
			if (vel.y === 0) {
				this.stat = RUNNING;
				this.sprite.stopAllActions();
				this.sprite.runAction(this.runningAction);
			}
		}
	}

	initAction() {
		var animFrames = [];
		for (let i = 0; i < 8; i++) {
			let str = `runner${i}.png`;
			let frame = spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}

		var animation = new Animation(animFrames, 0.1);
		this.runningAction = new RepeatForever(new Animate(animation));
		this.runningAction.retain();

		animFrames = [];
		for (let i = 0; i < 4; i++) {
			let str = `runnerJumpUp${i}.png`;
			let frame = spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}

		animation = new Animation(animFrames, 0.2);
		this.jumpUpAction = new Animate(animation);
		this.jumpUpAction.retain();

		animFrames = [];
		for (let i = 0; i < 2; i++) {
			let str = `runnerJumpDown${i}.png`;
			let frame = spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}

		animation = new Animation(animFrames, 0.3);
		this.jumpDownAction = new Animate(animation);
		this.jumpDownAction.retain();
	}

	onTouchBegan(touch, event) {
		const pos = touch.getLocation();
		event.getCurrentTarget().recognizer.beginPoint(pos.x, pos.y);
		return true;
	}

	onTouchMoved(touch, event) {
		const pos = touch.getLocation();
		event.getCurrentTarget().recognizer.movePoint(pos.x, pos.y);
	}

	onTouchEnded(touch, event) {
		const rtn = event.getCurrentTarget().recognizer.endPoint();
		cc.log(`rtn = ${rtn}`);
		switch (rtn) {
		case 'UP':
			event.getCurrentTarget().jump();
			break;
		default:
			break;
		}
	}

	jump() {
		cc.log('jump');
		if (this.stat === RUNNING) {
			this.body.applyImpulse(v(0, 250), v(0,0))
		}
	}

	onExit() {
		this.runningAction.release();
		this.jumpUpAction.release();
		this.jumpDownAction.release();
		super.onExit();
	}
}

export default AnimationLayer;