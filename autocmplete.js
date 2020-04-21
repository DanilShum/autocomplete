let search__label = document.querySelector('.search__label');
let search__input = document.querySelector('.search__input');
let search__section = document.querySelector('.search__section');

let search__arrow = document.querySelector('.search__arrow');
let search__arrowWrapper = document.querySelector('.search__arrow-wrapper');

let search__listingWrapper = document.querySelector('.search__listing-wrapper');
let search__listing = document.querySelector('.search__listing');
let search__li = search__listing.getElementsByTagName('li');



for(i=0;i<search__li.length;i++) {
    search__li[i].onclick = function(evt) {
        evt.preventDefault();
              search__input.value = this.textContent;
        
    };
};






