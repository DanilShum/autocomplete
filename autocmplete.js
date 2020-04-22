// let searchLabel = document.querySelector('.search__label');
// let searchSection = document.querySelector('.search__section');
// let searchArrow = document.querySelector('.search__arrow');
// let searchArrowWrapper = document.querySelector('.search__arrow-wrapper');
// let searchListingWrapper = document.querySelector('.search__listing-wrapper');
const searchInput = document.querySelector('.search__input')
const searchListing = document.querySelector('.search__listing')
// const searchLi = document.querySelectorAll('.search__listing > li:not(.available)')
const available = searchListing.querySelector('.available')
const searchLi = Array.from(document.querySelectorAll('.search__listing > li:not(.available)'))

searchLi.forEach(function (item, i, arr) {
  item.onclick = function (evt) {
    evt.preventDefault()
    const target = evt.target
    searchInput.value = target.textContent
    arr.forEach(function (led) {
      led.classList.toggle('target', led === target)
    })
  }
})

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

searchInput.oninput = search
