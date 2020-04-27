const searchInput = document.querySelector('.search__input')
const searchListing = document.querySelector('.search__listing')
const available = searchListing.querySelector('.available')
const searchLi = Array.from(document.querySelectorAll('.search__listing > li:not(.available)'))

searchLi.forEach(function (item, i, arr) {
  item.addEventListener('click', function (evt) {
    evt.preventDefault()
    selectOption(evt.target)
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
    arrow(focusedLi, getNextSibling, scrollListDown)
  }

  if (event.code === 'ArrowUp') {
    event.preventDefault()
    const focusedLi = document.querySelector('.focused')
    arrow(focusedLi, getPreviousSibling, scrollListUp)
  }

  if (event.code === 'Enter') {
    event.preventDefault()
    const focusedLi = document.querySelector('.focused')
    selectOption(focusedLi)
    searchInput.blur()
  }

  if (event.code === 'Escape') {
    event.preventDefault()
    searchInput.blur()
  }
})

searchInput.addEventListener('input', function (event) {
  const word = searchInput.value
  const re = new RegExp('(' + word + ')', 'gi')
  textSelection(re)

  if (re.test(searchListing.innerText)) {
    available.style.display = 'none'
  } else {
    available.style.display = 'block'
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

function textSelection (reg) {
  searchLi.forEach(function (item, i, arr) {
    if (reg.test(item.innerText)) {
      item.classList.remove('hidden__li')
      item.innerHTML = item.innerText.replace(reg, '<span>$1</span>')
    } else {
      item.classList.add('hidden__li')
    };
  })
}

function selectOption (selectedLi) {
  searchInput.value = selectedLi.textContent
  searchLi.forEach(function (li) {
    li.classList.toggle('target', li === selectedLi)
  })
}

const arrow = function (focusElement, sibling, scrollList) {
  if (focusElement) {
    const stepLi = sibling(focusElement, ':not(.hidden__li):not(.available)')
    if (stepLi) {
      focusElement.classList.remove('focused')
      stepLi.classList.add('focused')
      if (event.code === 'ArrowUp') {
        stepLi.scrollIntoView(true)
      } else { focusElement.scrollIntoView(true) }
    } else {
      const lastLI = document.querySelectorAll('.search__listing > li:not(.hidden__li):not(.available)')
      focusElement.classList.remove('focused')
      scrollList(lastLI)
    }
  } else {
    searchLi[0].classList.add('focused')
  }
}

const scrollListDown = function (lastLi) {
  searchListing.scrollTo(0, 0)
  lastLi[0].classList.add('focused')
}

const scrollListUp = function (lastLi) {
  lastLi[lastLi.length - 1].classList.add('focused')
  searchListing.scrollTop = searchListing.scrollHeight
}
