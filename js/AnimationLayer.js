import { p, spriteFrameCache, eventManager, EventListener, audioEngine } from 'cc';
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
		var nextAction;
		if (this.stat === JUMP_UP && vel.y < 0.1) {
			this.stat = JUMP_DOWN;
			nextAction = this.jumpDownAction;
		} else if (this.stat === JUMP_DOWN && vel.y === 0) {
			this.stat = RUNNING;
			nextAction = this.runningAction;
		}
		if (nextAction) {
			this.sprite.stopAllActions();
			this.sprite.runAction(nextAction)
		}
	}

	initAction() {
		function animationFromFrames(name, frameCount, speed) {
			var frames = [];
			for (let i = 0; i < frameCount; i++) {
				let frame = spriteFrameCache.getSpriteFrame(`${name}${i}.png`);
				frames.push(frame);
			}
			return new Animate(new Animation(frames, speed));
		}

		this.runningAction = new RepeatForever(animationFromFrames('runner', 8, 0.1));
		this.runningAction.retain();

		this.jumpUpAction = animationFromFrames('runnerJumpUp', 4, 0.2);
		this.jumpUpAction.retain();

		this.jumpDownAction = animationFromFrames('runnerJumpDown', 2, 0.3)
		this.jumpDownAction.retain();

		return;
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
		audioEngine.playEffect(res.jump_mp3);
	}

	onExit() {
		this.runningAction.release();
		this.jumpUpAction.release();
		this.jumpDownAction.release();
		super.onExit();
	}
}

export default AnimationLayer;