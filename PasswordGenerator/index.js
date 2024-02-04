console.log('hello');
const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-=+{}[];:",<>./?';

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
console.log('hello');
// set strnegth circle color to grey
setIndicator("#ccc");
// set passwordLength
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength - min) * 100/(max - min))  + "% 100%"
};
console.log('hello');
function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
};
console.log('hello');
// It generate any random number in a range.
 function getRandomInteger(min,max){
   return Math.floor(Math.random() * (max - min)) + min ;
 };
 console.log('hello');
 // Generate an random integer in between 0 to 9.
 function generateRandomNumber(){
    return getRandomInteger(0,9);
 };
 console.log('hello');
 // Generate an random lowerCase letter in between a to z.
 function generateLowerCase(){
    return String.fromCharCode(getRandomInteger(97,123));
 };
 console.log('hello');
  // Generate an random upperCase letter in between A to Z.
 function generateUperCase(){
    return String.fromCharCode(getRandomInteger(65,91));
 };
 console.log('hello');
 function generateSymbol(){
     const randomNum = getRandomInteger(0,symbols.length);
     return symbols.charAt(randomNum);
 };
 console.log('hello');
 function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSymb = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSymb = true;
    if(hasUpper && hasLower &&(hasNum || hasSymb) && passwordLength >= 8){
        setIndicator('#0f0');
    }else if (
        (hasLower || hasUpper) && (hasNum || hasSymb) && passwordLength >= 6
    ) {
        setIndicator('#ff0');
    }else {
        setIndicator('#f00');
    }

 }
 console.log('hello');
 async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = 'coppied';
    }
    catch(e){
        copyMsg.innerText = 'failed';
    }
    // to make coppied span vissible
    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}
console.log('hello');
function shufflePassword(array){
    //Fisher Yates Method
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
        return str;
}
console.log('hello');

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked)
        checkCount++;
    });
    // special condition
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}
console.log('hello');
allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})
console.log('hello');
inputSlider.addEventListener('input',(e) => {
    passwordLength = e.target.value;
    handleSlider();
});
console.log('hello');
copyBtn.addEventListener('click',() => {
    if( passwordDisplay.value)
    copyContent();
})
console.log('hello');
generateBtn.addEventListener('click',() =>{
    if(checkCount == 0) return;
    if(passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
    console.log('hello');
    }
    console.log('hello');
    // let's start the journey
    console.log('starting the journey');
    // remove old pasword
    password = "";
    // let's put the stuff mentioned by checkboxs
    // if(uppercaseCheck.checcked){
    //     password += generateUperCase();
    // }
    // if(lowercaseCheck.checcked){
    //     password += generateLowerCase();
    // }
    // if(numbersCheck.checcked){
    //     password += generateRandomNumber();
    // }
    // if(symbolsCheck.checcked){
    //     password += generateSymbol();
    // }
    let funcArr =[];
    if(uppercaseCheck.checked)
        funcArr.push(generateUperCase);
     if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);
    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);
     if(symbolsCheck.checked)
        funcArr.push(generateSymbol);
    //compulsory addition
    for(let i = 0; i<funcArr.length;i++){
        password += funcArr[i]();
    }
    console.log('compulsory addition done');
    //remaining addition
    for(let i = 0; i<passwordLength-funcArr.length;i++){
        let randIndex = getRandomInteger(0,funcArr.length);
        console.log('randIndex' + randIndex);
        password += funcArr[randIndex]();
    } 
    console.log('remaining addition done');
    // suffle the password
    password = shufflePassword(Array.from(password));
    console.log('shuffling done');
    //show in Ui
    passwordDisplay.value = password;
    console.log('Ui done');
    //calculate strength
    calcStrength();


})
 