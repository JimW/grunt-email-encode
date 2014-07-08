'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.email_encode = {

  setUp: function(done) {
    // setup here if necessary
    done();
  },

   default_options: function(test) {

    // Some tests might be nice :)

    // test.expect(1);

    // var actual = grunt.file.read('tmp/index_converted_to_hbs.html');
    // var expected = grunt.file.read('test/expected/index_converted_to_hbs.html');
    // test.equal(actual, expected, 'should replace all mailto:xxxx@yyy.com with <%= Mailto[0..etc] %>');

    // actual = grunt.file.read('tmp/enkoder_response.html');
    // expected = grunt.file.read('test/expected/enkoder_response.html');
    // test.equal(actual, expected, 'should return encode valued');

    test.done();
  },

};
