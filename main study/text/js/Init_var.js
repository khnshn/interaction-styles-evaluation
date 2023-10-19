// within this function the (random) sequence of the questions is initialized and the index is set to zero
(function() {

    // request getting local storage permission
    var permissionRequests = ["http://tizen.org/privilege/externalstorage"];
    for (var i = 0; i < permissionRequests.length; i++) {
        var result = tizen.ppm.checkPermission(permissionRequests[i]);
        switch (result) {
            case "PPM_ALLOW":
                console.log("allowed");
                break;
            case "PPM_DENY":
                console.log("denied");
                break;
            case "PPM_ASK":
                console.log("asked");
                tizen.ppm.requestPermission(permissionRequests[i], permissionSuccess, errorCallback);
                break;
        }
    }

    // function to run when there is no local storage permission on the watch 
    function errorCallback() {}

    // function to run when there is local storage permission on the watch
    function permissionSuccess() {
            init();
        }
        // after first loop where permission is give, still inite the programme
    init();

    function init() {
        localStorage.clear(); // clear localStorage when there are still attributes

        var index = 0; // set index to zero
        localStorage.setItem("index", index); // save the index number to local storage
        var indexTimer = 0; // indexTimer starts at zero
        localStorage.setItem("indexTimer", indexTimer); // save the index number to local storage
        var questionsList = [ // length should be a multiple of interactionsToUse.length
            "1,Can you insert the number 5?",
            "2,How many fingers do you have on your right hand?",
            "3,2021 is how many year ago?",
            "4,2 + 6 = ?",
            "5,3 - 2 = ?",
            "6,1 + 6 = ?",
            "7,How many toes do you have on your left foot?",
            "8,Can you insert the number 7?",
            "9,Can you insert the number 10?",
            "10,Can you insert the number 8?",
            "11,Can you insert the number 3?",
            "12,3 + 6 = ?",
            "13,1 + 1 = ?",
            "14,How many thumbs do you have?",
            "15,Can you insert number 2?",
        ];

        // all of the interactions to be used
        var interactionsToUse = [
                        "BezelRotation",
                        "MS-tapping",
                        "Swiping",
                        "V-Button",
                        "LL-Tapping"
        ];

        // set all the attributes in the interactionList with has the same length as the questions
        var interactionList = []; // make interactionList variable
        for (var j = 0; j < (questionsList.length / (interactionsToUse.length)); j++) { // loop  as many times as questions to use divided by the amount of interactions
            for (var z = 0; z < interactionsToUse.length; z++) {
                var a = interactionsToUse.length * j; // variable to count how many loops done
                interactionList[z + a] = interactionsToUse[z]; // add new interactions to list as array attributes
            }
            // console.log(interactionList);
        }

        // shuffle both the list of the questions and interactionStyles  
        shuffleAttributes(questionsList);
        shuffleAttributes(interactionList);

        // make the newSequence variable
        var newSequence = "";

        // loop to add the objects to the newSequence
        for (var b = 0; b < questionsList.length; b++) {
            newSequence += questionsList[b] + "," + interactionList[b] + ";";
        }
        localStorage.setItem("sequence", newSequence); // save the index number to local storage with name "sequence"
        localStorage.setItem("indexMax", questionsList.length); // save the number of questions in the "sequence"

        startNewDocument(); // make a new document at the beginning of the test
    }

    // function to write to tje local file
    function writeToFile(fileName, content, mode) {
        var fileHandleWrite = tizen.filesystem.openFile("documents/" + fileName, mode);
        console.log("File opened for writing");
        fileHandleWrite.writeString(content);
        fileHandleWrite.close();
        console.log("File closed for writing");
    }

    // Function to shuffle the sequence
    function shuffleAttributes(attribute) {
        for (var i = attribute.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = attribute[i];
            attribute[i] = attribute[j];
            attribute[j] = temp;
        }
    }

    // function to create a new local file for a new participant
    function startNewDocument() {
        var beginD = new Date().toString(); // get current time
        var beginEval = beginD.replace(/:/g, "");
        localStorage.setItem("part_name", beginEval); // save the index number to local storage
        writeToFile(beginEval, "aaa", "w"); //(fileName, content, mode is always "w" at the beginning)
        console.log(beginEval);
    }
}());