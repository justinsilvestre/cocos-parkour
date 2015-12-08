const dir = 'res';

const filenames = [
	'helloBG.png',
	'start_n.png',
	'start_s.png',
	'PlayBG.png',
	'running.png',
	'running.plist',
	'map.png',
	'map00.tmx',
	'map01.tmx',
	'background.png',
	'background.plist'
];

const resources = filenames.reduce((collection, filename) => {
	return Object.assign({}, collection, { [ filename.replace(/\W/g,'_') ] : dir + '/' + filename });
}, {});

export default resources;