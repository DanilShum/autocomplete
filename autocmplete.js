const searchInput = document.querySelector('.search__input')
const searchListing = document.querySelector('.search__listing')
const available = searchListing.querySelector('.available')
const searchLi = Array.from(document.querySelectorAll('.search__listing > li:not(.available)'))


searchLi.forEach(function (item, i, arr) {
  item.addEventListener('click', function (evt) {
    evt.preventDefault()
    const target = evt.target
    const optin = selectOption(target)
  })
})

searchInput.addEventListener('blur', function (input) {
    const focusedLi = document.querySelector('.focused')
    if (focusedLi) {
      focusedLi.classList.remove('focused')
    }
})

searchInput.addEventListener('keydown', function (event) {
  if (event.code === 'ArrowDown') {
    event.preventDefault()
    const focusedLi = document.querySelector('.focused')
    if (focusedLi) {
      const nextLi = getNextSibling(focusedLi, ':not(.hidden__li):not(.available)')
      
      if (nextLi) {
        focusedLi.classList.remove('focused')
        nextLi.classList.add('focused')
        focusedLi.scrollIntoView(true)
      } else {
        searchListing.scrollTo(0, 0)
        const lastLI = document.querySelectorAll('.search__listing > li:not(.hidden__li):not(.available)')
        focusedLi.classList.remove('focused')
        lastLI[0].classList.add('focused')
      }
    } else {
      searchLi[0].classList.add('focused')
    }
  }

  if (event.code === 'ArrowUp') {
    event.preventDefault()
    const focusedLi = document.querySelector('.focused')
    if (focusedLi) {
      const prevLi = getPreviousSibling(focusedLi, ':not(.hidden__li):not(.available)')
      if (prevLi) {
        focusedLi.classList.remove('focused')
        prevLi.classList.add('focused')
        prevLi.scrollIntoView(true)
      } else {
        const lastLI = document.querySelectorAll('.search__listing > li:not(.hidden__li):not(.available)')
        lastLI[lastLI.length - 1].classList.add('focused')
        focusedLi.classList.remove('focused')
        searchListing.scrollTop = searchListing.scrollHeight
      }
    } else {
      searchLi[0].classList.add('focused')
     }
  } 
  
  if (event.code === 'Enter') {
    event.preventDefault()
    const focusedLi = document.querySelector('.focused')
    const optin = selectOption(focusedLi);
    searchInput.blur()
  }

  if (event.code === 'Escape') {
    event.preventDefault()
    searchInput.blur()
  }
})

const getNextSibling = function (elem, selector) {
  let sibling = elem.nextElementSibling

  if (!selector) return sibling

  while (sibling) {
    if (sibling.matches(selector)) return sibling
    sibling = sibling.nextElementSibling
  }
}

const getPreviousSibling = function (elem, selector) {
  let sibling = elem.previousElementSibling

  if (!selector) return sibling

  while (sibling) {
    if (sibling.matches(selector)) return sibling
    sibling = sibling.previousElementSibling
  }
}

searchInput.addEventListener('input', function (event) {
  const word = searchInput.value
  const re = new RegExp('(' + word + ')', 'gi')
  const selection = textSelection(searchLi, re, 'hidden__li')

  if (re.test(searchListing.innerText)) {
    available.style.display = 'none'
  } else {
    available.style.display = 'block'
  }
})

function textSelection (li, reg, selector) {
  li.forEach(function (item, i, arr) {
    if (reg.test(item.innerText)) {
      item.classList.remove(selector)
      item.innerHTML = item.innerText.replace(reg, '<span>$1</span>')
    } else {
      item.classList.add(selector)
    };
  })
}

function selectOption (selectedLi) {
  searchInput.value = selectedLi.textContent
  searchLi.forEach(function (li) {
    li.classList.toggle('target', li === selectedLi)
  })
}


