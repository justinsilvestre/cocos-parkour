import { p } from 'cc';
import { Layer, Sprite, MoveTo, Sequence } from './cc-es6';
import res from './resources';

class AnimationLayer extends Layer {
	constructor() {
		super();
		this.init();
	}

	init() {
		super.init();

		var spriteRunner = new Sprite(res.runner_png);
		spriteRunner.attr({ x: 80, y: 85 });

		var actionTo = new MoveTo(2, p(300, 85));
		spriteRunner.runAction(new Sequence(actionTo));
		this.addChild(spriteRunner);
	}
}

export default AnimationLayer;