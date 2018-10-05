# <a href="https://www.tine.no/"><img src="https://webfiles.tine.no/Logo/TINE-logo.svg" alt="TINE Logo" width="70" align="right"></a> xp-lib-perfectcache-headers

## What is this
This is a util lib that helps create and handle the xkey headers used by xkey vmod in Varnish to support secondary hashes to objects.

## Setting up reference to this lib in your own project
1. Add lib as a dependency to your **build.gradle** file
```
dependencies {
	include 'com.github.tineikt:xp-lib-perfectcache-headers:1.0.0'
}
```

2. Add response filter to your `site.xml`
```xml
<site>
	...
	<filters>
		<response-filter name="perfectCacheHeaders" order="10"/>
	</filters>
</site>
```

## Usage
Require it in your JavaScript code.

```javascript
import { pch } from '/lib/tineikt/perfectcache-headers';
```

Create a new perfect cache header object.
```javascript
const cacheHeaders = new pch(name);
```
`name` should be something unique for the complete request. If used in a part we could use the path to the component.

We can then populate this cache by adding relations to it in our controller.
```javascript
cacheHeaders.add(content._id);
cacheHeaders.add(content.data.conRelatedContents);
```

Then all we have to do is make sure we return the headers in the response.

```javascript
const headers = cacheHeaders.getHeader();
return {
	headers,
	body: freemarker.render(viewFile, model)
};
```

## Methods

### getHeader()
Returns a simple header ready to be returned in response
```javascript
{
	headers: {
		pch-name: 'con-ce5dc0e7-0e28-47fc-b4a6-4d81727f00e7,cat-104c0db2-aa53-411c-8f6a-9213947d13d9'
	}
}
```

### add(guid, type = 'con-')
Adds a single content to the header

### remove(guid, type = 'con-')
Remove a single content from the header

### utilMedia(media)
Util function to support media mixin and add selected image or video content by passing media node

### utilTarget(url)
Util function to support link mixin and add selected target content if internal link

### utilFragments(region)
Util function iterates a region to find any fragment in that region

### utilSelectorConfig(config, contents)
Util function using the list config to fetch content, section and tags affecting the resulting resultset.
