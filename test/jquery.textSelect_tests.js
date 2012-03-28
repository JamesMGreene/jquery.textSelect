module("Test jquery.textSelect via the event system's main binding mechanism: on/off");

test("Add tests here", function() {
	ok(false, "Not implemented yet!");
});


module("Test overriding the jquery.textSelect default behavior implementations");

test("Add tests here", function() {
	ok(false, "Not implemented yet!");
});


module("Test jquery.textSelect via the event system's deprecated binding mechanism: bind/unbind");

test("Add tests here", function() {
	ok(false, "Not implemented yet!");
});


module("Test jquery.textSelect via the event system's deprecated binding mechanism: live/die");

test("Add tests here", function() {
	ok(false, "Not implemented yet!");
});


module("Test jquery.textSelect via the event system's deprecated binding mechanism: delegate/undelegate");

test("Add tests here", function() {
	ok(false, "Not implemented yet!");
});


/*
TODO: Respect event.data, if needed [ http://api.jquery.com/on/ ]
TODO: Add tests for adding to body (see if it conflicts with the global handler)
TODO: Add tests for overlapping regions (more than one textSelect handler on a given element)
TODO: Add "on" test using event map (and any other overloaded params)

$(".selectable").bind("textSelect", function($event) {
	writeLog("Selectable [hooked up with 'bind' method] fired!\nText selected was: " + $event.data.selectedText);
});
$(".selectable").bind("textSelect.someNamespace", function($event) {
	writeLog("Selectable [hooked up with 'bind' method] fired!\nText selected was: " + $event.data.selectedText);
});
$(".selectable").bind("textSelect", { customProp: "blah" }, function($event, customParams) {
	writeLog("Selectable [hooked up with 'bind' method] fired!\nParams: " + JSON.stringify(customParams) + "\nText selected was: " + $event.data.selectedText);
});
$(".selectable").bind({
	"textSelect": function($event) {
		writeLog("Selectable [hooked up with 'bind' method] fired!\nText selected was: " + $event.data.selectedText);
	}
});
$(".selectable").on("textSelect", function($event) {
writeLog("Selectable [hooked up with 'on' method] fired!\nText selected was: " + $event.data.selectedText);
});
$(".selectable").on("textSelect", "span", function($event) {
	writeLog("Selectable [hooked up with 'on' method] fired!\nText selected was: " + $event.data.selectedText);
});
$(".selectable").on("textSelect", "span", { customProp: "blah" }, function($event, customParams) {
	writeLog("Selectable [hooked up with 'on' method] fired!\nParams: " + JSON.stringify(customParams) + "\nText selected was: " + $event.data.selectedText);
});
$(".selectable").on("textSelect", { customProp: "blah" }, function($event, customParams) {
	writeLog("Selectable [hooked up with 'on' method] fired!\nParams: " + JSON.stringify(customParams) + "\nText selected was: " + $event.data.selectedText);
});
$(".selectable").textSelect(function($event) {
	writeLog("Selectable [hooked up with 'textSelect' method] fired!\nText selected was: " + $event.data.selectedText);
});
$(".selectable").textSelect({ customProp: "blah" }, function($event) {
	writeLog("Selectable [hooked up with 'textSelect' method] fired!\nText selected was: " + $event.data.selectedText);
});
*/