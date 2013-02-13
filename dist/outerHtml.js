/*! $.outerHtml - v1.0.7 - 2013-02-07
* https://github.com/JamesMGreene/jquery.outerHtml
* Copyright (c) 2013 James M. Greene; Licensed MIT */
(function($) {
  'use strict';
  
  
  var hasNativeOuterHTML = !!('outerHTML' in $('<div></div>').get(0));
  
  // Prefer the native `outerHTML` property when possible
  var getterFn = function() {
    var target = this.get(0);

    // If the browser supports the `outerHTML` property on elements AND if `target` is an element node
    if (hasNativeOuterHTML && target.nodeType === 1) {
      return target.outerHTML;
    }
    else {
      return $('<div></div>').append(this.eq(0).clone()).html();
    }
  };
  
  var setterFn = function(value) {
    // Do not attempt to replace anything using the native `outerHTML` property setter
    // even if it exists: it is riddled with bugs!
    return $('<div id="jquery-outerHtml-transformer"></div>').append(value).contents().replaceAll(this);
  };

  // Detect jQuery 1.8.x bug (for which the value here is `false`)
  var doesNotLeaveTempParentOnDetachedDomElement = true;

  $.fn.outerHtml = function(value) {
    if (arguments.length) {
      if (doesNotLeaveTempParentOnDetachedDomElement) {
        return setterFn.call(this, value);
      }
      else {
        // Fix for jQuery 1.8.x bug: https://github.com/JamesMGreene/jquery.outerHtml/issues/1
        var parentsOfThis = (function() {
          var parents = new Array(this.length);
          this.each(function(i) {
            parents[i] = this.parentNode || null;
          });
          return parents;
        }).call(this);
        
        return setterFn.call(this, value).map(function(i) {
          if (!parentsOfThis[i]) {
            if (this.parentNode) {
              return this.parentNode.removeChild(this);
            }
          }
          else if (parentsOfThis[i] !== this.parentNode) {
            // Appending to the end: this doesn't seem right but it should cover the detached DOM scenarios
            return parentsOfThis[i].appendChild(this);
          }
          return this;
        });
      }
    }
    else {
      return getterFn.call(this);
    }
  };
  
  // Detect jQuery 1.8.x bug (for which the value here is `false`)
  doesNotLeaveTempParentOnDetachedDomElement = (function() {
    var parent = $('<s>bad</s>').outerHtml('<div>good</div>').get(0).parentNode;
    return (parent.nodeName === '#document-fragment' && parent.nodeType === 11);
  })();

}(jQuery));
