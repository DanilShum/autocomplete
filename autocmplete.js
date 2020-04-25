const searchInput = document.querySelector('.search__input')
const searchListing = document.querySelector('.search__listing')
const available = searchListing.querySelector('.available')
const searchLi = Array.from(document.querySelectorAll('.search__listing > li:not(.available)'))


searchLi.forEach(function (item, i, arr) {
  item.addEventListener('click', function (evt) {
    evt.preventDefault()
    const target = evt.target
    searchInput.value = target.textContent
    arr.forEach(function (led) {
      led.classList.toggle('target', led === target)
    })
  })
})
searchInput.addEventListener('blur', function (input) {
    const focusedLi = document.querySelector('.focused');
    focusedLi.classList.remove('focused');
});
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
    searchInput.value = focusedLi.textContent
    searchLi.forEach(function (item, i, arr) {
      arr.forEach(function (led) {
        led.classList.toggle('target', led === focusedLi)
      })
    })
    searchInput.blur()
  }

  if (event.code === 'Escape') {
    event.preventDefault()
    searchInput.blur()
  }
})



const getNextSibling = function (elem, selector) {
  // Get the next sibling element
  let sibling = elem.nextElementSibling

  // If there's no selector, return the first sibling
  if (!selector) return sibling

  // If the sibling matches our selector, use it
  // If not, jump to the next sibling and continue the loop
  while (sibling) {
    if (sibling.matches(selector)) return sibling
    sibling = sibling.nextElementSibling
  }
}

const getPreviousSibling = function (elem, selector) {
  // Get the next sibling element
  let sibling = elem.previousElementSibling
  // If there's no selector, return the first sibling
  if (!selector) return sibling

  // If the sibling matches our selector, use it
  // If not, jump to the next sibling and continue the loop
  while (sibling) {
    if (sibling.matches(selector)) return sibling
    sibling = sibling.previousElementSibling
  }
}
function search () {
  const word = searchInput.value
  const re = new RegExp('(' + word + ')', 'gi')

  searchLi.forEach(function (item, i, arr) {
    if (re.test(item.innerText)) {
      item.classList.remove('hidden__li')
      item.innerHTML = item.innerText.replace(re, '<span>$1</span>')
      /* выделение искомого слова */
    } else {
      item.classList.add('hidden__li')
    };
  })
  if (re.test(searchListing.innerText)) {
    available.style.display = 'none'
  } else {
    available.style.display = 'block'
  };
};

searchInput.oninput = search
