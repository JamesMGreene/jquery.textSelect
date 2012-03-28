## jquery.textSelect
jquery.textSelect is a jQuery plugin that creates a bindable special event for user text selection: "textSelect"

Have you ever wished that browsers threw an event when user select text on your page? If you are [or can be] using
jQuery 1.7+, then this simple jQuery extension can grant that wish for you!


### Usage
* `jQuery(selector).on("textSelect", callbackFunc);`


### Dependencies
* jQuery 1.7+


### More?
See the [project pages][1] for additional information, demos, and tests.


### References
#### New API (jQuery 1.7+):
* [@dmethvin's slides regarding "the Great jQuery Event System Refactor of 1.7"][2]
* [__UNPUBLISHED__ official documentation for jQuery special events][3], courtesy of @dmethvin
	_Note:_ This documentation is unpublished because the API is still being finalized.

#### Old API (jQuery 1.2, jQuery 1.3, jQuery 1.4-1.6) — only used during research:
* [@cowboy's in-depth blog post about jQuery special events][4]
* [@brandonaaron's blog post about jQuery special events][5]
* [@brandonaaron's jquery.mousewheel event GitHub repo][6]


[1]: http://jamesmgreene.github.com/jquery.textSelect/
[2]: http://www.slideshare.net/dmethvin/jquery-17-events
[3]: https://docs.google.com/document/d/11rRFvC51lDU8SBqgcsR5XwVKUeW__RO643iXSEVOdQ4/edit
[4]: http://benalman.com/news/2010/03/jquery-special-events/
[5]: http://brandonaaron.net/blog/2009/03/26/special-events
[6]: https://github.com/brandonaaron/jquery-mousewheel/