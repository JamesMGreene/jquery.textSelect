/**
 * jquery.textSelect jQuery Custom Event v0.1
 * http://jamesmgreene.github.com/jquery.textSelect/
 *
 * Copyright © 2012: James Greene (Team Gunmetal, Inc.)
 * Released under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function ($, win) {
	var doc = win.document,
	    $doc = $(doc),
	    textSelectBindingCount = 0,
	    mouseDownRegistrar = {},
	    customEventNamespace = ".textSelect",
	    defaultNamespaces = customEventNamespace + ".default";

	$.event.special.textSelect = {
		/* Invoked each time this event is bound */
		add: function (handleObj) {
			// If this is the first "textSelect" binding on the page, we also need to enable the
			// default handler on the document root in order to make this particular event possible.
			if (0 === textSelectBindingCount++) {
				$doc.on("mouseup" + defaultNamespaces, function ($event) {
					console.log("document.mouseup");
					mouseDownRegistrar = {};
				});
			}
			var namespaces = customEventNamespace + (handleObj.namespace ? "." + handleObj.namespace : handleObj.namespace),
			    selector = handleObj.selector,
			    $this = $(this);

			$this.on("mousedown" + namespaces, selector, function ($event) {
				mouseDownRegistrar[this] = $event;
			});

			$this.on("mouseup" + namespaces, selector, function ($event) {
				if (mouseDownRegistrar[this] && !! $.event.special.textSelect.defaults.getSelectedText()) {
					var $startSelectionEvent = mouseDownRegistrar[this],
					    $eventType = $event.type,
					    $eventRelatedTarget = $event.relatedTarget,
					    $eventData = $event.data,
					    customEventData;

					// The following is effectively a stopPropagation for the textSelect event bubble
					mouseDownRegistrar = {};

					// Update the event object
					$event.type = handleObj.origType;
					$event.relatedTarget = $startSelectionEvent.target;

					// Request custom event data, if any is desired, and merge it into the main event data
					customEventData = $.event.special.textSelect.defaults.getCustomEventData($event) || {};
					$event.data = jQuery.extend(true, {}, $eventData, customEventData);

					// Let jQuery handle the triggering of "textSelect" event handlers
					jQuery.event.dispatch.apply(this, arguments);

					// Revert the event back to its previous state for bubbling
					$event.type = $eventType;
					$event.relatedTarget = $eventRelatedTarget;
					$event.data = $eventData;
				}
			});
		},

		/* Invoked each time this event is unbound */
		remove: function (handleObj) {
			// If this is the last "textSelect" unbinding on the page, we should also disable the
			// default handler on the document root as it is no longer necessary.
			if (0 === --textSelectBindingCount) {
				$doc.off(defaultNamespaces);
			}
			var namespaces = customEventNamespace + (handleObj.namespace ? "." + handleObj.namespace : handleObj.namespace),
			    selector = handleObj.selector,
			    $this = $(this);

			$this.off("mousedown" + namespaces, selector);
			$this.off("mouseup" + namespaces, selector);
		},

		/* Invoked each time a manual call to "trigger" or "triggerHandler" is made for this event type */
		trigger: function ($event, data) {
			var $eventData = $event.data;
			if (data) {
				$eventData = $.extend(true, $eventData || {}, data);
			}
			$.event.special.textSelect.defaults.simulateTextSelection(this, $eventData);

			// Prevent the normal handling (bubbling) of this event
			return false;
		},

		/* Add some jQueryUI-style default behavior implementations that can be overridden */
		defaults: {
			getSelectedText: function () {
				var text = "";
				if (win.getSelection) {
					var sel = win.getSelection(),
					    ranges = [];
					for (var r = 0; r < sel.rangeCount; r++) {
						ranges.push(sel.getRangeAt(r).toString());
					}
					text = ranges.join("");
				} else if (document.selection) {
					text = document.selection.createRange().text;
				}
				return text;
			},

			getCustomEventData: function ($event) {
				var currentlySelectedText = $.event.special.textSelect.defaults.getSelectedText();
				return {
					selectedText: currentlySelectedText
				};
			},

			simulateTextSelection: function (el, eventData) {
				var $el = $(el),
				    range;

				// Simulate mousedown
				$el.trigger("mousedown", eventData);

				// Simulate the text selection
				if (win.getSelection) {
					var TEXT_NODE = typeof (Node) !== "undefined" ? Node.TEXT_NODE : 3,
					    $textNodeDescendants = $el.contents().filter(function () {
					    	return this.nodeType == TEXT_NODE;
					    }),
					    firstTextNode = $textNodeDescendants.first().get(0),
					    lastTextNode = $textNodeDescendants.last().get(0),
					    sel = win.getSelection();

					if (sel.rangeCount > 0) {
						sel.removeAllRanges();
					}
					range = doc.createRange();
					range.setStart(firstTextNode, 0);
					range.setEnd(lastTextNode, lastTextNode.nodeValue.length);
					sel.addRange(range);
				} else if (doc.selection) {
					doc.selection.empty();
					range = el.createTextRange();
					range.select();
				}

				// Simulate mouseup
				$el.trigger("mouseup", eventData);
			}
		}
	};

	/* Add the "textSelect" top-level (ease-of-use) event method as a jQuery plugin */
	$.fn.textSelect = function (handler) {
		return handler ? this.on("textSelect", handler) : this.trigger("textSelect");
	};

})(jQuery, this);