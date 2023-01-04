'use strict';

const BtnCloseModal = document.querySelector(".modal-btn");
const overlay = document.querySelector(".overlay");
const BtnOpenModal= document.querySelector(".add-btn");
const websiteName= document.querySelector(".website-name");
const HTML =document.querySelector("html");
const form = document.querySelector(".form");

const container = document.querySelector(".container");
const BtnClearAll =document.querySelector(".clear-btn");

let bookmarks=[]

/***** show / hide modal*****/
function showModal (){
    overlay.classList.add("show-modal");
    HTML.classList.add("overflowHide");
    websiteName.focus();
}
function closeModal (){
    overlay.classList.remove("show-modal");
    HTML.classList.remove("overflowHide");
    HTML.classList.remove("overflowHide");
}

/*****  form validation *****/
function validate (title, url){
    const expression=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const urlRegex= new RegExp(expression);
    if(url.match(urlRegex)){
      
        return true;
    }else{
alert("please, enter valid url");
        return;
    }
}


/****** form submission ****/


function storeBookmark (e){
    e.preventDefault();
 
    let urlValue =form.url.value;
    let titleValue =form.website.value;
    let noteValue =form.note.value;
   

    if(!urlValue.startsWith("https://") && !urlValue.startsWith("http://")){
        urlValue=`https://${urlValue}`;
      

    }

   if( validate(titleValue,urlValue)){
    let bookmark={
        name:titleValue ,
        url:urlValue,
        note:noteValue
    }

    addToLocalStorage(bookmark);
  
    closeModal();
   fetchBookmarks();

   }
  form.reset();

}

/***add to localstorage */
function addToLocalStorage(bookmark){
    if(localStorage.getItem("bookmarkList"))
    {
        bookmarks=JSON.parse(localStorage.getItem("bookmarkList"));
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarkList",JSON.stringify(bookmarks));
    }else{
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarkList",JSON.stringify(bookmarks));
    }
 
    
}
/******** fetch from local storage *******/

function fetchBookmarks (){
    
   
    if(localStorage.getItem("bookmarkList")){
        const arr=JSON.parse(localStorage.getItem("bookmarkList"));
container.textContent="";
   arr.forEach(bookmark => {
    container.insertAdjacentHTML('beforeend',
    `
    <div class="card">
    <a
      class="card-title"
      href="${bookmark.url}"
      target="_blank"
    >
      <img
        src="https://s2.googleusercontent.com/s2/favicons?domain=${bookmark.url}"
        alt="Favicon"
      />
     ${bookmark.name}
    </a>
    <p class="card-note">
     ${bookmark.note}
    </p>
    <button
    class="icon-box"
    aria-label="delete bookmark"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 icon delete-icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
    `)
    
    });

    }else{
        console.log("no bookmarks");

    }
  

}

/***** delete item  ***/
function deleteBookmark(e){
  
    if(e.target.classList.contains("delete-icon")){
        const target =e.target;
        const parent = target.closest(".card");
        const url= parent.querySelector(".card-title").getAttribute("href");
        console.log(url);
       console.log(parent);
      
    bookmarks.forEach((bookmark,i)=>{
        if(bookmark.url===url){
            bookmarks.splice(i,1);

        }
    });
    console.log(bookmarks)
    localStorage.setItem("bookmarkList",JSON.stringify(bookmarks));
    parent.remove();

    }
 
    

}
/******* clear *****/
function clearBookmarks(){
    localStorage.clear();
    container.textContent="";


}



/******** event listeners */
BtnCloseModal.addEventListener("click",closeModal);
window.addEventListener('click',(e)=>{

    if(e.target.classList.contains("overlay")){
   
        closeModal();
    }
}

)

BtnOpenModal.addEventListener("click",showModal);


form.addEventListener('submit',storeBookmark);

BtnClearAll.addEventListener("click",clearBookmarks);

container.addEventListener("click",deleteBookmark);

fetchBookmarks();