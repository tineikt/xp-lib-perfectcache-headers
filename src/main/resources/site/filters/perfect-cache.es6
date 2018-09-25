exports.responseFilter = (req, res) => {
	// Only process headers if mode is live
	// if (req.mode === 'live') {
	// log.info(JSON.stringify(req.headers, null, 2));

	const cacheKeyHeaders = [];
	Object.keys(res.headers).filter(key => {
		if (key.startsWith('pck-')) {
			cacheKeyHeaders.push(res.headers[key]);
			delete res.headers[key];
		}
	});
	if (cacheKeyHeaders.length) {
		res.headers = {
			"pck-headers": cacheKeyHeaders.join(",")
		};
	}
	try {
		log.info(JSON.parse(res.headers["pck-headers"].split(",").length));
		log.info(JSON.stringify(res.headers, null, 2));
	} catch(e) {
		//
	}
	return res;

};
