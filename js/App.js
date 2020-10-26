var App = {};
// Global Event handler
App.Events = {
    emit: function(event_name, event_payload) {
        console.log("PUBED");
        $('body').trigger(event_name, event_payload);
    },
    listen: function(event_name, callback) {
        $('body').bind(event_name, function(e, data) {
            callback(data);
        });
    }
};

App.SideBarController = {
    toggleNav: function() {
        $(".side-wrapper").toggleClass("hide-side-bar");
        $(".main-wrapper").toggleClass("expand-main-wrapper");
        $(".stage").toggleClass("stage-padded");
    }
};

App.FullScreen = {
    show: function() {
        $('#fullscreenElement').addClass('open');
    },
    hide: function() {
        $('#fullscreenElement').removeClass('open');
    },
    showScreen: function(screenurl) {
        $("#fullscreen_stage").load(screenurl);
        App.FullScreen.show();
    },
};

App.Events.listen("hide-side-nav", function() {
    App.MenuController.hideSideNav();
});
App.Events.listen("show-side-nav", function() {
    App.MenuController.showSideNav();
});

App.init = function() {
    NProgress.configure({
        showSpinner: false
    });

    $(document).ajaxStart(function() {
        NProgress.start();
    });

    $(document).ajaxStop(function() {
        NProgress.done();
    });

    $('.close').on('click', function(event) {
        $('#fullscreenElement').removeClass('open');
    });

    App.SideBarController.toggleNav();
    $("#side-nav").on("click", function(e) {
        e.preventDefault();
        App.SideBarController.toggleNav();
    });

    $('#full-screen').click(function() {
        $(document).toggleFullScreen();
        return false;
    });

    $(".ui.dropdown").dropdown({
        allowCategorySelection: true,
        transition: "fade up",
        on: "hover"
    });

    $('.ui.accordion').accordion({
        exclusive: false,
        selector: {}
    });

};