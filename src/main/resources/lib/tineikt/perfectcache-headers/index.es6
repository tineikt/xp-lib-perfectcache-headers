import contentLib from '/lib/xp/content';
import portalLib from '/lib/xp/portal';

// This should be set by app.config 🙈
const debug = false;

/*
*   Simple utility function for forcing something to be an array
*
*   Call by using forceArray(object)
*   forceArray will always return an array.
*   If the object we are forcing is undefined,
*   the returned array will be empty
*/
const forceArray = (object) => {
	if (!object || (typeof (object) === 'object' && !Object.keys(object).length)) {
		return [];
	} else if (object.constructor !== Array || typeof (object) === 'string') {
		return [object];
	}
	return object;
};

/**

 */
function PerfectCacheHeaders(name) {
	this.name = `pch-${name.replace(/[^\w-:]/gi, '')}`;
	this.cacheKeys = [];
}

/**

 */
PerfectCacheHeaders.prototype.remove = function(guid) {
	if (guid) {
		const index = this.cacheKeys.indexOf(guid);
		if (index > -1) {
			this.cacheKeys.splice(index, 1);
		}
	}
};

/**

 */
PerfectCacheHeaders.prototype.add = function(guid, type = 'con-') {
	if (guid) {
		if (Array.isArray(guid)) {
			this.cacheKeys = [].concat(this.cacheKeys, guid.map(g => `${type}${g}`));
		} else {
			this.cacheKeys.push(`${type}${guid}`);
		}
	}
};

/**

 */
PerfectCacheHeaders.prototype.getHeader = function() {
	const header = {};
	if (this.cacheKeys.length) {
		header[this.name] = this.cacheKeys.join(',');

		if (debug) {
			log.info('PCH debug start');
			contentLib.query({
				filters: {
					ids: {
						values: header[this.name].split(',').map(c => c.substring(4))
					}
				}
			}).hits.forEach(c => {
				log.info(`${c.type} - ${c.displayName} - ${c._id}`);
			});
			log.info('PCH debug end');
		}
	}
	return header;
};

/**

 */
PerfectCacheHeaders.prototype.utilMedia = function(media = false) {
	if (media) {
		switch (media._selected) {
			case 'mediaImage':
				this.add(media.mediaImage.imgSrc);
				break;
			case 'mediaVideo':
				this.add(media.mediaVideo.conVideo);
				break;
			default:
		}
	}
};

/**

 */
PerfectCacheHeaders.prototype.utilFragments = function(region = false) {
	if (region) {
		forceArray(region.components).filter(c => c.type === 'fragment').forEach(component => {
			this.add(component.fragment);
		});
	}
};

/**

 */
PerfectCacheHeaders.prototype.utilSelectorConfig = function(config = false, contents = false) {
	if (contents) {
		if (Array.isArray(contents)) {
			let childrenIds = contents.map(c => c._id);
			this.add(childrenIds);
		} else if (contents._id) {
			this.add(contents._id);
		}
	}

	let queryFolderIds = config.conFolder;
	this.add(queryFolderIds, 'cat-');

	const cleanedAppName = app.name.replace(/\./g, '-');
	if (config.getContentBasedOnCurrentContentTags) {
		const content = portalLib.getContent();
		let currentContentTagIds = content.x[cleanedAppName].tags.conTag;
		this.add(currentContentTagIds, 'tag-');
	}

	let tagIds = [].concat(config.conMustHaveTag, config.conShouldHaveTag, config.conMustNotHaveTag).filter(f => typeof f !== 'undefined');
	this.add(tagIds, 'tag-');
};

/**

 */
PerfectCacheHeaders.prototype.utilTarget = function(url = false) {
	if (url) {
		try {
			if (url.target.conKey) {
				this.add(url.target.conKey);
			}
		} catch(e) {
			// Assume we have an external URL as target
		}
	}
};

/**

 */
exports.pch = function(name) {
	return new PerfectCacheHeaders(name);
};
