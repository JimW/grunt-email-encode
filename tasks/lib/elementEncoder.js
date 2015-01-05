// mailStuff.js
/*
* Copyright (c) 2014 Jim Waterwash
* Licensed under the MIT license.
*/

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Mail = function(address) {
      this.address = address;
      this.encoded = '';
      // this.src_file = ''; //  TODO: make work for multi files
};
global.mailToArray = []; // has to be global to be accessed via template processing

// _________

function ElementEncoder(someHtml, grunt) {

  // DESC: strips someHtml of mailtos and replaces with javscript encoded scripts 
  
  // Steps:

  // 1) Loop Through all mailTos within hrefs, 
  //    saving raw email addresses into Mail class array
  //    creating a new templatized version by replace orginal instances with an indexed mailTo variable
  
  // 2) Send each found anchor element to hive logic, saving an encoded version within mailTos array

  // 3) Use grunt to apply mailTos array, containing the encoded instances, into the templatized string

  // TODO: Cleanup the way I'm passing 'data' around
  // TODO: Use a gruntless template engine so I don't need to pass in 'grunt'

	var htmlWithVariables;
  var finalHTML;

  var request = require('request'),
      async = require('async'),
      FormData = require('form-data'),
      jsdom = require("jsdom");

	function _checkForErrors(error, data, reason) {
    if (error) {
        this.emit('error', error);
        return true;
    }
    // TODO: catch all Error conditions and send as 'failure' with reason
    // "No network access", "no Html", "no email links"
    // if (data.blahblah) {
    //     this.emit('failure', reason);
    //     return true;
    // }
    return false;
	}
  // _________

  function _templatize(error, data) {

    if (_checkForErrors(error, data, 'templatize')) { // XXX no internet, someHtml is empty
      return false;
    } else {
			jsdom.env(someHtml,["http://code.jquery.com/jquery-2.1.1.min.js"],
	      
	      function (errors, window) {

	        var $ = window.$;
	        // I can't believe this is not built into Jquery.. would have saved me lots of time.
	        $.fn.outerHTML = function(s) {
					  return (s)
					  ? this.before(s).remove()
					  : $("<p>").append(this.eq(0).clone()).html();
					};

	        var index = 0;
			    mailToArray = [];

			    $('a[href^="mailto:"]').each(function() {		
							  // Store original unencoded
							  mailToArray[index] = new Mail($(this).outerHTML())
							  // Replace with variable reference 
                // (Could not turn off template engine with any inline preprocessor directives, 
                //  so I changed the delims - in gruntfile) - better way ???
								$(this).replaceWith('ZZ{= (global.mailToArray)['+index+'].encoded }ZZ');
								index++;
					});

          htmlWithVariables = "<!DOCTYPE html>" + $('html')[0].outerHTML;

          // console.log(htmlWithVariables);
	  		  _encodeAllEmails();
	      }
		  );
    }

  }
  // _________

  function _encodeAllEmails(error, data) {

    if (_checkForErrors(error, data, 'encodeAllEmails')) { // XXX no internet, someHtml is empty
      return false;
    } else {

      async.forEach(mailToArray, callHivelogicEnkoder
        ,function(err){
          if( err ) {
            console.log('failed to process'); // All processing will now stop.
          } else {
            console.log(' \n(: All mailTos have been encoded by Hivelogic successfully :)\n');            
  	  		  _insertEncodesIntoTemplate();
          }
        }
      );
    }

	}
   // _________

  function _insertEncodesIntoTemplate(error, data) {

    if (_checkForErrors(error, data, 'insertEncodesIntoTemplate')) { // XXX no internet, someHtml is empty
      return false;
    } else {

			var templateOptions = {
		    data: mailToArray,
		    delimiters: 'doubleZ-brackets'
		  };
      data = grunt.template.process(htmlWithVariables, templateOptions ); 
      _finish(error,data);
		}

	}
  // _________

	function _finish(error, data) {

    if (_checkForErrors(error, data)) {
      return false;
    } else {
      self.emit('success', data); // SUCCESS ____________
    }

	}
 // _________ START

  function perform() {
		_templatize();
  }
 // _________ INIT

  self = this; // still need this ???
  this.perform = perform; 
 
 // ______________________________________________________

	function callHivelogicEnkoder(mailTo, callback) {
    
    var myForm = {
      customLink: mailTo.address,
      id: 'enkoder_form_advanced',
      name: 'enkoder_form_advanced',
      action: 'advanced'
    }
    var hiveResponse = "";

    request.post('http://hivelogic.com/enkoder/index.php', {form:myForm},
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          hiveResponse = body; 
          jsdom.env(hiveResponse,["http://code.jquery.com/jquery.js"],
            function (errors, window) {
              
              var $ = window.$;
              var preScript = '<script type="text/javascript">';
							var postScript = '</script>';

              mailTo.encoded = preScript + $('form[name="result"] textarea').val() + postScript;
              callback();
            }
          );
        }
        // callback(error); // should this be able to be called ???
      }
    )
  } 
 // ______________________________________________________

}

util.inherits(ElementEncoder, EventEmitter);
module.exports = ElementEncoder;


