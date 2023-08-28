const watch = require('node-watch');
const spawn = require('cross-spawn');
const cpy = require('cpy');

watch('src/', { recursive: true, filter: /\.scss/ }, () => {
	spawn('yarn', ['sass']);
});

watch('src/index.html', {}, () => {
	(async () => {
		await cpy(['src/index.html'], 'out/src');
	})();
});
