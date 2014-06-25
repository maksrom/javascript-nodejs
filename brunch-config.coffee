exports.config =
# See https://github.com/brunch/brunch/blob/master/docs/config.md for documentation.
  paths:
    public: 'www'
  files:
    javascripts:
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^(vendor|bower_components)/
      order:
        before: []

    stylesheets:
      joinTo:
        'stylesheets/app.css': /^app/
      order:
        before: []
        after: []

    templates:
      joinTo: 'javascripts/app.js'


  plugins:
    jade:
      pretty: yes # Adds pretty-indentation whitespaces to output (false by default)
    stylus:
      linenos: true
      includeCss: true

  conventions:
    assets: /^assets/