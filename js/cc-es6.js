import cc from 'cc';

function e(className) {
	return cc[className].extend({});
}

export const Scene = e('Scene');
export const Layer = e('Layer');
export const Sprite = e('Sprite');
export const MenuItemSprite = e('MenuItemSprite');
export const Menu = e('Menu');
export const MoveTo = e('MoveTo');
export const Sequence = e('Sequence');
export const SpriteBatchNode = e('SpriteBatchNode');
export const Animation = e('Animation');
export const RepeatForever = e('RepeatForever');
export const Animate = e('Animate');
