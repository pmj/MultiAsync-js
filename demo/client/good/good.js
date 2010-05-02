var running = false;
var done = false;

function green(sel) {
    var what = $(sel);
    return function () { what.addClass("done"); };
}

function demo() {
    var h_012 = new AsyncHandler();
    var h_234 = new AsyncHandler();
        
    $.get(
        "/wait/?time=1.5",
        h_012.cb(green("#0")));
    $.get("/wait/?time=5", h_012.cb(green("#1")));
    $.get(
        "/wait/?time=3",
        h_012.cb(
            h_234.cb(
                green("#2"))));
    $.get("/wait/?time=1", h_234.cb(green("#3")));
    $.get("/wait/?time=2", h_234.cb(green("#4")));

    var h_all = new AsyncHandler();
    
    h_012.whenDone(h_all.cb(green("#012")));
    h_234.whenDone(h_all.cb(green("#234")));
    
    h_all.whenDone(green("#01234"));
}

function startResetDemo() {
    if (running)
    {
        jQuery(".e").removeClass("done");
        running = false;
        $("#start").attr("value", "start");
    }
    else
    {
        demo();
        running = true;
        $("#start").attr("value", "reset");
    }
}

jQuery("#start").click(startResetDemo);