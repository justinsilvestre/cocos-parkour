import cc from 'cc';
import HelloWorldScene from './HelloWorldScene'
import res from './resources';

export const resources = Object.keys(res).map((n) => res[n]);

export const Scene = HelloWorldScene;
