exports.responseFilter = (req, res) => {
	// Only process headers if mode is live
	var cacheKeyHeaders = [];
	Object.keys(res.headers).filter(key => {
		if (key.startsWith('pch-')) {
			cacheKeyHeaders.push(res.headers[key]);
			delete res.headers[key];
		}
	});

	if (cacheKeyHeaders.length) {
        cacheKeyHeaders = cacheKeyHeaders.filter((x, i, a) => a.indexOf(x) === i)
		res.headers.xkey = cacheKeyHeaders.join(",").split(",").join(" ");
	}

	return res;
};
