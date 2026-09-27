/*
=================================================
       BIRTHDAY WEBSITE SETTINGS
=================================================
*/

// यहां नाम बदलें

const personName = "JAYA";


// यहां Birthday की तारीख बदलें
// Format: YYYY-MM-DD

const birthdayDate = "2026-09-30";



/*
=================================================
       WEBSITE DATA
=================================================
*/


const quotes = [

    "कुछ लोग जिंदगी में आते नहीं, बल्कि जिंदगी को खूबसूरत बना जाते हैं।",

    "दुआ है तुम्हारी हर सुबह मुस्कान से शुरू हो और हर रात सुकून पर खत्म हो।",

    "तुम्हारे हिस्से में इतनी खुशियाँ आएँ कि पुराने सारे ग़म छोटे लगने लगें।",

    "जिंदगी तुम्हें हर वह खुशी दे, जिसकी तुमने कभी चुपचाप ख्वाहिश की हो।",

    "कुछ रिश्ते शब्दों से नहीं, एहसासों से खूबसूरत होते हैं।",

    "तुम्हारा आने वाला हर साल तुम्हारे पिछले साल से ज्यादा खूबसूरत हो।"

];



/*
=================================================
       NAME SHOW
=================================================
*/

document.getElementById("name").innerText =
    personName;



/*
=================================================
       RANDOM QUOTE
=================================================
*/

const randomQuote =
    quotes[
        Math.floor(
            Math.random() * quotes.length
        )
    ];


document.getElementById("quote").innerText =
    randomQuote;



/*
=================================================
       COUNTDOWN
=================================================
*/

function updateCountdown() {

    const birthday =
        new Date(
            birthdayDate + "T00:00:00"
        );

    const now =
        new Date();


    let difference =
        birthday - now;


    /*
    Birthday आने पर
    */

    if (difference <= 0) {

        difference =
            0;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference %
            (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (difference %
            (1000 * 60 * 60))
            /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (difference %
            (1000 * 60))
            /
            1000
        );


    document.getElementById("days")
        .innerText =
        String(days).padStart(2,"0");


    document.getElementById("hours")
        .innerText =
        String(hours).padStart(2,"0");


    document.getElementById("minutes")
        .innerText =
        String(minutes).padStart(2,"0");


    document.getElementById("seconds")
        .innerText =
        String(seconds).padStart(2,"0");
}


setInterval(
    updateCountdown,
    1000
);


updateCountdown();



/*
=================================================
       SURPRISE
=================================================
*/

function showSurprise() {

    const surprise =
        document.getElementById(
            "surprise"
        );

    surprise.style.display =
        "block";

    createConfetti();

    playCelebrationSound();

    // Birthday Music
    const music =
        document.getElementById(
            "birthdayMusic"
        );

    music.currentTime = 0;

    music.volume = 0.7;

    music.play();

}



/*
=================================================
       CONFETTI
=================================================
*/

function createConfetti() {

    const container =
        document.getElementById(
            "confetti"
        );


    container.innerHTML = "";


    for (
        let i = 0;
        i < 120;
        i++
    ) {

        const piece =
            document.createElement(
                "div"
            );


        piece.classList.add(
            "confetti-piece"
        );


        piece.style.left =
            Math.random() * 100 + "%";


        piece.style.top =
            "-20px";


        piece.style.background =
            getRandomColor();


        piece.style.animationDuration =
            (3 + Math.random() * 4)
            + "s";


        piece.style.animationDelay =
            Math.random() * 1.5
            + "s";


        container.appendChild(
            piece
        );
    }
}



function getRandomColor() {

    const colors = [

        "#ff4d91",
        "#ffd166",
        "#ffffff",
        "#9a6cff",
        "#ff9fba",
        "#74d7ff"

    ];


    return colors[
        Math.floor(
            Math.random() *
            colors.length
        )
    ];
}



/*
=================================================
       SIMPLE BIRTHDAY SOUND
=================================================
*/

function playCelebrationSound() {

    try {

        const audio =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();


        const notes = [
            523.25,
            659.25,
            783.99,
            1046.50
        ];


        notes.forEach(
            (frequency,index) => {

                const oscillator =
                    audio.createOscillator();


                const gain =
                    audio.createGain();


                oscillator.frequency.value =
                    frequency;


                oscillator.type =
                    "sine";


                oscillator.connect(gain);

                gain.connect(
                    audio.destination
                );


                const start =
                    audio.currentTime +
                    index * .15;


                gain.gain.setValueAtTime(
                    0,
                    start
                );


                gain.gain.linearRampToValueAtTime(
                    .08,
                    start + .03
                );


                gain.gain.exponentialRampToValueAtTime(
                    .001,
                    start + .7
                );


                oscillator.start(start);

                oscillator.stop(
                    start + .75
                );

            }
        );

    }

    catch(error) {

        console.log(
            "Audio not available"
        );

    }
}