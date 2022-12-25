// Copy Button Functionality
// Tool Tip functionality

const copyButton = document.querySelector('.copy-button')
const inputData = document.getElementById('main-password-input')

let defaultToolTipContent = copyButton.getAttribute('data-tooltip')

copyButton.addEventListener('click', function() {
    // copy input data
    inputData.select();
    inputData.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(inputData.value);
    // change tooltip data 
    copyButton.setAttribute('data-tooltip', 'copied')
    setTimeout(() => {
        copyButton.setAttribute('data-tooltip', defaultToolTipContent)
    }, 2000)
})


// Range Slider Functionality 
let passwordLength = document.querySelector('#char-length-value')
const rangeSilder = document.querySelector('#char-range-slider')

passwordLength.innerHTML = rangeSilder.value

rangeSilder.addEventListener('input', function() {
    passwordLength.innerHTML = rangeSilder.value
    const min = rangeSilder.min
    const max = rangeSilder.max
    const val = rangeSilder.value
    rangeSilder.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
})



// Password Filter Functionality
// Strength Functionality
const checkbox = document.querySelectorAll('input[type="checkbox"]')
const strengthBars = document.querySelectorAll('.bars')

var strengthUpdateValue = document.getElementById('strength-update')

let strength = 0
let increase = false
let decrease = false

checkbox.forEach((check) => {
    check.addEventListener('input', (e) => {
        if (e.target.checked) {
            strength += 1
            increase = true
            decrease = false
            checkStrength(strength, increase, decrease)
        } else {
            strength -= 1
            increase = false
            decrease = true
            checkStrength(strength, increase, decrease)
        }
    })
})


function checkStrength(num, is_checked, is_unchecked) {
    if (is_checked == true) {
        if (num == 1) {
            strengthBars[num].classList.add('active-bars')
            strengthUpdateValue.innerHTML = 'WEAK'
        }
        if (num == 2) {
            strengthBars[num].classList.add('active-bars')
            strengthUpdateValue.innerHTML = 'MEDIUM'
        }
        if (num == 3) {
            strengthBars[num].classList.add('active-bars')
            strengthUpdateValue.innerHTML = 'STRONG'
        }
    }
    if (is_unchecked) {
        if (num == 0) {
            strengthBars[num + 1].classList.remove('active-bars')
            strengthUpdateValue.innerHTML = 'POOR'
        }
        if (num == 1) {
            strengthBars[num + 1].classList.remove('active-bars')
            strengthUpdateValue.innerHTML = 'WEAK'
        }
        if (num == 2) {
            strengthBars[num + 1].classList.remove('active-bars')
            strengthUpdateValue.innerHTML = 'MEDIUM'
        }
    }
}


// Generate button functionality

const generateButton = document.querySelector('.char-generate')
const upperCaseElement = document.getElementById('uppercase-check')
const lowerCaseElement = document.getElementById('lowercase-check')
const numberElement = document.getElementById('number-check')
const symbolElement = document.getElementById('symbol-check')
const passwordDisplay = document.getElementById('main-password-input')


const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122)
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57)
const SYMBOLS_CHAR_CODES = arrayFromLowToHigh(34, 47).concat(
    arrayFromLowToHigh(58, 64).concat(
        arrayFromLowToHigh(91, 96).concat(arrayFromLowToHigh(123, 126))))




generateButton.addEventListener('click', () => {
    const characterAmount = parseInt(passwordLength.innerHTML)
    const includeUppercase = upperCaseElement.checked
    const includeLowercase = lowerCaseElement.checked
    const includeNumbers = numberElement.checked
    const includeSymbols = symbolElement.checked
    const password = generatePassword(characterAmount, includeUppercase,
        includeLowercase, includeNumbers, includeSymbols);
    passwordDisplay.value = password
})


function generatePassword(characterAmount, includeUppercase, includeLowercase,
    includeNumbers, includeSymbols) {
    let charCodes = UPPERCASE_CHAR_CODES
    if (includeLowercase) charCodes = charCodes.concat(LOWERCASE_CHAR_CODES)
    if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES)
    if (includeSymbols) charCodes = charCodes.concat(SYMBOLS_CHAR_CODES)

    const passwordCharacters = []

    for (let i = 0; i < characterAmount; i++) {
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
        passwordCharacters.push(String.fromCharCode(characterCode))
    }

    return passwordCharacters.join('')
}


// ASCII charcater code array generator
function arrayFromLowToHigh(low, high) {
    const array = []
    for (let i = low; i <= high; i++) {
        array.push(i)
    }
    return array
}
// function to_a(c1 = 'a', c2 = 'z', c3 = 'A', c4 = 'Z') {
//     a = 'abcdefghijklmnopqrstuvwxyz'.split('')
//     b = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')
//     let lowercase_characters = a.slice(a.indexOf(c1), a.indexOf(c2) + 1)
//     let uppercase_characters = b.slice(b.indexOf(c3), b.indexOf(c4) + 1)
//     return [lowercase_characters, uppercase_characters]
// }

// console.log(to_a())