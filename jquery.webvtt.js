/**
 * jQuery WebVTT Plugin 0.0.1
 * http://github.com/brainbits/jquery-webvtt
 * Requires jQuery 1.4.2
 *
 * Copyright 2011 Brainbits GmbH.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function ($) {

    "use strict";

    /**
     * Some regular expressions for parsing
     */
    var TIMESTAMP = /^(?:(\d{2,}):)?(\d{2}):(\d{2})[,.](\d{3})$/,
        CUE       = /^(?:(.*)\n)?([\d:,.]+) --> ([\d:,.]+)\n(.*)$/,
        WEBVTT    = /^\uFEFF?WEBVTT(?: .*)?/;

    /**
     * Converts a WebVTT timestamp into a floating number
     */
    function timestampToNumber(time) {

        if (!TIMESTAMP.test(time)) {
            throw "'" + time + "' doesn't match to the WebVTT timestamp pattern.";
        }

        var matches = TIMESTAMP.exec(time),
            number  = matches[4] / 1000;

        number += parseInt(matches[3], 10);

        if (matches[2]) {
            number += matches[2] * 60;
        }

        if (matches[1]) {
            number += matches[1] * 60 * 60;
        }

        return number;
    }

    /**
     * Parse the WebVTT source into a javascript array
     */
    function parse(text) {

        var lines   = text.split(/(\n{2,})/),
            cues    = [],
            matches = [],
            i       = 0;

        do {

            // If there is the optional WebVTT Header, omit first two lines
            if (i === 0 && WEBVTT.test(lines[i])) {
                i += 2;
            }

            if (!CUE.test(lines[i])) {
                throw "An error while parsing a WebVTT cue string.";
            }

            matches = CUE.exec(lines[i]);

            cues.push({
                marker: matches[1],
                from: timestampToNumber(matches[2]),
                to: timestampToNumber(matches[3]),
                payload: $('<p/>').text(matches[4])
            });

            i += 2;

        } while (i < lines.length);

        return cues;
    }

    /**
     * The global jquery function
     */
    $.webVtt = function (source, time) {

        var element = $(source),
            matches = $([]);

        if (!element.data('webvtt')) {
            element.data('webvtt', parse(element.html()));
        }

        if ($.type(time) !== "number") {
            time = timestampToNumber(time);
        }

        $.each(element.data('webvtt'), function (index, cue) {
            if (cue.from <= time && cue.to > time) {
                matches = matches.add(cue.payload);
            }
        });
        
        return matches;
    };

    /**
     * Extends the jquery functions for concatenation
     */
    $.fn.extend({
        webVtt: function (time) {
            return $.webVtt(this[0], time);
        }
    });

}(jQuery));