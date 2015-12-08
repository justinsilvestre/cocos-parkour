import { p } from 'cc';
import { StaticBody, BoxShape } from 'cp';
import { PhysicsSprite } from './cc-es6';
import { GROUND_HEIGHT } from './globals'
import { ROCK } from './tags'

class Rock {
	constructor(spriteSheet, space, posX) {
		var sprite = new PhysicsSprite('#rock.png');
		var body = new StaticBody();
		body.setPos(p(posX, sprite.getContentSize().height / 2 + GROUND_HEIGHT));
		sprite.setBody(body);

		var shape = new BoxShape(body,
			sprite.getContentSize().width,
			sprite.getContentSize().height);
		shape.setCollisionType(ROCK);

		space.addStaticShape(shape);
		spriteSheet.addChild(sprite);

		Object.assign(this, {
			space, sprite, shape,
			map: 0
		});
	}

	removeFromParent() {
		this.space.removeStaticShape(this.shape);
		this.shape = null;
		this.sprite.removeFromParent();
		this.sprite = null;
	}

	getShape() {
		return this.shape()
	}
}

export default Rock;