var chai = require('chai');
var packageInstaller = require('../src/packageInstaller');
var should = chai.should();


describe('Package Installer', function() {

	it('is a function', function() {
		packageInstaller.should.be.a('function');
	});

	it('returns a string', function() {
		packageInstaller(['kittenService: ']).should.be.a('string');
	});

	it('should throw exception with no input', function() {
		(function() {
			packageInstaller();
		}).should.Throw('no input');
	});

	it('should throw with empty array input', function() {
		(function() {
			packageInstaller('KittenService: ');
		}).should.Throw('input has to be an array');
	});

	it('should throw with non-string element', function() {
		(function() {
			packageInstaller(['KittenService: ', 1]);
		}).should.Throw('package has to be a string');
	});

	it('should throw with invalid string', function() {
		(function() {
			packageInstaller(['kittenService, ']);
		}).should.Throw('invalid string input');
	});

	it('should throw when a cycle is detected', function() {
		(function() {
			packageInstaller(['KittenService: ', 'Leetmeme: Cyberportal', 'Cyberportal: Ice', 'CamelCaser: KittenService', 'Fraudstream: ', 'Ice: Leetmeme']);
		}).should.Throw('a cycle is detected');
	});

	it('should throw when a missing package definition is detected', function() {
		(function() {
			packageInstaller(['KittenService: CamelCaser']);
		}).should.Throw('missing package dependency definition');
	});

	it('should return the correct order of the install - 1', function() {
			packageInstaller(['kittenService: ']).should.equal('kittenService');
	});

	it('should return the correct order of the install - 2', function() {
		packageInstaller(['KittenService: CamelCaser', 'CamelCaser: ']).should.equal('CamelCaser, KittenService');
	});

	it('should return the correct order of the install - 3', function() {
		packageInstaller(['KittenService: ', 'Leetmeme: Cyberportal', 'Cyberportal: Ice', 'CamelCaser: KittenService', 'Fraudstream: Leetmeme', 'Ice: ']).should.equal('KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream');
	});

})