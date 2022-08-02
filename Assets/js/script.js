$(document).ready(function () {
    var startPage = $(".start-container");
    var pastPage = $(".past-page");
    var futurePage = $(".future-page");
    var emotionForm1 = $("#emotion-form1");
    var pastDropdown = $(".past");
    var futureDropdown = $(".future");
    var refreshBtn = $(".refresh");
    var playlistLink = $("#hide");
    var brainIcon = $('#beat1');
    var heartIcon = $('#beat2');

    let results = {};
    let playlistId = "";
    let userSentence1 = "";

   

    function searchEmotion(event) {
        event.preventDefault();
        userSentence1 = $("#user-sentence1").val();
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
            .then((data) => {

                //console.log(data.sentence)
                //localStorage.setItem('results', JSON.stringify(data.sentence));
                results = data.sentence
                var topEmotion = "noemo";
                for (let key in results) {
                    if (results[key] > Number(results[topEmotion])) {
                        topEmotion = key;
                    }
                }
                console.log(topEmotion);
                searchSpotify(topEmotion);
            
            })
        
        
    }   

    function searchSpotify(emotion) {

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '0a94bcc8f9msh196fd34b25fece6p19d338jsn0a9545969f74',
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        };

        fetch(`https://spotify23.p.rapidapi.com/search/?q=${emotion}&type=playlists&offset=0&limit=10&numberOfTopResults=5`, options)
            .then((response) => response.json())
            .then((data) => {
                console.log('data', data);
                playlistId = data.playlists.items[0].data.uri.split(":")[2];
                
                console.log('local playlistId', playlistId);

                playlistLink.css('display', 'flex').attr({
                    href: 'https://open.spotify.com/playlist/' + playlistId, 
                    target: '_blank',
                })
    
                
            })
            
            
            //.catch(err => console.error(err));
    }
    console.log('global playlistId', playlistId);

    function displayPast() {
        startPage.css('display', 'none');
        pastPage.css('display', 'flex');
        futurePage.css('display', 'none');
    }
    function displayFuture() {
        startPage.css('display', 'none');
        pastPage.css('display', 'none');
        futurePage.css('display', 'flex');

        futurePage.addClass('is-flex is-flex-direction-column');
    }

    emotionForm1.on('submit', searchEmotion);
    //btnContainer.on("click", userDecision);


    pastDropdown.on('click', displayPast);
    brainIcon.on('click', displayPast);
    futureDropdown.on('click', displayFuture);
    heartIcon.on('click', displayFuture);

    refreshBtn.on('click', function () {
        location.reload();
    })


    //on hover icons "beat"
    brainIcon.on('mouseover', function () {
        var iconAnimation = $('#beat1');
        iconAnimation.addClass('fa-beat');

    });
    brainIcon.on('mouseout', function () {
        var iconAnimation = $('#beat1');
        iconAnimation.removeClass('fa-beat');

    });
    heartIcon.on('mouseover', function () {
        var iconAnimation = $('#beat2');
        iconAnimation.addClass('fa-beat');

    });
    heartIcon.on('mouseout', function () {
        var iconAnimation = $('#beat2');
        iconAnimation.removeClass('fa-beat');

    });


})
    // function userDecision(event) {

    //     var userChoice = $(event.target)
    //     //console.log($(userChoice).html());
    //     if ($(userChoice).html() === 'Yes') {
    //         var pEl = $('<p>').text('How would you like to feel?');
    //         var form2 = $('<form>').addClass('emotion-form2');
    //         var label2 = $('<label>').attr('for', 'user-sentence2');
    //         var input2 = $('<input>').attr({
    //             type: 'text',
    //             placeholder: 'How would you like to feel?',
    //             class: 'input is-large',
    //             id: 'user-sentence2',
    //         });

    //         var button2 = $('<button>').addClass('button is-medium').text('Submit').attr({
    //             type: 'submit',
    //             id: 'button-submit',
    //         })


    //         form2Container.append(pEl);
    //         form2Container.append(form2);
    //         form2.append(label2);
    //         label2.append(input2);
    //         form2.append(button2);


    //     } else {
    //         displayPlaylistLink();
    //     }
    // }


    // function getPlaylistId(playlistId) {
    //     const options = {
    //         method: 'GET',
    //         headers: {
    //             'X-RapidAPI-Key': '0a94bcc8f9msh196fd34b25fece6p19d338jsn0a9545969f74',
    //             'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    //         }
    //     };
    
    //     fetch('https://spotify23.p.rapidapi.com/playlist_tracks/?id=' + playlistId + '&offset=0&limit=100', options)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data)
    //             // for (var i = 0; i < data.length; i++) {
    //             //     const element = array[index];
                    
    //             // }
    //             // var songName = data.items[i].track.songName
    //             // var songUrl = data.items[i].track.preview_url
    //         })
    //         .catch(err => console.error(err));
    // }