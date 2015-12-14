import cc from 'cc';

function e(className) {
	return cc[className].extend({});
}

const classNames = [
  'Scene',
  'Layer',
  'Sprite',
  'MenuItemSprite',
  'Menu',
  'MoveTo',
  'Sequence',
  'SpriteBatchNode',
  'Animation',
  'RepeatForever',
  'Animate',
  'PhysicsSprite',
  'TMXTiledMap',
  'LabelTTF',
  'LayerColor'
];

const extended = classNames.reduce(
  (obj, className) => Object.assign(obj, { [ className ]: e(className) }),
  {});

module.exports = extended;