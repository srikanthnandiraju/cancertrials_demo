Path.map("#/home").to(function() {
    $("#stage").load("screens/dashboard.html");
});
Path.map("#/charts").to(function() {
    $("#stage").load("screens/charts.html");
});
Path.map("#/mas").to(function() {
    $("#stage").load("screens/mas.html");
});
Path.map("#/table").to(function() {
    $("#stage").load("screens/table.html");
});
Path.map("#/search").to(function() {
    $("#stage").load("screens/search.html");
});
Path.map("#/timeline").to(function() {
    $("#stage").load("screens/vtimeline.html");
});
Path.map("#/login").to(function() {
    App.FullScreen.showScreen("screens/login.html");
});

Path.map("#/search").to(function() {
    //App.FullScreen.showScreen("screens/search.html");
    $("#stage").load("screens/search.html");
});

Path.map("#/savedtrials").to(function() {
    $("#stage").load("screens/savedtrials.html");
});

Path.map("#/trial/:id").to(function() {
    Trials.selectedTrial = this.params['id'];
    $("#stage").load("screens/trialdetails.html");
});

Path.map("#/comments").to(function() {
    //Trials.selectedTrial = this.params['id'];
    $("#stage").load("screens/comments.html");
});

Path.map("#/comments/:trialid").to(function() {
    Trials.selectedTrial = this.params['trialid'];
    $("#stage").load("screens/comments.html");
});

// Path.root("#/home");
Path.root("#/search");
Path.listen();