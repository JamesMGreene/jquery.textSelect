[![Build Status](https://travis-ci.org/JamesMGreene/jquery.textSelect.png?branch=master)](https://travis-ci.org/JamesMGreene/jquery.textSelect)

# jquery.textSelect

Bind to the `textSelect` event, a custom DOM-like event generated using jQuery's Special Events API.
The `textSelect` event triggers when the user selects any text within a bound element.


## Getting Started
Check the [jQuery Plugins Registry](http://plugins.jquery.com/textSelect/) for the latest published version of this plugin!

You can also download the [production version][min] or the [development version][max] from GitHub.

[min]: https://raw.github.com/JamesMGreene/jquery.textSelect/master/dist/jquery.textSelect.min.js
[max]: https://raw.github.com/JamesMGreene/jquery.textSelect/master/dist/jquery.textSelect.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/jquery.textSelect.min.js"></script>
<script>
    jQuery(selector).on("textSelect", callbackFn);
</script>
```

## Examples
```js
???
```

## Compatibility
**Works 100% with jQuery versions:**  
 - 1.7.x
 - 1.8.x
 - 1.9.x

**Untested jQuery versions:**  
 - Anything below 1.7.x (incompatible jQuery Special Events API)
 - 2.0.0b1

## Documentation
_(Coming soon)_

## Release History
 - 0.5.1: Published to the jQuery Plugins Registry on 2013-02-14.
     - Changing the filenames to include the "jquery." prefix.
 - 0.5.0: Published to the jQuery Plugins Registry on 2013-02-13.
     - Initial release. Lots of work to get done (see Issues).
