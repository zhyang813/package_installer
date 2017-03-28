var chai = require('chai');
var packageInstaller = require('../src/packageInstaller');
var should = chai.should();

describe('Package Installer', function() {
	console.log(typeof packageInstaller);
	it('is a function', function() {
		packageInstaller.should.be.a('function');
	})


})