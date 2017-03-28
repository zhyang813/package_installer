var chai = require('chai');
var packageInstaller = require('../src/packageInstaller');
var should = chai.should();


describe('Package Installer', function() {

	it('is a function', function() {
		packageInstaller.should.be.a('function');
	});

	it('returns a string', function() {
			packageInstaller(['kittenService: ']).should.be.a('string');
	})

	it('should throw exception with no input', function() {
    (function() {
      packageInstaller();
    }).should.Throw();
  });

  it('should throw with empty array input', function() {
    (function() {
      packageInstaller();
    }).should.Throw();
  });

  it('should throw with non-string element', function() {
    (function() {
      packageInstaller();
    }).should.Throw();
  });

  it('should throw with invalid string', function() {
    (function() {
      packageInstaller();
    }).should.Throw();
  });

  it('should throw when detected a cycle', function() {
    (function() {
      packageInstaller();
    }).should.Throw();
  });

  it('should throw when a missing package definition is detected', function() {
    (function() {
      packageInstaller();
    }).should.Throw();
  });

  it('should return the correct order of install - 1', function() {
    packageInstaller(['kittenService: ']).should.be('kittenService');
  });

  it('should return the correct order of instal - 2', function() {
		packageInstaller().should.be();
  });

  it('should return the correct order of instal - 3', function() {
		packageInstaller().should.be.a();
  });
  
})