'use strict';

//Opening or closing side bar

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function() {elementToggleFunc(sidebar); })

//Lightbox for Portfolio Projects

const projectLinks = document.querySelectorAll('.project-item a');
const lightboxContainer = document.querySelector('[data-lightbox-container]');
const lightboxOverlay = document.querySelector('[data-lightbox-overlay]');
const lightboxCloseBtn = document.querySelector('[data-lightbox-close-btn]');
const lightboxImg = document.querySelector('[data-lightbox-img]');
const lightboxTitle = document.querySelector('[data-lightbox-title]');
const lightboxCategory = document.querySelector('[data-lightbox-category]');

const lightboxToggle = function () {
    lightboxContainer.classList.toggle('active');
    lightboxOverlay.classList.toggle('active');
}

for (let i = 0; i < projectLinks.length; i++) {
    projectLinks[i].addEventListener('click', function (e) {
        e.preventDefault();
        
        const projectImg = this.querySelector('.project-img img');
        const projectTitle = this.querySelector('.project-title');
        const projectCategory = this.querySelector('.project-category');

        lightboxImg.src = projectImg.src;
        lightboxImg.alt = projectImg.alt;
        lightboxTitle.innerHTML = projectTitle.innerHTML;
        lightboxCategory.innerHTML = projectCategory.innerHTML;

        lightboxToggle();
    });
}

lightboxCloseBtn.addEventListener('click', lightboxToggle);
lightboxOverlay.addEventListener('click', lightboxToggle);

//Lightbox for Blog Posts

const blogPostLinks = document.querySelectorAll('.blog-post-item a');
const blogLightboxContainer = document.querySelector('[data-blog-lightbox-container]');
const blogLightboxOverlay = document.querySelector('[data-blog-lightbox-overlay]');
const blogLightboxCloseBtn = document.querySelector('[data-blog-lightbox-close-btn]');
const blogLightboxImg = document.querySelector('[data-blog-lightbox-img]');
const blogLightboxTitle = document.querySelector('[data-blog-lightbox-title]');
const blogLightboxCategory = document.querySelector('[data-blog-lightbox-category]');
const blogLightboxDate = document.querySelector('[data-blog-lightbox-date]');
const blogLightboxText = document.querySelector('[data-blog-lightbox-text]');

const blogLightboxToggle = function () {
    blogLightboxContainer.classList.toggle('active');
    blogLightboxOverlay.classList.toggle('active');
}

for (let i = 0; i < blogPostLinks.length; i++) {
    blogPostLinks[i].addEventListener('click', function (e) {
        e.preventDefault();
        
        const blogImg = this.querySelector('.blog-banner-box img');
        const blogTitle = this.querySelector('.blog-item-title');
        const blogCategory = this.querySelector('.blog-category');
        const blogDate = this.querySelector('time');
        const blogText = this.querySelector('.blog-text');

        blogLightboxImg.src = blogImg.src;
        blogLightboxImg.alt = blogImg.alt;
        blogLightboxTitle.innerHTML = blogTitle.innerHTML;
        blogLightboxCategory.innerHTML = blogCategory.innerHTML;
        blogLightboxDate.innerHTML = blogDate.innerHTML;
        blogLightboxText.innerHTML = blogText.innerHTML;

        blogLightboxToggle();
    });
}

blogLightboxCloseBtn.addEventListener('click', blogLightboxToggle);
blogLightboxOverlay.addEventListener('click', blogLightboxToggle);

//Activating Modal-testimonial

const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
}

for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener('click', function () {
        modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
        modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
        modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
        modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;

        testimonialsModalFunc();
    })
}

//Activating close button in modal-testimonial

modalCloseBtn.addEventListener('click', testimonialsModalFunc);
overlay.addEventListener('click', testimonialsModalFunc);

//Activating Filter Select and filtering options

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

select.addEventListener('click', function () {elementToggleFunc(this); });

for(let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);

    });
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
    // normalize the selected value once (trim + lowercase)
    const selected = String(selectedValue).trim().toLowerCase();

    for(let i = 0; i < filterItems.length; i++) {
        // guard and normalize each item's data-category to allow case/spacing differences
        const itemCategoryRaw = filterItems[i].dataset.category || '';
        const itemCategory = String(itemCategoryRaw).trim().toLowerCase();

        if(selected === "all" || selected === itemCategory) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
}

//Enabling filter button for larger screens 

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    
    filterBtn[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;

    })
}

// Enabling Contact Form

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

for(let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener('input', function () {
        if(form.checkValidity()) {
            formBtn.removeAttribute('disabled');
        } else { 
            formBtn.setAttribute('disabled', '');
        }
    })
}

// Enabling Page Navigation 

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for(let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function() {
        
        for(let i = 0; i < pages.length; i++) {
            if(this.innerHTML.toLowerCase() == pages[i].dataset.page) {
                pages[i].classList.add('active');
                navigationLinks[i].classList.add('active');
                window.scrollTo(0, 0);
            } else {
                pages[i].classList.remove('active');
                navigationLinks[i]. classList.remove('active');
            }
        }
    });
}