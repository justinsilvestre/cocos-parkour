import { winSize , color, p } from 'cc';
import { Layer, LabelTTF } from './cc-es6';

class StatusLayer extends Layer {
	constructor() {
		super();

		Object.assign(this, {
			labelCoin: null,
			labelMeter: null,
			coins: 0
		});

		this.init();
	}

	init() {
		super.init();

		this.labelCoin = new LabelTTF('Coins:0', 'Helvetica', 20);
		this.labelCoin.setColor(color(0,0,0));
		this.labelCoin.setPosition(p(70, winSize.height - 20));
		this.addChild(this.labelCoin);

		this.labelMeter = new LabelTTF('0M', 'Helvetica', 20);
		this.labelMeter.setPosition(p(winSize.width - 70, winSize.height - 20));
		this.addChild(this.labelMeter);
	}

	updateMeter(px) {
		this.labelMeter.setString(`${parseInt(px / 10)} M`);
	}

	addCoin(num) {
		this.coins += num;
		this.labelCoin.setString(`Coins: ${this.coins}`);
	}
}

export default StatusLayer;