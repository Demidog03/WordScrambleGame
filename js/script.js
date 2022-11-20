const wordText = document.querySelector(".container .word")
const hint = document.querySelector(".container .hint span")
const timeText = document.querySelector(".container .time span b")
const refreshBtn = document.querySelector(".refresh-word")
const checkBtn = document.querySelector(".check-word")
const inputField = document.querySelector(".container input")

let correctWord, timer

const initTimer = maxTime => {
    clearInterval(timer)
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--
            timeText.innerHTML=maxTime
            return
        }
        clearInterval(timer)
        alert(`Oops! Time us up! ${correctWord.toLocaleUpperCase()} was a correct word!`)
        initGame() //calling initGame to restart the game
    }, 1000) //every 1000ms
}

const initGame = () => {
    initTimer(30) //calling init timer function with passing 30 as maxTime value
    let randomObj = words[Math.floor(Math.random() * words.length)]
    let wordArray = randomObj.word.split("") //spliting string into an array of substring (each letter of word)
    for (let i = wordArray.length-1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i+1)); //getting random number which limited by i (for example, i = last array index+1 * 0.7)
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]] //swiping array values
        // let temp = wordArray[i]
        // wordArray[i] = wordArray[j]
        // wordArray[j] = temp
    }

    wordText.innerHTML = wordArray.join("") //reveal wordArray letters separated by space (without commas)
    hint.innerHTML = randomObj.hint

    correctWord = randomObj.word.toLocaleLowerCase()
    inputField.setAttribute("maxlength", correctWord.length) //setting input length as length of correct word
    console.log(wordArray, randomObj.word)
}

const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase()

    if(!userWord){
        alert(`Please enter a word check`)
        return;
    }
    if(userWord != correctWord){
        alert(`Oops! ${userWord.toLocaleUpperCase()} is not correct word. Please, try again)`)
        return
    }

    alert(`Congratulations! ${userWord.toLocaleUpperCase()} is correct word!`)
    initGame()
    inputField.value = ''

}

initGame()

refreshBtn.addEventListener('click', initGame)
checkBtn.addEventListener('click', checkWord)