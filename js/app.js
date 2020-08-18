/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const navbarList = document.getElementById('navbar__list');
const landingContainer =  document.getElementsByClassName('landing__container').length;
const sections = Array.from(document.querySelectorAll('section'));
const scrollToUp = document.getElementById('scroll_to_up');
const header = document.querySelector('.page__header');

/**
 * End Global Variables
 * Begin Main Functions
 * 
*/

// Build the navbar
function addItemToNavbar() {
  for(let i=1; i <= landingContainer; i++) {
    let section = document.querySelector('#section' + i);
    let sectionData = section.getAttribute('data-nav');
    let sectionId = section.getAttribute('id');
    let item    =  document.createElement('li');
    let navLink  =  document.createElement('a');
    navLink.textContent = sectionData;
    navLink.setAttribute('class', 'menu__link');
    navLink.setAttribute('href', '#' + sectionId );
    item.appendChild(navLink);
    navbarList.appendChild(item);
  }
}

/* Add class 'active' to section when near top of viewport
   and add class 'current'  to navbar item when the user scroll. */  
function addActiveClass() {
  sections.forEach(section => {
    let bounding = section.getBoundingClientRect();
    let sectionId = section.getAttribute('id');
    let sectionLink = document.querySelector('a[href="#' + sectionId +  '"]');
    let sectionHalfShown = section.offsetTop - (section.offsetHeight / 2);
    let sectionBehind = section.offsetTop + (section.offsetHeight / 2);

    if ((bounding.top >= 0) && (bounding.left >= 0) && (Math.floor(bounding.right) <= window.innerWidth) &&
        (window.pageYOffset > sectionHalfShown) && (window.pageYOffset <= sectionBehind)) {
          section.classList.add('active-section');
          sectionLink.classList.add('active-link');
    } else if (window.pageYOffset >= sectionBehind || window.pageYOffset < section.offsetTop) {
          section.classList.remove('active-section');
          sectionLink.classList.remove('active-link');
    }
  })
}

// Scroll to anchor ID using scrollTO event
function scrollToSection(e) {
  e.preventDefault();
  let element =  document.querySelector(e.target.getAttribute('href'));
  window.scrollTo(0, element.offsetTop);
}

// Scroll to up using scrollTO event
function scrollToTop() { 
    window.scrollTo(0, 0); 
  } 

//  Ensures navbar is visible on page load
 function showNavbar() {
  header.classList.add('show-navbar');
};

//  Hides navbar when user is not scrolling
let scrolling = false;

function hideNavbar(e) {
  if (scrolling !== false) {
    clearTimeout(scrolling);
    header.classList.remove('hide-navbar');
    header.classList.add('show-navbar');
  }
  scrolling = setTimeout(function () {
    if (header.matches(':hover')) {
      header.classList.remove('hide-navbar');
    } else {
      header.classList.remove('show-navbar');
      header.classList.add('hide-navbar');
    }
  }, 1000);
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
addItemToNavbar();

//  Ensures navbar is visible on page load
window.addEventListener('onload', showNavbar );

// Set sections as active
window.addEventListener('scroll', addActiveClass);

// Scroll to section on link click
navbarList.addEventListener('click', scrollToSection);

// Scroll to up on link click
scrollToUp.addEventListener('click', scrollToTop);

// Hides navbar when user is not scrolling
window.addEventListener('scroll', hideNavbar, false);

