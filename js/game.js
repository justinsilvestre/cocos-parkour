import cc from 'cc';
import MenuScene from './MenuScene'
import res from './resources';

export const resources = Object.keys(res).map((n) => res[n]);

export const Scene = MenuScene;
