/**
 * jquery.textSelect jQuery Custom Event v0.2
 * http://jamesmgreene.github.com/jquery.textSelect/
 *
 * Copyright © 2012: James Greene (Team Gunmetal, Inc.)
 * Released under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function($, win) {
	var doc = win.document,
		$doc = $(doc),
		textSelectBindingCount = 0,
		mouseDownRegistrar = {},
		customEventNamespace = ".textSelect",
		defaultNamespaces = customEventNamespace + ".default";

	$.event.special.textSelect = {
		/* Invoked each time this event is bound */
		add: function(handleObj) {
			// If this is the first "textSelect" binding on the page, we also need to enable the default handler on the
			// document root in order to make this particular event possible.
			if (0 === textSelectBindingCount++) {
				$doc.on("mouseup" + defaultNamespaces, function($event) {
					console.log("document.mouseup [Final bubble! No additional handlers will be invoked]");
					mouseDownRegistrar = {};
				});
			}
			var namespaces = customEventNamespace + (handleObj.namespace ? "." + handleObj.namespace : ""),
				selector = handleObj.selector,
				$this = $(this);

			$this.on("mousedown" + namespaces, selector, function($event) {
				mouseDownRegistrar[this] = $event;
			});

			$this.on("mouseup" + namespaces, selector, function($event) {
				var behaviors = $.event.special.textSelect.behaviors;
				if (mouseDownRegistrar[this] && !!behaviors.getSelectedText()) {
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

					// Request custom event data, if any is desired, and merge it into the main event data.
					// Due to curiosities of the jQuery.event.dispatch function, the object we would want as $event.data
					// must be stored in handleObj.data instead [which jQuery then forcibly copies into $event.data].
					customEventData = behaviors.getCustomEventData($event);
					handleObj.data = $.extend(true, {}, $eventData, handleObj.data, customEventData);

					// Let jQuery handle the triggering of "textSelect" event handlers
					$.event.dispatch.apply(this, arguments);

					// Revert the event back to its previous state for bubbling
					$event.type = $eventType;
					$event.relatedTarget = $eventRelatedTarget;
					$event.data = $eventData;
				}
			});
		},

		/* Invoked each time this event is unbound */
		remove: function(handleObj) {
			// If this is the last "textSelect" unbinding on the page, we should also disable the
			// default handler on the document root as it is no longer necessary.
			if (0 === --textSelectBindingCount) {
				$doc.off(defaultNamespaces);
			}
			var namespaces = customEventNamespace + (handleObj.namespace ? "." + handleObj.namespace : ""),
				selector = handleObj.selector,
				$this = $(this);

			$this.off("mousedown" + namespaces, selector);
			$this.off("mouseup" + namespaces, selector);
		},

		/* Invoked each time a manual call to "trigger" or "triggerHandler" is made for this event type */
		trigger: function($event, data) {
			var $this = $(this);

			// Simulate mousedown
			$this.trigger("mousedown");

			// Simulate the text selection
			$.event.special.textSelect.behaviors.selectText(this);

			// Simulate mouseup
			$this.trigger("mouseup");

			// Prevent the normal handling (bubbling) of this event
			return false;
		},

		/* Add some jQueryUI-style default behavior implementations that can be overridden */
		behaviors: {
			/* This behavior will not be overridden unless it is to address bugs or use a third party library (Rangy) */
			getSelectedText: function() {
				var text = "";
				if (win.getSelection) {
					var sel = win.getSelection(),
						ranges = [],
						r;
					for (r = 0; r < sel.rangeCount; r++) {
						ranges.push(sel.getRangeAt(r).toString());
					}
					text = ranges.join("");
				}
				else if (doc.selection) {
					text = doc.selection.createRange().text;
				}
				return text;
			},

			/* This behavior will not be overridden unless it is to address bugs or use a third party library (Rangy) */
			selectText: function(el) {
				var range;
				if (win.getSelection) {
					var TEXT_NODE = typeof(Node) !== "undefined" ? Node.TEXT_NODE : 3,
						$textNodeDescendants = $(el).contents().filter(function() {
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
				}
				else if (doc.selection) {
					doc.selection.empty();
					range = el.createTextRange();
					range.select();
				}
			},

			/* This behavior will be the most desirable to override as you may want more data specific to this event
			 than the default implementation is offering, such as adding the selectedHtml. */
			getCustomEventData: function($event) {
				var currentlySelectedText = $.event.special.textSelect.behaviors.getSelectedText();
				return {
					selectedText: currentlySelectedText
				};
			}
		}
	};

	/* Add the "textSelect" shortcut event function as a jQuery plugin */
	$.fn.textSelect = function(handler) {
		return handler ? this.on("textSelect", handler) : this.trigger("textSelect");
	};

})(jQuery, this);