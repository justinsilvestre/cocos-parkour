import { Scene } from './cc-es6';
import BackgroundLayer from './BackgroundLayer';
import AnimationLayer from './AnimationLayer';
import StatusLayer from './StatusLayer';

class PlayScene extends Scene {
	onEnter() {
		super.onEnter();

		this.addChild(new BackgroundLayer());
		this.addChild(new AnimationLayer());
		this.addChild(new StatusLayer());
	}
}

export default PlayScene;