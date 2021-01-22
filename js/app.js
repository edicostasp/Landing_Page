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
const piece = document.createDocumentFragment();
const sectionList = document.querySelectorAll('section');
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function isInView (elem) {
    const bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)   
    );
};
function createNavigationItemHTML(id, name){
    const itemHTML = `<a class ="menu__link" data-id="${id}">${name}</a>`;
    return itemHTML;
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// build the nav
function buildNavigationMenu(){
    for (let i=0; i < sectionList.length; i++){
        const newMenu = document.createElement('li');
        const sectionName = sectionList[i].getAttribute('data-nav')
        const sectionId = sectionList[i].getAttribute('id')
        newMenu.innerHTML = createNavigationItemHTML(sectionId, sectionName)
         piece.appendChild(newMenu);
    }
    const navBarList = document.getElementById('navbar__list')
    navBarList.appendChild(piece);
    addElementSpan();
}
// Add class 'active' to section when near top of viewport
function setActiveClass(){
    for (let i=0; i < sectionList.length; i++){
        if (isInView(sectionList[i])){
            sectionList[i].classList.add("your-active-class");
        }else{
            sectionList[i].classList.remove("your-active-class");
        }
    }
}

// Add Text dynamically into each section
function addElementSpan(){
    for (let i=0; i < sectionList.length; i++){
        // var d = new Date();
        // var month = d.getMonth();
        const newSpanElement = document.createElement('span');
        newSpanElement.textContent = ' Udacity ' + (i + 1);
        const addSection = document.querySelectorAll('h2');
        addSection[i].appendChild(newSpanElement);
    }
}

// Scroll to anchor ID using scrollTO event
function scrollElement(event){
    if(event.target.nodeName === 'A'){
        const sectionId = event.target.getAttribute('data-id');
        const section = document.getElementById(sectionId);
        section.scrollIntoView({behavior: "smooth"});
    }
}
/**
 * End Main Functions
 * Begin Events
 * 
*/
// Scroll to section on link click
document.addEventListener('scroll', function(){
    setActiveClass();
});

const navBarList = document.getElementById('navbar__list')
    navBarList.addEventListener('click', function(event){
    scrollElement(event)
})
// Set sections as active
// Build menu 
buildNavigationMenu()