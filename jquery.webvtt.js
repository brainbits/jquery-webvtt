/**
 * jQuery WebVTT Plugin 0.0.1
 * http://github.com/brainbits/jquery-webvtt
 * Requires jQuery 1.4.2
 *
 * Copyright 2011 Brainbits GmbH.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function($, undefined) {

    /**
     * Some regular expressions for parsing
     */
    var TIMESTAMP = /^(?:(\d{2,}):)?(\d{2}):(\d{2}[,.]\d{3})$/,
        CUE       = /(.*) --> (.*)\n(.*)/,
        WEBVTT    = /^\uFEFF?WEBVTT(?: .*)\n{2,}/;

    /**
     * Parse the WebVTT source into a javascript array
     */
    var parse = function(text) {
        return [

        ];
    }

    /**
     * Converts a WebVTT timestamp into a floating number
     */
    var timestampToNumber = function(time) {

        if(!TIMESTAMP.test(time)) {
            throw "'" + time + "' doesn't match to the WebVTT timestamp pattern.";
        }

        var matches = TIMESTAMP.exec(time),
            number  = parseFloat(matches[3]);

        if (matches[2]) {
            number += matches[2] * 60;
        }

        if (matches[1]) {
            number += matches[1] * 60 * 60;
        }
        
        return number;
    }

    /**
     * The global jquery function
     */
    $.webVtt = function(source, time) {

        var element = $(source);

        if (!element.data('webvtt')) {
            element.data('webvtt', parse(element.text()));
        }

        if ($.type(time) !== "number") {
            time = timestampToNumber(time);
        }

        return $('<div/>');
    };

    /**
     * Extends the jquery functions for concatenation
     */
    $.fn.extend({
        webVtt: function(time) {
            return $.webVtt(this[0], time);
        }
    });

}) (jQuery);