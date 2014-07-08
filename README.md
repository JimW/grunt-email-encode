# grunt-email-encode

> Encodes all mailto addresses into javascript using the hivelogic enkoder.

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

NOT YET REGESTERED with npm - should implement the encoding locally first
```shell
npm install grunt-email-encode --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-email-encode');
```

## The "email_encode" task

### Overview
In your project's Gruntfile, add a section named `email_encode` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  email_encode: {
    options: {
      // None Yet
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

None Yet

### Usage Examples

#### Default Options


```js
grunt.initConfig({
  email_encode: {
    options: {},
    files: {
      'tmp/index_with_emails_encoded_FINAL.html': 'test/fixtures/raw_index.html'
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.0 - Initial (lacking docs or proper tests)