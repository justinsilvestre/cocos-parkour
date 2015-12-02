const dir = 'res';

const filenames = [
	'HelloWorld.png'
];

const resources = filenames.reduce((collection, filename) => {
	return Object.assign({}, collection, { [ filename.replace(/\W/g,'_') ] : dir + '/' + filename });
}, {});

export default resources;