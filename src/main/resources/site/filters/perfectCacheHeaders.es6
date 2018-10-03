exports.responseFilter = (req, res) => {
	// Only process headers if mode is live
	const cacheKeyHeaders = [];
	Object.keys(res.headers).filter(key => {
		if (key.startsWith('pch-')) {
			cacheKeyHeaders.push(res.headers[key]);
			delete res.headers[key];
		}
	});
	if (cacheKeyHeaders.length) {
		res.headers = {
			"xkey": cacheKeyHeaders.join(",").split(",").join(" ")
		};
	}

	return res;
};
