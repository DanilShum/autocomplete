let search__label = document.querySelector('.search__label');
let search__input = document.querySelector('.search__input');
let search__section = document.querySelector('.search__section');

let search__arrow = document.querySelector('.search__arrow');
let search__arrowWrapper = document.querySelector('.search__arrow-wrapper');



search__section.onclick = function() {
    if (search__section.click) {
        search__input.focus();
        search__arrowWrapper.classList.add('search__arrow-wrapper__transform');
        search__label.classList.add('search__label-transition');
    } 
};
search__input.onfocus = function() {
    if (search__input.onfocus) {
        search__label.classList.add('search__label-transition');
        search__arrowWrapper.classList.add('search__arrow-wrapper__transform');
    }
};
search__input.onblur = function() {
    if (search__input.onblur) {
        search__label.classList.remove('search__label-transition');
        search__arrowWrapper.classList.remove('search__arrow-wrapper__transform');
    }
};




