var Trials = {
    baseURL: "https://clinicaltrialsapi.cancer.gov/v1/clinical-trials",
    fetchTrialURL: "http://nandiraju.com/CLIENTS/cancer/get_study_by_id.php?id=",
    cachedStudies: [],
    searchFilter: "",
    searchResults: {},
    pageSize: 10,
    pagePointer: 0,
    selectedTrialId: "",
    selectedTrialIdDetails: "",
    search: function(filter, _cb) {
        var parentPointer = this;
        this.pagePointer = 0; // reset page pointer
        this.searchFilter = filter;
        $.getJSON(this.baseURL, this.searchFilter, function(result) {
            parentPointer.searchResults = result;
            _cb(result);
        });
    },
    getNext: function(_cb) {
        this.pagePointer = this.pagePointer + this.pageSize;
        if (this.pagePointer > this.searchResults.total) {
            alert("No more data");
            return;
        }
        var parentPointer = this;
        // this.searchFilter.from = this.pagePointer;
        $.getJSON(this.baseURL, this.searchFilter + "&from=" + this.pagePointer, function(result) {
            parentPointer.searchResults = result;
            _cb(result);
        });
    },
    fetchDetails: function(filter, _cb) {
        var url = this.baseURL + "?" + filter;
        // https://clinicaltrialsapi.cancer.gov/v1/clinical-trials?nci_id=NCI-2015-00054
        console.log(url);
        var parentPointer = this;
        $.getJSON(url, function(result) {
            _cb(result);
        });
    },
    fetchStudyJSON: function(study_id, _cb) {
        if (Trials.cachedStudies[study_id] != undefined) {
            console.log("Cached study ");
            var cached_object = Trials.cachedStudies[study_id];
            _cb(cached_object);
        } else {
            console.log("Fresh fetch ");
            $.get(Trials.fetchTrialURL + study_id, function(data) {
                var xmlDoc = $.parseXML(data);
                var x2js = new X2JS();
                var jsonObj = x2js.xml2json(data);
                Trials.cachedStudies[study_id] = jsonObj;
                _cb(jsonObj);
            });
        }
    },
    saveTrial: function(trial) {
        var jsonSavedTrials = this.getSavedTrials();
        // remove existing id
        jsonSavedTrials = _.reject(jsonSavedTrials, function(o) {
            return o.nctid == trial.nctid;
        });
        jsonSavedTrials.push(trial);
        // save updated list
        localStorage.setItem("SAVED_TRIALS", JSON.stringify(jsonSavedTrials));
    },
    deleteSavedTrial: function(nctid) {
        var jsonSavedTrials = this.getSavedTrials();
        jsonSavedTrials = _.reject(jsonSavedTrials, function(o) {
            return o.nctid == nctid;
        });
        // save updated list
        localStorage.setItem("SAVED_TRIALS", JSON.stringify(jsonSavedTrials));
    },
    getSavedTrials: function() {
        var localSavedTrials = localStorage.getItem("SAVED_TRIALS");
        var jsObject = [];
        if (localSavedTrials != undefined) {
            jsObject = JSON.parse(localSavedTrials);
        }
        return jsObject;
    }
};