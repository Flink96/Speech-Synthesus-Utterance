
const dropdown = document.querySelector('#voices');
const stopBtn = document.querySelector('#stop');
const speakBtn = document.querySelector('#speak');
const textArea = document.querySelector('[name="text"]');
const options = document.querySelectorAll('[type="range"]');

let speech = new SpeechSynthesisUtterance();
console.log('asas',speech);

let voices=[];
voices=speechSynthesis.getVoices();
speech.text=textArea.value;

function renderDropdown() {
    voices = speechSynthesis.getVoices();
    dropdown.innerHTML += voices.map((voice)=> {
        return `<option value="${voice.name}">
        ${voice.name} ${voice.lang} </option>`
    }).join('');
}

function startSpeak() {
    speechSynthesis.cancel();
    speech.text=textArea.value;
    speechSynthesis.speak(speech);
}
function stopSpeak() {
    speechSynthesis.cancel();
}

speechSynthesis.addEventListener('voiceschanged', renderDropdown);

dropdown.addEventListener('change', setVoice);

function setVoice() {
    speech.voice = voices.find(voice => voice.name === this.value);
    console.log('change', speech);
}
function setParams() {
    speech[this.name]= this.value;
    startSpeak();
}

speakBtn.addEventListener('click', startSpeak);
stopBtn.addEventListener('click',stopSpeak);
options.forEach(range=>range.addEventListener('change',setParams));

