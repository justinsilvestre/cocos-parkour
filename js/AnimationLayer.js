import { p, spriteFrameCache } from 'cc';
import { Layer, Sprite, SpriteBatchNode, Animation, RepeatForever, Animate } from './cc-es6';
import res from './resources';

class AnimationLayer extends Layer {
	constructor() {
		super();

		Object.assign(this, this.defaultProperties());

		this.init();
	}

	defaultProperties() {
		return {
			spriteSheet: null,
			runningAction: null,
			sprite: null
		};
	}

	init() {
		super.init();

		// 1. load spritesheet 
		spriteFrameCache.addSpriteFrames(res.running_plist);
		this.spriteSheet = new SpriteBatchNode(res.running_png);
		this.addChild(this.spriteSheet);

		// 2. create spriteframe array
		var animFrames = [];
		for (let i = 0; i < 8; i++) {
			let str = `runner${i}.png`;
			let frame = spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}

		// 3. create a animation with the spriteframe array along with a period time
		var animation = new Animation(animFrames, 0.1);

		// 4. wrap the animate action with a repeat forever action
		this.runningAction = new RepeatForever(new Animate(animation));

		this.sprite = new Sprite("#runner0.png");
		this.sprite.attr({ x: 80, y: 85 });
		this.sprite.runAction(this.runningAction);
		this.spriteSheet.addChild(this.sprite)
	}
}

export default AnimationLayer;