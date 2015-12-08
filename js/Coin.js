import { spriteFrameCache } from 'cc';
import { StaticBody, CircleShape, vzero } from 'cp';
import { Animation, RepeatForever, Animate, PhysicsSprite } from './cc-es6';
import { COIN } from './tags';

class Coin {
	constructor(spriteSheet, space, pos) {
		var animFrames = [];
		for (let i = 0; i < 8; i++) {
			let str  = `coin${i}.png`;
			let frame = spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}
		var animation = new Animation(animFrames, 0.2);
		var action = new RepeatForever(new Animate(animation));

		var sprite = new PhysicsSprite('#coin0.png');
		var radius = 0.95 * sprite.getContentSize().width / 2;
		var body = new StaticBody();
		body.setPos(pos);
		sprite.setBody(body);

		var shape = new CircleShape(body, radius, vzero);
		shape.setCollisionType(COIN);
		// Sensors only call collision callbacks, and never generate real collisions
		shape.setSensor(true);

		space.addStaticShape(shape);

		sprite.runAction(action);
		spriteSheet.addChild(sprite, 1);

		Object.assign(this, {
			space, sprite, shape,
			mapIndex: 0
		});
	}

	removeFromParent() {
		this.space.removeStaticShape(this.shape);
		this.shape = null;
		this.sprite.removeFromParent();
		this.sprite = null;
	}

	getShape() {
		return this.shape;
	}
}

export default Coin;