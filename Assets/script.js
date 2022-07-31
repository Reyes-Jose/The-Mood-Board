$(document).ready(function () {

    
    // var userSentence = $("#user-sentence").val();
    var emotionForm = $("#emotion-form");
    
    function searchEmotion(event) {
        event.preventDefault();
        var userSentence = $("#user-sentence").val();
        console.log(userSentence);
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '0a94bcc8f9msh196fd34b25fece6p19d338jsn0a9545969f74',
                'X-RapidAPI-Host': 'emodex-emotions-analysis.p.rapidapi.com'
            },
            body: `{ "sentence": ${JSON.stringify(userSentence)} }`
        };
        
        fetch('https://emodex-emotions-analysis.p.rapidapi.com/rapidapi/emotions', options)
        .then(response => response.json())
        .then(response =>
            console.log(response)
            // loop thru the response values to find highest emotion value
            // if ()
            // searchSpotify(emotionResponse);
            
            )
            .catch(err => console.error(err));
            
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
        emotionForm.on('submit', searchEmotion);
    })
    
    //on hover icons "beat"
    $('#beat1').on('mouseover',function(){
        var iconAnimation = $('#beat1');
        iconAnimation.addClass('fa-beat');
        
    });
    $('#beat1').on('mouseout',function(){
        var iconAnimation = $('#beat1');
        iconAnimation.removeClass('fa-beat');
        
    });
    $('#beat2').on('mouseover',function(){
        var iconAnimation = $('#beat2');
        iconAnimation.addClass('fa-beat');
        
    });
    $('#beat2').on('mouseout',function(){
        var iconAnimation = $('#beat2');
        iconAnimation.removeClass('fa-beat');
        
    });