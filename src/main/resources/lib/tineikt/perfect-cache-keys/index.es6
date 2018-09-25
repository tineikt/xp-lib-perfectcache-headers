import contentLib from '/lib/xp/content';
import portalLib from '/lib/xp/portal';
const debug = true;

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
function PerfectCacheKeys(name) {
	this.name = `pck-${name}`;
	this.cacheKeys = [];
}

/**

 */
PerfectCacheKeys.prototype.remove = function(guid) {
	if (guid) {
		const index = this.cacheKeys.indexOf(guid);
		if (index > -1) {
			this.cacheKeys.splice(index, 1);
		}
	}
};

/**

 */
PerfectCacheKeys.prototype.add = function(guid, type = 'con-') {
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
PerfectCacheKeys.prototype.getHeader = function() {
	const header = {};
	if (this.cacheKeys.length) {
		header[this.name] = this.cacheKeys.join(',');

		if (debug) {
			log.info('PCK debug start 123');
			contentLib.query({
				filters: {
					ids: {
						values: header[this.name].split(',').map(c => c.substring(4))
					}
				}
			}).hits.forEach(c => {
				log.info(`${c.type} - ${c.displayName} - ${c._id}`);
			});
			log.info('PCK debug end 123');
		}
	}
	return header;
};

/**

 */
PerfectCacheKeys.prototype.utilMedia = function(media = false) {
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
PerfectCacheKeys.prototype.utilFragments = function(region = false) {
	if (region) {
		forceArray(region.components).filter(c => c.type === 'fragment').forEach(component => {
			this.add(component.fragment);
		});
	}
};

/**

 */
PerfectCacheKeys.prototype.utilSelectorConfig = function(config = false, contents) {
	let childrenIds = contents.map(c => c._id);
	this.add(childrenIds);

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
PerfectCacheKeys.prototype.utilTarget = function(url = false) {
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
exports.pck = function(name) {
	return new PerfectCacheKeys(name);
};
