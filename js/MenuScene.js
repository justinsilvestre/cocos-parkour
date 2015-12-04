import { Scene } from './cc-es6';
import MenuLayer from './MenuLayer';

class MenuScene extends Scene {
	constructor() {
		super();
	}

	onEnter() {
		super.onEnter();

		var layer = new MenuLayer();
		layer.init();
		this.addChild(layer);
	}
}

export default MenuScene;