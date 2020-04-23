// let searchLabel = document.querySelector('.search__label');
// let searchSection = document.querySelector('.search__section');
// let searchArrow = document.querySelector('.search__arrow');
// let searchArrowWrapper = document.querySelector('.search__arrow-wrapper');
// let searchListingWrapper = document.querySelector('.search__listing-wrapper');
const searchInput = document.querySelector('.search__input')
const searchListing = document.querySelector('.search__listing')
const Li = document.querySelectorAll('.search__listing > li:not(.available)')
const available = searchListing.querySelector('.available')
const searchLi = Array.from(document.querySelectorAll('.search__listing > li:not(.available)'))




let counter = 0;
searchLi.forEach(function (item, i, arr) {
  item.onclick = function (evt) {
    evt.preventDefault()
    const target = evt.target
    searchInput.value = target.textContent
    arr.forEach(function (led) {
      led.classList.toggle('target', led === target)
    })
  };
})
searchInput.addEventListener('keyup', function(event) {
  if (event.code == 'ArrowDown') {
    event.preventDefault();
    const focusedLi = document.querySelector('.focused');
    if (focusedLi) {
      const nextLi = focusedLi.nextSibling.nextSibling;
      searchInput.onblur = function() {
        focusedLi.classList.remove('focused');
        nextLi.classList.remove('focused');
      }
      if (nextLi) {
        focusedLi.classList.remove('focused')
        nextLi.classList.add('focused')
        console.log(nextLi)
        searchListing.scrollBy(0,Li[0].scrollHeight);
        nextLi.scrollIntoView(top);
      }
      if (nextLi.contains(available)) {
        searchLi[0].classList.add('focused')
        searchListing.scrollTo(pageYOffset, 0)
      }

    } else {
      searchLi[0].classList.add('focused')
      }
  }
  if (event.code == 'ArrowUp') {
    event.preventDefault();
    const focusedLi = document.querySelector('.focused');
    if (focusedLi) {
      const prevLi = focusedLi.previousSibling.previousSibling;
      searchInput.onblur = function() {
        focusedLi.classList.remove('focused');
        prevLi.classList.remove('focused');
      }
      if (prevLi) {
        focusedLi.classList.remove('focused')
        prevLi.classList.add('focused')
        console.log(prevLi)
        searchListing.scrollBy(0,Li[0].scrollHeight*-1);
        prevLi.scrollIntoView(top);
      }
      if (prevLi == null) {
        searchLi[searchLi.length - 1].classList.add('focused')
        focusedLi.classList.remove('focused')
        searchListing.scrollTop = searchListing.scrollHeight;
      }
    } else {searchLi[0].classList.add('focused')
    }
  }

  if (event.code == 'Enter') {
    event.preventDefault();
    const focusedLi = document.querySelector('.focused');
    searchInput.value = focusedLi.textContent
  } 

  if (event.code == 'Escape') {
    event.preventDefault();
    searchInput.blur();
  }
 
}); 






function search () {
  const word = searchInput.value
  const re = new RegExp('(' + word + ')', 'gi')

  searchLi.forEach(function (item, i, arr) {
    if (re.test(item.innerText)) {
      item.style.display = ''
      item.innerHTML = item.innerText.replace(re, '<span>$1</span>')
      /* выделение искомого слова */
    } else {
      item.style.display = 'none'
    };
  })

  if (re.test(searchListing.innerText)) {
    available.style.display = 'none'
  } else {
    available.style.display = 'block'
  };
};





searchInput.oninput = search;

