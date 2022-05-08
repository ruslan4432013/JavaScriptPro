'use strict';

let firstText = document.getElementById('firstText').innerHTML

let regexp = /(\B')/g
let divReplaced = document.getElementById('replacedText')



document.getElementById('clickToReplace').addEventListener('click', () => {
    document.getElementById('mainRepText').style.display = 'block'
    divReplaced.innerHTML = firstText.replace(regexp, '"')
})
