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

const mainUL = document.querySelector('ul');          //defines the unordered list that will contain list items.
const nav = document.querySelector('nav');            //defines the nav bar to be controlled (show/hide).
const BackTopButton = document.createElement('button');      //defines a new (back to top) button 
BackTopButton.setAttribute("id","myBtn");                    //seting backtotop btn id
BackTopButton.setAttribute("onclick","topFunction()");       //seting backtotop btn onclick action
BackTopButton.textContent = "Back To Top";                   //seting backtotop btn text
document.querySelector('body').appendChild(BackTopButton);   //adding the backtotop btn to the body


//calling the funaction of building the navbar items dynamically based on HTML sections
createListItems();

//An event Listner for window scroll to show/hide BackToTop button ====>> moved to line#70


// An event Listner for MouseWheel when user needs the navigation bar throug the document // ====>> Removed unsable code.
// document.addEventListener
// ('wheel',function(){
//     nav.style.display = "block"
// })

// Scroll to Top callable function
function topFunction() {
    //   document.body.scrollTop = 0;
    //   document.documentElement.scrollTop = 0;
        window.scrollTo({top:0,behavior:"smooth"});
        // nav.style.display = "block";  // Removed unsable code.
    }

// build the navigation List Items according to HTML sections
function createListItems(){
    const sections = document.querySelectorAll('section');
    for (var i = 1; i <= sections.length;i++){
        let listItem = document.createElement('li');
        listItem.textContent = "Section " + i;
        listItem.id = "list" + i;
        mainUL.append(listItem);
        let selectedSection = document.getElementById('section'+i); //defines and links the section for each list item based on its ID.
        //An event Listner for the clicked ListItem to scroll the linked section into the view.
        listItem.addEventListener('click',function(eve){
            eve.preventDefault();           // Added as required.
            // nav.style.display = "none";  // Removed to sticky the navbar while viewing a section.
            selectedSection.scrollIntoView({behavior: 'smooth'})
        })    
    }    
}

//An event Listner for window scroll to show/hide BackToTop button
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        BackTopButton.style.display = "block";
    } else {
        BackTopButton.style.display = "none";
    }
    for (let x=1; x <= document.getElementsByTagName('section').length;x++){
        let sectionInScroll = document.getElementById("section"+x);
        let listItemToHL = document.getElementById("list"+x);
        let rectSection = sectionInScroll.getBoundingClientRect();
        if (rectSection.top >= -200 && rectSection.top <= 200){
            listItemToHL.classList.add("active");
        }else{
            listItemToHL.classList.remove("active");
        }    
    }
    
}




//---------------------------------------------------------- Extra mind blowing code ----------------------------------------------------------//

// adding a button to creat a section in runtime.
const addSectionBTN = document.createElement('button');
addSectionBTN.textContent = "Add Section"
addSectionBTN.setAttribute("onclick","addNewSection()");
addSectionBTN.id = 'newSection'
document.querySelector('main').append(addSectionBTN);

//adding new section in runtime, to be called be addSectionBTN
function addNewSection(){
    const newSection = document.createElement('section');
    document.querySelector('main').append(newSection);
    document.querySelector('main').insertBefore(newSection,addSectionBTN);
    const newSectionNumber = document.querySelectorAll('section').length;
    const newListItem = document.createElement('li');
    newListItem.id = "list" + newSectionNumber
    mainUL.appendChild(newListItem);
    newListItem.textContent = "Section " + newSectionNumber;
    newListItem.addEventListener('click',function(event){
        // nav.style.display = "none";
        event.preventDefault();
        newSection.scrollIntoView({behavior:"smooth"});
    })
    newSection.id = "section"+ newSectionNumber;
    newSection.setAttribute("data-nav","Section "+newSectionNumber);
    newSection.innerHTML = `<div class="landing__container">
    <h2>Section ${newSectionNumber}</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Morbi fermentum metus faucibus lectus pharetra dapibus.
     Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. 
    Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis.
     Sed convallis sollicitudin mauris ac tincidunt. 
    Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. 
    Pellentesque maximus imperdiet elit a pharetra. 
    Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus.
     Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. 
    Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
    <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, 
    vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. 
    Vestibulum fermentum consectetur porttitor. 
    Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
    </div>` 

}

//------------------------------------------------------ End of Extra mind blowing code ------------------------------------------------------//