var _ = require('lodash');

module.exports = {


	/**
	 * Check that all the keys in the first object (testobj) are defined in the second object (authorityObj).
	 * Does not look at inherited attributes of either object.
	 *
	 * @param testObj - the object that needs to be checked.
	 * @param authorityObj - The objct that defines the list of valid keys.
	 * @return true if all the keys in testObj are also defined in authorityObj.
	 * @return false if any key in testObj is not defined in authorityObj.
	 */
	validateKeys: function(testObj, authorityObj){
		var result = true;
		testObj.keys().forEach(function(keyName){
			if (!authorityObj.hasOwnProperty(keyName)) {
				result = false;
			}
		});
		return result;
	}
}