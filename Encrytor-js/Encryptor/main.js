const screenOutput = document.querySelector(".text-result");
const contResult = document.querySelector(".container-result");
const textResult = document.querySelector(".text-result");
const textDefault = document.querySelector(".text-output")
const btnEncrypt = document.querySelector(".btn-encrypt");
const btnDecrypt = document.querySelector(".btn-decrypt");



btnEncrypt.addEventListener('click', function encrypt() {

    hideText();
    const textBox = recoverText();
    textResult.textContent = encryptText(textBox);
    
})

btnDecrypt.addEventListener('click', function decrypt() {
    
    hideText();
    const textBox = recoverText();
    textResult.textContent = decryptText(textBox);
    
})

function recoverText() {
    const textBox = document.querySelector(".text");
    return textBox.value
}

function hideText(){
    textDefault.classList.add('hide');
}

function encryptText(m) {
    let text = m;
    let textFinal = "";

    for (let i = 0; i < text.length; i++) {
        
        if (text[i] == "a") {
            textFinal = textFinal + "ai";
        }else if (text[i] == "e") {
            textFinal = textFinal + "enter";
        }else if (text[i] == "i") {
            textFinal = textFinal + "imes";
        }else if (text[i] == "o") {
            textFinal = textFinal + "ober";
        }else if (text[i] == "u") {
            textFinal = textFinal + "ufat";
        }else{
            textFinal = textFinal + text[i];
        }

    }
    return textFinal;    
}
 
function decryptText(m) {
    let text = m;
    let textFinal = "";

    for (let i = 0; i < text.length; i++) {
        
        if (text[i] == "a") {
            textFinal = textFinal + "a";
            i = i+1
        }else if (text[i] == "e") {
            textFinal = textFinal + "e";
            i = i+4
        }else if (text[i] == "i") {
            textFinal = textFinal + "i";
            i = i+3
        }else if (text[i] == "o") {
            textFinal = textFinal + "o";
            i = i+3
        }else if (text[i] == "u") {
            textFinal = textFinal + "u";
            i = i+3
        }else {
            textFinal = textFinal + text[i];
        }

    }
    return textFinal;    
}

const btnCopy = document.querySelector(".btn-copy");
    btnCopy.addEventListener("click", copy = () => {
        const content = document.querySelector(".text-result").textContent;
        navigator.clipboard.writeText(content)

    })
