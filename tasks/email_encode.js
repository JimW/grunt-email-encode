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
      // generated_mail_scripts_folder: 'tmp/email_encode/mail_scripts'
      // TODO Because dom_munger might be choking on CDATA, 
      //      replace with these numbered include scripts instead.
    });

    var done = this.async();
    var ElementEncoder = require('./lib/elementEncoder');

    // TODO: No real need to call out to hivelogic since someone posted it's source on github.
    // TODO: Add ability to bypass encode if mailto's parent element contains a "spam-me" class
    
    // Iterate over all src-dest file pairs.
    // TODO: figure out seperate src:, dest: way of specifying these
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
        done(); // TODO: Return errors
      });

      emailEncoder.on('failure', function (reason) {
      // TODO: Error recovery
        done();
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
