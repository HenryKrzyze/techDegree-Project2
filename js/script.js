/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students

I parse over the list and make sure I am within the correct indexes. I then assign the current data node to currstudent and assign
all values to the inner variable from that node. Finally, i inserted the HTML into the Unordered List. 
*/

function showPage (list, page) {
   let startInd = (page * 9) - 9;
   let endInd = (page * 9) - 1;
   const ulList = document.querySelector('.student-list');
   ulList.innerHTML = '';
   for(let i = 0; i < list.length; i++) {
      if(i >= startInd && i <= endInd) {
         const currStudent = list[i];
         const inner = 
         `<li class='student-item cf'>
            <div class="student-details">
               <img class='avatar' src='${currStudent.picture.medium}' alt='Profile Picture'>
               <h3 class='full-name'>${currStudent.name.first} ${currStudent.name.last}</h3>
               <span class='email'>${currStudent.email}</span>
            </div>
            <div class='joined-details'>
               <span class='date'>${currStudent.registered.date}</span>
            </div>
         </li>`;
            ulList.insertAdjacentHTML('beforeend', inner);
      }
   }    
}

/*
I create the searchbar here, assign the for and class attributes, and then insert the HTML and append the searchbar to the header.
I also added a new button and an event listener which revert the page to its original inhabitants. Finally, I added an event listener
to the searchbar that listens for a change event on the input and starts by resetting the HTML of the Unordered List and parses through
all the data checking if the names match with the value of the input button. If they do they are assigned to a new list. If the list is
empty No Results is displayed on the screen, and if it isn't empty the functions are called with the new list of visible elements.  
*/

const searchBar = document.createElement('label');
searchBar.htmlFor = 'search';
searchBar.className = 'student-search';
searchBar.innerHTML = `<span>Search by name</span>
<input id="search" placeholder="Search by name...">
<button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
<button type="button">Revert</button>`;
document.querySelector('.header').appendChild(searchBar);

searchBar.addEventListener('click', (event) => {
   if(event.target.textContent === 'Revert') {
      showPage(data, 1);
      addPagination(data);
   }
})

searchBar.addEventListener('change', (event) => {
   if(event.target.tagName === 'INPUT') {
      const ulList = document.querySelector('.student-list');
      ulList.innerHTML = '';
      const content = event.target.value;
      const newData = [];
         for(let i = 0; i < data.length; i++){
            let name = data[i].name.first + ' ' + data[i].name.last;
         if(content.toLowerCase() == name.substring(0, content.length).toLowerCase()) {
            newData.push(data[i]);
         }
      } 

      if(newData.length == 0) {
         ulList.innerHTML = '<h1 class="no-results">No Results</h1>';
         console.log('working');
      } else {
      showPage(newData, 1);
      addPagination(newData);
      }
   }
});

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons

We determine the number of buttons and then parse through the amount of buttons to assign them actual HTML values. Then, we set the
first button as active and add an event listener on the list of buttons. If the event target is a button, we parse over each button
and set their classes to '' and follow by setting the button clicked class to active and calling the showPage function.
*/

function addPagination(list) {
   const buttonNum = list.length / 9;
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   for(let i = 0; i < buttonNum; i++) {
      const domElem = `<li><button type='button'>${i + 1}</button></li>`;
      linkList.insertAdjacentHTML('beforeend', domElem); 
   }
   linkList.firstElementChild.firstElementChild.className = 'active';

   linkList.addEventListener('click', (event) => {
      if(event.target.tagName === 'BUTTON') {
         const button = event.target;
         for(let i = 0; i < button.parentNode.parentNode.childElementCount; i++) {
            document.querySelector('.link-list').children[i].firstElementChild.className = '';
         }
         button.className = 'active';
         showPage(list, button.innerHTML);
         } 
      }
   );
}

// Call functions
showPage(data, 1);
addPagination(data);