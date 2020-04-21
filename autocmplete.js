let search__label = document.querySelector('.search__label');
let search__input = document.querySelector('.search__input');
let search__section = document.querySelector('.search__section');

let search__arrow = document.querySelector('.search__arrow');
let search__arrowWrapper = document.querySelector('.search__arrow-wrapper');

let search__listingWrapper = document.querySelector('.search__listing-wrapper');

let search__listing = document.querySelector('.search__listing');
let search__li = document.querySelectorAll('.search__listing > li');
let search__span = document.querySelectorAll('.search__listing > li > span');

let available = search__listing.querySelector('.available');

for(i=0;i<search__li.length;i++) {
    search__li[i].onclick = function(evt) {
        evt.preventDefault();
            search__input.value = this.textContent;
    };
};
search__input.oninput = function() {
    Search();
}

function Search() {
    let word = search__input.value.toLowerCase();
    const re = new RegExp(word, 'gi');
    for (i = 0; i < search__li.length; i++) {
        if (re.test(search__li[i].innerText)) {
            search__li[i].style.display = "";
            search__li[i].innerHTML = search__li[i].innerText.replace(re, `<span>${word}</span>`); /* выделение искомого слова */
        } else {
            search__li[i].style.display = "none"; 
        };
        
       
    };
    if (re.test(search__listing.innerText)) {
        available.style.display = "none";
        } else {
            available.style.display = "block"; 
        };
};
