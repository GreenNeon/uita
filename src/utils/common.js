export function LazyImport (path, folder) {
	return () => {
		if (folder) {
			return import(
				/* webpackChunkName: "Routing.[request]".toLowerCase() */
				`../views/${folder}/${path}`
			)
		} else {
			return import(
				/* webpackChunkName: "Routing.[request]".toLowerCase() */
				`../views/${path}`
			)
		}
		
	}
}

export function isEmptyObject(obj) {
	return (obj === undefined || obj === null || (typeof(obj) === 'object' && Object.keys(obj).length === 0));
}
export function isEmpty(str) {
	return (!str || 0 === str.length);
}
export function getKeyByString(object, value) {
	if (!value) return undefined;
  return Object.keys(object).find(key => object[key].toLowerCase() === value.toLowerCase());
}
