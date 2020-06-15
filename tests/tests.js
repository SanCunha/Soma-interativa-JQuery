QUnit.test('isNumber Test', function(assert) {
    assert.expect(3);
    //Com equal()
    assert.strictEqual(isNumber(""), false, 'Empty input');
    assert.strictEqual(isNumber("a"), false, 'Char input');
    assert.strictEqual(isNumber(0), true, 'Integer input');
 });