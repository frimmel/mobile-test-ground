var currentTouches = [];
var touchStarted = false;
var dragStarted = false;
var doubleTapStarted = false;
var doubleTapSecondTapStarted = false;
var pinchZoomStarted = false;

var doubleTapTimeout;
var breakpoint;

var handleTouchStart = function (e) {
    e.preventDefault();
    // double tap
    if (e.touches.length === 1) {
        if (currentTouches.length === 0) {
            if (doubleTapStarted === true) {
                doubleTapSecondTapStarted = true;
            }
            doubleTapStarted = true;
            clearTimeout(doubleTapTimeout);
            doubleTapTimeout = setTimeout(function () {
                    doubleTapStarted = false;
                    doubleTapSecondTapStarted = false;
                    clearTimeout(doubleTapTimeout);
                }, 500);
        }
    } else {
        doubleTapStarted = false;
        doubleTapSecondTapStarted = false;
        clearTimeout(doubleTapTimeout);
    }

    // one finger drag
    if (e.touches.length === 1) {
        dragStarted = true;
    } else {
        dragStarted = false;
    }

    // pinch zoom
    if (e.touches.length === 2) {
        pinchZoomStarted = true;
    } else {
        pinchZoomStarted = false;
    }

    currentTouches = e.touches;
};

var handleTouchMove = function (e) {
    e.preventDefault();

    // one finger drag
    if (e.touches.length === 1 && dragStarted === true) {
        handleDrag(e)
    }

    // pinch zoom
    if (e.touches.length === 2 && pinchZoomStarted === true) {
        handlePinchZoom(e);
    }

    currentTouches = e.touches;
};

var handleTouchEnd = function (e) {
    e.preventDefault();
    // double tap
    if (e.touches.length === 0 && currentTouches.length === 1) {
        if (doubleTapSecondTapStarted === true) {
            handleDoubleTap(e);
            doubleTapStarted = false;
            doubleTapSecondTapStarted = false;
        } else if (doubleTapStarted === true) {
            doubleTapSecondTapStarted = true;
        }
    } else {
        doubleTapStarted = false;
        doubleTapSecondTapStarted = false;
        clearTimeout(doubleTapTimeout);
    }

    // one finger drag
    if (e.touches.length === 1) {
        dragStarted = true;
    } else {
        dragStarted = false;
    }

    // pinch zoom
    if (e.touches.length === 2) {
        pinchZoomStarted = true;
    } else {
        pinchZoomStarted = false;
    }

    currentTouches = e.touches;
};

var handleTouchLeave = function (e) {
    e.preventDefault();
    doubleTapStarted = false;
    doubleTapSecondTapStarted = false;
    clearTimeout(doubleTapTimeout);
    dragStarted = false;
    pinchZoomStarted = false;
    currentTouches = e.touches;
};

var handleDrag = function (e) {
    clearTimeout(breakpoint);

    var el = document.getElementById("textarea");
    var text = el.value;
    text += "Drag\n";
    el.value = text;
    el.scrollTop = el.scrollHeight;

    breakpoint = setTimeout(function () {
            var el = document.getElementById("textarea");
            var text2 = el.value;
            text2 += "\n---\n\n";
            el.value = text2;
            el.scrollTop = el.scrollHeight;
        }, 1000);
};

var handleDoubleTap = function (e) {
    clearTimeout(breakpoint);

    var el = document.getElementById("textarea");
    var text = el.value;
    text += "Double Tap\n";
    el.value = text;
    el.scrollTop = el.scrollHeight;

    breakpoint = setTimeout(function () {
            var el = document.getElementById("textarea");
            var text = el.value;
            text += "\n---\n\n";
            el.value = text;
            el.scrollTop = el.scrollHeight;
        }, 1000);
};

var handlePinchZoom = function (e) {
    clearTimeout(breakpoint);

    var el = document.getElementById("textarea");
    var text = el.value;
    text += "Pinch Zoom\n";
    el.value = text;
    el.scrollTop = el.scrollHeight;

    breakpoint = setTimeout(function () {
            var el = document.getElementById("textarea");
            var text = el.value;
            text += "\n---\n\n";
            el.value = text;
            el.scrollTop = el.scrollHeight;
        }, 1000);
};

window.onload = function () {
    var el = document.getElementById("toucharea");
    el.addEventListener("touchstart", handleTouchStart, false);
    el.addEventListener("touchmove", handleTouchMove, false);
    el.addEventListener("touchend", handleTouchEnd, false);
    el.addEventListener("touchleave", handleTouchLeave, false);
}
