// let searchLabel = document.querySelector('.search__label');
// let searchSection = document.querySelector('.search__section');
// let searchArrow = document.querySelector('.search__arrow');
// let searchArrowWrapper = document.querySelector('.search__arrow-wrapper');
// let searchListingWrapper = document.querySelector('.search__listing-wrapper');
const searchInput = document.querySelector('.search__input')
const searchListing = document.querySelector('.search__listing')
const searchLi = document.querySelectorAll('.search__listing > li:not(.available)')
const available = searchListing.querySelector('.available')

for (let i = 0; i < searchLi.length; i++) {
  searchLi[i].onclick = function (evt) {
    evt.preventDefault()
    searchInput.value = this.textContent
  }
};


function search () {
  const word = searchInput.value
  const re = new RegExp('(' + word + ')', 'gi')

  for (let i = 0; i < searchLi.length; i++) {
    if (re.test(searchLi[i].innerText)) {
      searchLi[i].style.display = ''
      searchLi[i].innerHTML = searchLi[i].innerText.replace(re, '<span>$1</span>')
      /* выделение искомого слова */
    } else {
      searchLi[i].style.display = 'none'
    };
  };
  if (re.test(searchListing.innerText)) {
    available.style.display = 'none'
  } else {
    available.style.display = 'block'
  };
};
searchInput.oninput = search;