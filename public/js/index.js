/**
 * Created by Ian on 04/04/2014.
 */

 var q = require('q');

var p = document.querySelector('p');

setInterval(function () {
	p.style.visibility = getComputedStyle(p).visibility === 'hidden'
			? 'visible'
			: 'hidden';
}, 300);