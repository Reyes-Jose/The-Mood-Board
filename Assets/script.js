$(document).ready(function () {
    var startPage = $(".start-container");
    var feelingsPage = $(".feelings-page");
    var playlistPage = $(".playlists-page");
    var pastPage = $(".past-page");
    var futurePage = $(".future-page");
    var emotionForm1 = $("#emotion-form1");
    var btnContainer = $(".btn-container");
    var form2Container = $(".form2-container");
    var pastDropdown = $(".past");
    var futureDropdown = $(".future");
    var refreshBtn = $(".refresh");



    function searchEmotion(event) {
        event.preventDefault();
        var userSentence1 = $("#user-sentence1").val();
        console.log(userSentence1);
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '0a94bcc8f9msh196fd34b25fece6p19d338jsn0a9545969f74',
                'X-RapidAPI-Host': 'emodex-emotions-analysis.p.rapidapi.com'
            },
            body: `{ "sentence": ${JSON.stringify(userSentence1)} }`
        };

        fetch('https://emodex-emotions-analysis.p.rapidapi.com/rapidapi/emotions', options)
            .then((response) => response.json())
            .then((response) =>
                console.log(response.sentence));
        // console.log('response.sentence', response.sentence);
        const {
            anger,
            disgust,
            fear,
            joy,
            love,
            noemo,
            sadness,
            surprise
        } = response;

        console.log(anger);
        // Object.entries(sentence).forEach(([key, value]) => {
        //     console.log(`${key} ${value}`);
        // });
        // Object.values(response.sentence).forEach(values => {
        //     console.log(values, response.sentence[values]);
        // });

        // print all keys

        // console.log(keys);

        // keys.forEach((key, index)) => {
        //     console.log(`${key}: ${response[key]}`);
        // };

        // searchSpotify(emotionResponse);

        // )
        // .catch(err => console.error(err));
        displayFeelings();
    }

    function displayFeelings() {
        feelingsPage.css('display', 'flex');
        startPage.css('display', 'none');
        playlistPage.css('display', 'none');
        pastPage.css('display', 'none');
        futurePage.css('display', 'none');
    }

    function userDecision(event) {
        var userChoice = $(event.target)
        console.log($(userChoice).html());
        if ($(userChoice).html() === 'Yes') {
            var pEl = $('<p>').text('How would you like to feel?');
            var form2 = $('<form>').addClass('emotion-form2');
            var label2 = $('<label>').attr('for', 'user-sentence2');
            var input2 = $('<input>').attr({
                type: 'text',
                placeholder: 'How would you like to feel?',
                class: 'input is-large',
                id: 'user-sentence2',
            });

            var button2 = $('<button>').addClass('button is-medium').text('Submit').attr({
                type: 'submit',
                id: 'button-submit',
            })


            form2Container.append(pEl);
            form2Container.append(form2);
            form2.append(label2);
            label2.append(input2);
            form2.append(button2);


        }
    }

    function displayPast() {
            startPage.css('display', 'none');
            feelingsPage.css('display', 'none');
            playlistPage.css('display', 'none');
            pastPage.css('display', 'flex');
            futurePage.css('display', 'none');
        }
    function displayFuture() {
        startPage.css('display', 'none');
        feelingsPage.css('display', 'none');
        playlistPage.css('display', 'none');
        pastPage.css('display', 'none');
        futurePage.css('display', 'flex'); 
    }

    // function searchSpotify(emotion) {

    //     const options = {
    //         method: 'GET',
    //         headers: {
    //             'X-RapidAPI-Key': '0a94bcc8f9msh196fd34b25fece6p19d338jsn0a9545969f74',
    //             'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    //         }
    //     };

    //     fetch(`https://spotify23.p.rapidapi.com/search/?q=${emotion}&type=multi&offset=0&limit=10&numberOfTopResults=5`, options)
    //         .then(response => response.json())
    //         .then(response => {
    //             console.log(response);
    //             // document.getElementById
    //         }

    //         )
    //         .catch(err => console.error(err));
    // }

    // emotionForm.on('submit', function (event) {
    //     event.preventDefault();
    //     console.log("hello");
    // });
    pastDropdown.on('click', displayPast);
    futureDropdown.on('click', displayFuture);
    refreshBtn.on('click', function(){
        location.reload();
    })

    emotionForm1.on('submit', searchEmotion);

    //on hover icons "beat"
    $('#beat1').on('mouseover', function () {
        var iconAnimation = $('#beat1');
        iconAnimation.addClass('fa-beat');

    });
    $('#beat1').on('mouseout', function () {
        var iconAnimation = $('#beat1');
        iconAnimation.removeClass('fa-beat');

    });
    $('#beat2').on('mouseover', function () {
        var iconAnimation = $('#beat2');
        iconAnimation.addClass('fa-beat');

    });
    $('#beat2').on('mouseout', function () {
        var iconAnimation = $('#beat2');
        iconAnimation.removeClass('fa-beat');

    });

    btnContainer.on("click", userDecision);



})