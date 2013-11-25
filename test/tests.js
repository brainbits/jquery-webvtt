// Tests issue #1
test("Writing text from position zero", function() {
    var output = $('#qunit-fixture');
    $('#source').webVtt('00:01.490').appendTo(output);

    equal(output.children('p').length, 1, 'Paragraph added');
    equal(output.children('p').text(), 'Text number one', "Text is correct");
});

test("Writing text from second position to html", function() {
    var output = $('#qunit-fixture');
    $('#source').webVtt('00:05.501').appendTo(output);

    equal(output.children('p').length, 1, 'Paragraph added');
    equal(output.children('p').text(), 'Text number two', "Text is correct");
});

test("Writes no text to html if time is after last line", function() {
    var output = $('#qunit-fixture');
    $('#source').webVtt('00:14.900').appendTo(output);

    equal(output.children('p').length, 0, 'No paragraph added');
});

test("Loading content from a string", function() {
    var output = $('#qunit-fixture'),
        ajaxResponse = $('#source').html(),
        element = $('<script type="text/vtt">' + ajaxResponse + '</script>');

    equal(typeof ajaxResponse, "string", "For this test we expecting a string as source");

    element.webVtt('00:05.501').appendTo(output);

    equal(output.children('p').text(), 'Text number two', "Text is correct");
})