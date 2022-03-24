const randomizeBTN = document.getElementById('randomize');
const sortBTN = document.getElementById('sort');
let selectionColumns = document.querySelectorAll('.selection')
let bubbleColumns = document.querySelectorAll('.bubble')

let preventInterruption = false;

const randomNumbers = (number) => {
  let randomNumber = [];

  let compare = (arr, num) => {
    return arr.some(numb => num === numb)
  }

  for (let i = 0; i < number; i++) {
    let newValue = (Math.floor(Math.random() * number + 1));
    if (compare(randomNumber, newValue) || newValue === 0) {
      i--
    } else {
      randomNumber.push(newValue)
    }
  }

  return randomNumber
}


const randomizeColumns = (arr, randomArr) => {
  if (preventInterruption) {
    return
  }

  for (let i = 0; i < 20; i++) {
    arr[i].style.height = `${+randomArr[i] * 10}px`
  }
}

function setTimeOutCustom(milisec) {
  return new Promise(resolve => {
    setTimeout(() => { resolve('') }, milisec);
  })
}

const disableBTN = btnElement => {
  btnElement.disabled = true;
  btnElement.style.backgroundColor = 'rgb(87, 87, 87)';
}

const restoreBTN = btnElement => {
  btnElement.disabled = false;
  btnElement.style.backgroundColor = 'steelblue';
}

const toggleColumns = (col1, col2) => {

  let heightHolder = col1.style.height
  col1.style.height = col2.style.height
  col2.style.height = heightHolder
}

const selectionSort = async (arr, timeOut) => {
  for (let i = 0; i < arr.length; i++) {
    let min = i

    for (let j = i + 1; j < arr.length; j++) {
      arr[j].style.backgroundColor = 'white';
      arr[i].style.backgroundColor = 'black';
      // columns[min].style.backgroundColor = 'rgb(46, 238, 20)';
      arr[min].style.backgroundColor = 'red';


      await setTimeOutCustom(timeOut);
      arr[j].style.backgroundColor = 'aqua';
      arr[i].style.backgroundColor = 'aqua';
      arr[min].style.backgroundColor = 'aqua';
      if (arr[min].offsetHeight > arr[j].offsetHeight) {
        min = j
      }

    }
    if (i !== min) {
      toggleColumns(arr[i], arr[min])

    }

  }
}

const bubbleSort = async (arr, timeOut) => {
  let noSwaps;
  disableBTN(randomizeBTN);
  disableBTN(sortBTN);

  for (let i = arr.length; i > 0; i--) {

    noSwaps = true;
    for (let j = 0; j < i - 1; j++) {
      arr[j + 1].style.backgroundColor = 'white';
      arr[j].style.backgroundColor = 'black';
      if (arr[j].offsetHeight > arr[j + 1].offsetHeight) {

        await setTimeOutCustom(timeOut);

        toggleColumns(arr[j], arr[j + 1])

        noSwaps = false;
      }
      arr[j].style.backgroundColor = 'aqua';
      arr[j + 1].style.backgroundColor = 'aqua';
    }
    if (noSwaps) break;
  }

  restoreBTN(randomizeBTN);
  restoreBTN(sortBTN);
}

const sortColumns = async () => {
  preventInterruption = true;
  const timeOut = 100;

  selectionSort(selectionColumns, timeOut)
  bubbleSort(bubbleColumns, timeOut)

  preventInterruption = false;
}

const randomize = () => {
  let randomArrayOfNumber = randomNumbers(bubbleColumns.length)
  randomizeColumns(bubbleColumns, randomArrayOfNumber);
  randomizeColumns(selectionColumns, randomArrayOfNumber)

}

randomizeBTN.addEventListener('click', randomize)
sortBTN.addEventListener('click', sortColumns)