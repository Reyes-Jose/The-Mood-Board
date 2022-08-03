//will only run once the page is fully loaded
$(document).ready(function () {
    //declaring variables
    var startPage = $(".start-container");
    var pastPage = $(".past-page");
    var ulContainer = $("#list-container")
    var futurePage = $(".future-page");
    var emotionForm1 = $("#emotion-form1");
    var pastDropdown = $(".past");
    var futureDropdown = $(".future");
    var refreshBtn = $(".refresh");
    var playlistLink = $("#hide");
    var brainIcon = $('#beat1');
    var heartIcon = $('#beat2');

    var results = {};
    var playlistId = "";
    var userSentence1 = "";
    var savedPlaylists = [];


   
    //takes user submitted "feelings" sentence and returns the highest scoring emotion and passes that emotion as a parameter in the next function/API call
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
// Resource: EmoDex Emotions Analysis API by KarstenT: https://rapidapi.com/KarstenT/api/emodex-emotions-analysis/
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

    //takes the top Emotion in the first mood API call and passes it in as a query parameter to the spotifyAPI call to get a playlist link that reflects the users current emotion
    function searchSpotify(emotion) {

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '0a94bcc8f9msh196fd34b25fece6p19d338jsn0a9545969f74',
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        };
// Resource: Spotify by Glavier: https://rapidapi.com/Glavier/api/spotify23/
        fetch(`https://spotify23.p.rapidapi.com/search/?q=${emotion}&type=playlists&offset=0&limit=10&numberOfTopResults=5`, options)
            .then((response) => response.json())
            .then((data) => {
                console.log('data', data);
                playlistId = data.playlists.items[0].data.uri.split(":")[2];
                
                console.log('local playlistId', playlistId);

                var fullLink = 'https://open.spotify.com/playlist/' + playlistId;
                var playlistDate = moment().format('MMMM Do YYYY, h:mm:ss a');
                var playlistInfo = "On " + playlistDate + " you were recommended: " + fullLink;
                console.log("playlistInfo", playlistInfo);
                savedPlaylists = JSON.parse(localStorage.getItem("savedPlaylists")) || [];
                savedPlaylists.push(playlistInfo);
                console.log("savedPlaylists", savedPlaylists);
                

                
                localStorage.setItem("savedPlaylists", JSON.stringify(savedPlaylists));

                
                playlistLink.css('display', 'flex').attr({
                    href: 'https://open.spotify.com/playlist/' + playlistId, 
                    target: '_blank',
                })
                
                
            })
            
            
            .catch(err => console.error(err));
        }
        
        console.log('savedPlaylists', savedPlaylists);

    function renderSavedPlaylists() {
        var getPlaylists = JSON.parse(localStorage.getItem("savedPlaylists"));
        if (getPlaylists !== null) {
            savedPlaylists = getPlaylists;
        }

        for (var i = 0; i < savedPlaylists.length; i++) {
            var storedPlaylists = savedPlaylists[i];

            var liEl = $('<li>');  
            liEl.text(storedPlaylists);

            ulContainer.append(liEl);
        
        }

    }

    //display past or future page when access them from dropdown menu or clicking on icons
    function displayPast() {
        startPage.css('display', 'none');
        pastPage.css('display', 'flex').addClass('has-text-centered is-flex-direction-column');
        futurePage.css('display', 'none');

        renderSavedPlaylists();

    }
    function displayFuture() {
        startPage.css('display', 'none');
        pastPage.css('display', 'none');
        futurePage.css('display', 'flex');

        futurePage.addClass('is-flex is-flex-direction-column');
    }

    //Listener on user entering current feeling
    emotionForm1.on('submit', searchEmotion);
    
    //Either access past/future pages through dropdown menu or brain/heart icons
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

//for future development:
//Ask user if they want to feel an emotion other than how they are feeling and generate a playlist based on that
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
        //btnContainer.on("click", userDecision);
        
        //iterate over a 3rd api call to get a snippet of the song onto the webpage and songname
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