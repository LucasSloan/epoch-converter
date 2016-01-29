$(document).ready(function() {
    $(document).bind('mousedown', function() {
        $(document).one('mouseup', function(event) {
            var selectedText = getSelectedText();

            if (!isNaN(parseInt(selectedText))) {
                var textAsInteger = parseInt(selectedText);
                if (isValidTimestamp(textAsInteger)) {
                    var timestampType = getTimestampType(textAsInteger);
                    var localDateTime = getTimestampAsLocalDateTime(textAsInteger);

                    // Show the tooltip
                    $('<div/>').qtip({
                        content: {
                            title: timestampType,
                            text: localDateTime,
                            button: true
                        },
                        position: {
                            target: 'mouse',
                            adjust: { mouse: false }
                        },
                        show: false,
                    }).qtip('api').show(event);
                }
            }
        });
    });
});

var formatString = "M/D/YYYY, H:mm:ss A [GMT]Z";
var yearTwoThousand = moment.utc({ year :2000, month :0, day :0});
var yearTwentyFifty = moment.utc({ year :2050, month :0, day :0});

function getTimestampAsLocalDateTime(ts) {
	var date = moment(ts * 1000);
    if (date.isAfter(yearTwoThousand) && date.isBefore(yearTwentyFifty)) {
        return date.format(formatString);
    }
    date = moment(ts);
    if (date.isAfter(yearTwoThousand) && date.isBefore(yearTwentyFifty)) {
        return date.format(formatString);
    }
    date = moment(ts / 1000);
    if (date.isAfter(yearTwoThousand) && date.isBefore(yearTwentyFifty)) {
        return date.format(formatString);
    }
}

function getTimestampType(ts) {
	var date = moment(ts * 1000);
    if (date.isAfter(yearTwoThousand) && date.isBefore(yearTwentyFifty)) {
        return "Assuming that this timestamp is in seconds:";
    }
    date = moment(ts);
    if (date.isAfter(yearTwoThousand) && date.isBefore(yearTwentyFifty)) {
        return "Assuming that this timestamp is in milliseconds:";
    }
    date = moment(ts / 1000);
    if (date.isAfter(yearTwoThousand) && date.isBefore(yearTwentyFifty)) {
        return "Assuming that this timestamp is in nanoseconds:";
    }
}

function isValidTimestamp(ts) {
	var date = moment(ts * 1000);
    if (date.isAfter(yearTwoThousand) && date.isBefore(yearTwentyFifty)) {
        return true;
    }
    date = moment(ts);
    if (date.isAfter(yearTwoThousand) && date.isBefore(yearTwentyFifty)) {
        return true;
    }
    date = moment(ts / 1000);
    if (date.isAfter(yearTwoThousand) && date.isBefore(yearTwentyFifty)) {
        return true;
    }
    return false;
}

function getSelectedText() {
	var text = "";

    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }

	return text;
}
