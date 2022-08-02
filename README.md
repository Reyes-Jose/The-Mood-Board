# A Breakdown of The Mood Board: A Place Where Your Music Matches Gets "The Vibe"

## Purpose of The Mood Board
This front-end application aims to connect a user's current emotion to a spotify playlist that matches calculated emotion. This is done using two API calls.

![Screenshot of The Mood Board Application](./Assets/images/start-page.png)

The first API call uses mood API. The user is asked to enter a sentence into the textbox on the application as seen here: ![Screenshot of Input used to Collect Data for First API Call](./Assets/images/mood-API.png)

Once the user clicks submit, this sentence is passed into the Mood API, which scores the sentence's emotion. We return the higest scoring emotion from this data and then pass this emotion in as a query parameter into our second API, spotify API.

Once this is done, the spotify API returns data that gives us access to a playlist ID. We concatenate this playlist ID at the end of the spotify link to generate a link. Once the functional link is generated, a "button" appears for the user to click to take them to the Spotify website to listen to their emotion Playlist, like so:

![Screenshot of Completed Call](./Assets/images/completed-call.ong.png)

This link is saved into local storage where a user can access it any time by clicking the brain icon in the navbar or by clicking "Past" in the navbar dropdown menu.

Finally, the user can also click on the heart icon, or click Future from the navbar dropdown menu to see the developer's next steps for the application.

## Link to The Mood Board:
[The Mood Board Web Application](url)