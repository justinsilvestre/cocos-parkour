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
export const Sequence = e('Sequence')