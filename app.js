let calculationArr = []

const calculationEl = $('#calculation')[0]
const resultEl = $('#result')[0]

const form = $('#form') // Array & Object with methods
const input = $('#form [name="input"]')

form.on('submit', formSubmit)

$('#form [name="plus"]').on('click', plus)
$('#form [name="minus"]').on('click', minus)

/**
 * @this {HTMLFormElement}
 * @param {SubmitEvent} ev
 */
function formSubmit (ev) {
  ev.preventDefault() // Refresha inte sidan.

  if (input[0].value.length > 0) {
    const num = Number(input[0].value)
    calculationArr.push(num)
    runTts(num) // Extra
  }

  input[0].value = ''

  // Quit early, there's nothing to calculate.
  if (!calculationArr.length > 0) return

  // Do the thing.
  simpleCalc(calculationArr)
  
  calculationArr = []
  calculationEl.innerText = ''
}

/**
 * @param {MouseEvent | KeyboardEvent} _
 * @param {boolean} keyboard
 */
function plus (_/*, keyboard = false*/) {
  const val = input[0].value
  const num = Number(val)

  let ttsText = ''

  // if (keyboard) {
  //   calculationArr.push(num, '+')
  //   ttsText = `${num} plus` // Extra
  // } else

  if (calculationArr.length === 0) {
    calculationArr.push(num)
    ttsText = num // Extra
  } else {
    calculationArr.push('+', num)
    ttsText = `Plus ${num}.` // Extra
  }

  updateCalculationEl(calculationArr)

  input[0].value = ''

  runTts(ttsText) // Extra
}

/**
 * @param {MouseEvent | KeyboardEvent} _
 * @param {boolean} keyboard
 */
function minus (_ /*, keyboard = false*/) {
  const val = input[0].value
  const num = Number(val)

  let ttsText = ''

  // if (keyboard) {
  //   calculationArr.push(num, '-')
  //   ttsText = `${num} minus` // Extra
  // } else

  if (calculationArr.length === 0) {
    calculationArr.push(num) 
    ttsText = num // Extra
  } else {
    calculationArr.push('-', num)
    ttsText = `Minus ${num}.` // Extra
  }

  updateCalculationEl(calculationArr)

  input[0].value = ''

  runTts(ttsText) // Extra
}

/**
 * @param {Array<string | number>} arr
 */
function simpleCalc (arr) {
  let res = arr[0]

  for (let index = 0; index < arr.length; index++) {
    const element = arr[index]
    
    const nextElement = arr[index + 1]

    if (!nextElement) continue
    if (typeof element === 'number') continue

    switch (element) {
      case '+':
        res += nextElement
        break
      case '-':
        res -= nextElement
        break
    }
  }

  resultEl.innerText = res

  runTts(`Equals ${res}.`, true) // Extra
}

/**
 * @param {Array<string | number>} arr
 */
function updateCalculationEl (arr) {
  resultEl.innerText = ''
  calculationEl.innerText = arr.join(' ')
}

// VG
$('body').on('keydown', onKeyboard)

/**
 * @this {HTMLInputElement}
 * @param {KeyboardEvent} ev
 */
function onKeyboard (ev) {
  input.trigger('focus')
  switch (ev.key) {
    case '+':
      plus(null, true)
      ev.preventDefault()
      break
    case '-':
      minus(null, true)
      ev.preventDefault()
      break
    case '=':
      formSubmit(ev)
      ev.preventDefault()
      break
  }
}
