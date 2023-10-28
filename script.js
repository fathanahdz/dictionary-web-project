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
                        <p>Synonyms</p>
                        <ul>
                            ${meaning.synonyms.slice(0, 3).map(synonym => `<li>${synonym}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="antonyms">
                        <p>Antonyms</p>
                        <ul>
                            ${meaning.antonyms.slice(0, 3).map(antonym => `<li>${antonym}</li>`).join('')}
                        </ul>
                    </div>
                </div>`)
                .slice(0, 3).join('')}`;
            sound.setAttribute("src", `${data[0].phonetics[1].audio}`);
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});
function playSound(){
    sound.play();
}