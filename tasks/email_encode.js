/*
 * grunt-email-encode
 * https://github.com/jim/grunt-email-encode
 *
 * Copyright (c) 2014 Jim Waterwash
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.template.addDelimiters('doubleZ-brackets', 'ZZ{', '}ZZ');

  grunt.registerMultiTask('email_encode', "Encodes all objects containing a mailto: so they're less likely to get harvested by spam bots.", function() {

     // TODO: Maybe add some configs
    var options = this.options({
      debug: false,
    });

    var done = this.async();
    var ElementEncoder = require('./lib/elementEncoder');

    // TODO: No real need to call out to hivelogic since someone posted it's source on github.
    // TODO: Add ability to bypass encode if mailto's parent element contains a "spam-me" class
    
    // Iterate over all src-dest file pairs.
    this.files.forEach(function(f) {

      var dest = f.dest;
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file: ' + filepath + ' not found.');
          return false;
        } else {
          return true;
        }
      });
      if (src.length === 0) {
        grunt.log.warn('Destination ' + dest + ' not written because src files were empty.');
        return;
      }

      // ____ Begin


      var emailEncoder = new ElementEncoder(grunt.file.read(src), grunt);

      emailEncoder.on('error', function (error) {
        console.log("emailEncoder Error :(");
      });

      emailEncoder.on('failure', function (reason) {
      // TODO: Error recovery
      });
      
      emailEncoder.on('success', function (convertedHTMLFile) {
        grunt.file.write(dest, convertedHTMLFile);
        done();
      });

      emailEncoder.perform();
      
      // ____ END

    }) // for each file

  });

};
