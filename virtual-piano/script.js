const COLLECTION = document.querySelectorAll(".piano-key"); 
const PIANO = document.getElementById("piano");
const LETTERS = document.querySelectorAll(".btn-letters");
const NOTES = document.querySelectorAll(".btn-notes");

const WHITE_KEYS = ['KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL'];
const SHARP_KEYS = ['KeyR', 'KeyT', '', 'KeyU', 'KeyI', 'KeyO'];
const whiteKey = document.querySelectorAll('.piano-key.white');
const sharpKey = document.querySelectorAll('.piano-key.sharp')

const FULL = document.querySelectorAll('.fullscreen');

FULL.forEach((item) => {
    item.addEventListener('click', (event) =>{
        if(!document.fullscreenElement){
            document.documentElement.requestFullscreen();
        }
        else {
            if(document.fullscreenEnabled) {
                document.exitFullscreen();
            }
        }
    })
}) 

    


LETTERS.forEach((item) => {
    item.addEventListener("click", (event) => {
        event.target.classList.add("btn-active");
        NOTES.forEach((i) => {
            i.classList.remove("btn-active");
        });
        COLLECTION.forEach((j) => {
            j.classList.add("piano-key-letter");
        });
        
    })
})

NOTES.forEach((item) => {
    item.addEventListener("click", (event) => {
        event.target.classList.add("btn-active");
        LETTERS.forEach((i) => {
            i.classList.remove("btn-active");
        });
        COLLECTION.forEach((j) => {
            j.classList.remove("piano-key-letter");
        });
        
    })
})

const satrtSound = (event) => {
    event.target.classList.add("piano-key-active");
    let note = document.getElementById(event.target.dataset.note);
        note.play();
    
    
}

const stopSound = (event) => {
    event.target.classList.remove("piano-key-active");
    

}



const startCorrespondOver = (event) => {
    if(event.target.classList.contains("piano-key")) {
        event.target.classList.add("piano-key-active");
        if(event.target.classList.contains("piano-key-active")) {
            let note = document.getElementById(event.target.dataset.note);
        note.currentTime = 0;
        note.play();
        note.addEventListener('ended', () => {
            key.classList.remove('piano-key-active');
            note.pause();
        })
        }
        

    }
    
    COLLECTION.forEach((item) => {
        item.addEventListener("mouseover", satrtSound);
        item.addEventListener("mouseout", stopSound);
    });
}
const stopCorrespondOver = () => {
   
    COLLECTION.forEach((item) => {
        item.classList.remove("piano-key-active");
        item.removeEventListener("mouseover", satrtSound);
        item.removeEventListener("mouseout", stopSound);
    })
}
 
PIANO.addEventListener('click', (event) => {
    if(event.target.classList.contains('piano-key')) {
        const note = event.target.dataset.note;
        startCorrespondOver();
    }
})

PIANO.addEventListener("mousedown", startCorrespondOver, false); 
PIANO.addEventListener("mouseup", stopCorrespondOver);
window.addEventListener("mouseup", stopCorrespondOver);

document.addEventListener('keydown', event => {
    if(event.repeat) return;
    const key = event.code;
    console.log(key);
    const whiteKeyIndex = WHITE_KEYS.indexOf(key);
    const sharpKeyIndex = SHARP_KEYS.indexOf(key);

    if (whiteKeyIndex > -1) playNota(whiteKey[whiteKeyIndex]);
    if (sharpKeyIndex > -1) playNota(sharpKey[sharpKeyIndex]);
})


function playNota(key) {
    const noteAudio = document.getElementById(key.dataset.note)
    noteAudio.currentTime = 0;
    noteAudio.play();
    key.classList.add('piano-key-active');
    noteAudio.addEventListener('ended', () => {
        key.classList.remove('piano-key-active');
    })
}

