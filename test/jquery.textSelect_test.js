/*globals jQuery:false, QUnit:false */
(function($, undefined) {

  QUnit.module('jQuery#textSelect', {
    setup: function() {
      
    },
    teardown: function() {
      
    }
  });
    
  QUnit.test('Should exist', function(assert) {
    QUnit.expect(1);
    assert.ok($.event.special.textSelect);
  });

}(jQuery));
