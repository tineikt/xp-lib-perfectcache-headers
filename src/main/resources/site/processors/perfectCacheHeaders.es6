exports.responseProcessor = (req, res) => {
	// Only process headers if mode is live
	const cacheKeyHeaders = [];
	Object.keys(res.headers).filter(key => {
		if (key.startsWith('pch-')) {
			cacheKeyHeaders.push(res.headers[key]);
			delete res.headers[key];
		}
	});

	if (cacheKeyHeaders.length) {
        const uniqueCacheKeyHeaders = cacheKeyHeaders.filter((x, i, a) => a.indexOf(x) === i);
		res.headers.xkey = uniqueCacheKeyHeaders.join(",").split(",").join(" ");
	}

	return res;
};
