var packageInstaller = function(packages) {
	"use strict";
  
  //input validation
	if (packages === undefined) throw 'no input';
	if (!Array.isArray(packages)) throw 'input has to be an array';
	if (Array.isArray(packages) & packages.length < 1) throw 'no package in the input array';
	packages.forEach(function(pkg) {
		if (typeof pkg !== 'string') {
			throw 'package has to be a string';
		}
	})
  
  //parse array into an object holding package/dependency pairs,
  //and an array maintaining the order of original array of packages,
  //and a result array to hold final order of packages to install,
  //output will hold the output string
	var dict = {};
	var list = [];
	var result = [];
	var output = '';

	for (var i=0; i < packages.length; i++) {
		var pair = packages[i].split(':')
		if (pair.length !== 2) throw 'invalid string input';
		dict[pair[0].trim()] = pair[1].trim();
		list.push(pair[0].trim());
	}
  
  //determine the dependency and the order of the install
	for (var k = 0; k < list.length; k++) {
		if ( result.indexOf(list[k]) === -1 ) {
			if (dict[list[k]] === '') {
				result.push(list[k]);
			} else {
				var stack = [];
				stack.push(list[k]);
				while (stack.length > 0) {
					var lastKey = stack[stack.length-1];
					if ( dict[lastKey] === '') {
						if (stack.indexOf(lastKey) === -1) {
							stack.push(lastKey);
						}
						break;
					} else if (dict[lastKey]) {
						if (stack.indexOf(dict[lastKey]) === -1) {
							stack.push(dict[lastKey]);
						} else {
							throw 'a cycle is detected';
						}
					} else if (dict[lastKey] === undefined) {
						throw 'missing package dependency definition';
					}
				}
				while ( stack.length > 0) {
					var temp = stack.pop();
					if (result.indexOf(temp) === -1) {
						result.push(temp);
					}
				}
	    }
	  }
	}
  
  //turn result array into output string
	result.forEach(function(p) {
		output = output + p + ', ';
	})

	return output.substr(0, output.length-2);

}

module.exports = packageInstaller;

