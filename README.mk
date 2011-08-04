# jQuery WebVTT plugin v0.0.1

_Caution: This plugin is currently in early development. Some things may change, so take care with updates!_

jQuery WebVTT is made for parsing subtitles for usage in html context. It supports the WebVTT and SRT markup. The text can be parsed from text in a variable or from a document tag.

## Usage

Html:

    <script id="source" type="text/vtt">
        WEBVTT

        00:11.000 --> 00:13.000
        <v Roger Bingham>We are in New York City

        00:13.000 --> 00:16.000
        <v Roger Bingham>We're actually at the Lucern Hotel, just down the street
    </script>

Javascript:

    $('#source').webVtt('00:12.000').appendTo('#target');