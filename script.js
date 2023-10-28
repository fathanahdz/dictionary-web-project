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
            result.innerHTML = `
                <div class="word">
                    <div class="detail">
                        <h1>${inpWord}</h1>
                        <button onclick="playSound()">
                            <img src="assets/sound.svg" alt="sound-icon">
                        </button>
                    </div>
                    <p>${data[0].phonetics}</p>
                </div>
                <div class="definition">
                    <div class="ver">
                        <b>${data[0].meanings[0].partOfSpeech}</b>
                        <p class="word-meaning">
                            ${data[0].meanings[0].definitions[0].definition} 
                        </p>
                        <p class="word-example">
                            ${data[0].meanings[0].definitions[0].example || ""}
                        </p>
                        <div class="synonyms">
                            <p>Synonyms</p>
                            <ul>
                                <li>${data[0].meanings[0].definitions[0].synonyms[0]}</li>
                                <li>${data[0].meanings[0].definitions[0].synonyms[1]}</li>
                                <li>${data[0].meanings[0].definitions[0].synonyms[2]}</li>
                            </ul>
                        </div>
                        <div class="antonyms">
                            <p>Antonyms</p>
                            <ul>
                                <li>${data[0].meanings[0].definitions[0].antonyms[0]}</li>
                                <li>${data[0].meanings[0].definitions[0].antonyms[0]}</li>
                                <li>${data[0].meanings[0].definitions[0].antonyms[0]}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="ver">
                    <b>${data[0].meanings[1].partOfSpeech}</b>
                    <p class="word-meaning">
                        ${data[0].meanings[1].definitions[0].definition}  
                    </p>
                    <p class="word-example">
                        ${data[0].meanings[1].definitions[0].example || ""}
                    </p>
                    <div class="synonyms">
                        <p>Synonyms</p>
                        <ul>
                            <li>${data[0].meanings[1].definitions[0].synonyms[0]}</li>
                            <li>${data[0].meanings[1].definitions[0].synonyms[0]}</li>
                            <li>${data[0].meanings[1].definitions[0].synonyms[0]}</li>
                        </ul>
                    </div>
                    <div class="antonyms">
                        <p>Antonyms</p>
                        <ul>
                            <li>${data[0].meanings[1].definitions[0].antonyms[0]}</li>
                            <li>${data[0].meanings[1].definitions[0].antonyms[0]}</li>
                            <li>${data[0].meanings[1].definitions[0].antonyms[0]}</li>
                        </ul>
                    </div>
                </div>
                <div class="ver">
                    <b>${data[0].meanings[2].partOfSpeech}</b>
                    <p class="word-meaning">
                        ${data[0].meanings[2].definitions[0].definition}  
                    </p>
                    <p class="word-example">
                        ${data[0].meanings[2].definitions[0].example || ""} 
                    </p>
                    <div class="synonyms">
                        <p>Synonyms</p>
                        <ul>
                            <li>${data[0].meanings[2].definitions[0].synonyms[0]}</li>
                            <li>${data[0].meanings[2].definitions[0].synonyms[0]}</li>
                            <li>${data[0].meanings[2].definitions[0].synonyms[0]}</li>
                        </ul>
                    </div>
                    <div class="antonyms">
                        <p>Antonyms</p>
                        <ul>
                            <li>${data[0].meanings[2].definitions[0].antonyms[0]}</li>
                            <li>${data[0].meanings[2].definitions[0].antonyms[0]}</li>
                            <li>${data[0].meanings[2].definitions[0].antonyms[0]}</li>
                        </ul>
                    </div>
                </div>
                </div>
               `;
            sound.setAttribute("src", `${data[0].phonetics[1].audio}`);
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});
function playSound(){
    sound.play();
}