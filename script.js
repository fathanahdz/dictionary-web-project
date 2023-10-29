const url ="https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("word-input").value;
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (Array.isArray(data)&& data.length>0){
                const wordData = data[0];
            }
            result.innerHTML = `
                <div class="word">
                    <div class="detail">
                        <h1>${inpWord}</h1>
                        <div class="sound">
                        ${data[0].phonetics[0].audio && data[0].phonetics[0].audio.length>0
                            ?
                           ` <button onclick="playSound()" id="sound-button">
                                    <img src="assets/sound.svg" alt="sound-icon" id="sound-icon">
                            </button>`:""
                        }
                        </div>
                    </div>
                    <p>${data[0].phonetic}</p>
                </div>
                <div class="definition">
                    ${data[0].meanings.map((meaning, index) => `
                    <div class="ver">
                        <b>${meaning.partOfSpeech}</b>
                        <p class="word-meaning">
                            ${meaning.definitions[0].definition}
                        </p>
                        <p class="word-example">
                            ${meaning.definitions[0].example || ""}
                        </p>
                    <div class="synonyms">
                        ${meaning.synonyms && meaning.synonyms.length>0
                        ? `<p>Synonyms</p>
                            <ul>
                                ${meaning.synonyms.slice(0,3).map(synonym => 
                                    `<li>${synonym}</li>`).join('')}
                            </ul>`
                        : "" }
                    </div>
                    <div class="antonyms">
                        ${meaning.antonyms && meaning.antonyms.length>0
                        ? `<p>Antonyms</p>
                            <ul>
                                ${meaning.antonyms.slice(0,3).map(antonym => 
                                    `<li>${antonym}</li>`).join('')}
                            </ul>`
                        : "" }
                    </div>
                </div>`)
                .join('')}`;
            sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});
function playSound(){
    sound.play();
    // Change the sound icon to "sound-active.svg" when the audio starts playing
    const soundIcon = document.getElementById("sound-icon");
    soundIcon.src = "assets/sound-active.svg";

    // Add an event listener to change the sound icon back to the original icon when the audio finishes playing
    sound.addEventListener("ended", () => {
        soundIcon.src = "assets/sound.svg";
    });

}