const copyBtn = document.querySelector('#copyBtn');
const shareBtn = document.querySelector('#shareBtn');
const speakBtn = document.querySelector('#speakBtn');
const highlightBtn = document.querySelector('#highlightBtn');
const themeToggle = document.querySelector('#themeToggle');
const toolbar = document.querySelector('.toolbar');

let currentSelection = "";


// //Theme

// if(localStorage.getItem("theme") === "light"){
//     document.body.classList.add("light");
// }

// themeToggle.addEventListener("click", ()=> {
//     document.body.classList.toggle("light");
//     const mode = document.body.classList.contains("light") ? "light" : "dark";

//     localStorage.setItem("theme", mode);
// })


// //Selection

// document.addEventListener("mouseup",(e) => {
//     const selection = window.getSelection();
//     const text = selection.toString().trim();
//     if(!text){
//         toolbar.style.display="none";
//         return;
//     }

//     currentSelection = text;
//     const range = selection.getRangeAt(0);
//     const rect = range.getBoundingClientRect();
//     toolbar.style.display = "flex";
//     toolbar.style.top = `${window.scrollY + rect.top - 60}px`;
//     toolbar.style.left = `${window.scrollX + rect.left}px`;
// });


// //Hide

// document.addEventListener("mousedown",(e) =>{
//     if(!toolbar.contains(e.target)){
//         setTimeout(() => {
//             toolbar.style.display="none";
//         },200);
//     }
// });


// //copy

// copyBtn.addEventListener("click",async()=>{
//     await navigator.clipboard.writeText(
//         currentSelection
//     );
//     alert("Copied!")
// })


// //SHARE

// shareBtn.addEventListener("click", () => {
//     const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(currentSelection)}`;
//     window.open(url,"_blank");
// });

// //SPEAK
// speakBtn.addEventListener("click",() =>{
//     const speech = new SpeechSynthesisUtterance(currentSelection);
//     speech.rate= 1;
//     speech.pitch = 1;
//     speechSynthesis.speak(speech);
// });


// //HIGHLIGHT

// highlightBtn.addEventListener("click", () => {
//     const selection = window.getSelection();
//     if(selection.rangeCount===0) return;
//     const range = selection.getRangeAt(0);
//     const span = document.createElement("span");
//     span.className = "highlight";
//     try{
//         range.surroundContents(span);
//         saveHighlights();
//     }catch(err){
//         alert(
//             "Please select text within a single paragraph."
//         );
//     }
//     toolbar.style.display="none"
// });


// //SAVE HIGHLIGHT

// function saveHighLights(){
//     localStorage.setItem(
//         "articleContent",
//         document.getElementById("article").innerHTML);
// }

// //Load HIGHLIGHTS

// window.addEventListener("load", () => {
//     const saved = localStorage.getItem("articleContent");
//     if(saved){
//         document.getElementById("article").innerHTML = saved;
//     }
// })


//Theme 

if(localStorage.getItem("theme") === "light" ){
    document.body.classList.add("light");
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const mode = document.body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme",mode);
});

// Selection

document.addEventListener("mouseup",(e) => {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    if(!text){
        toolbar.style.display="none";
        return;
    }
    currentSelection = text;
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    toolbar.style.display="flex";
    toolbar.style.top = `${window.scrollY + rect.top - 60}px`;
    toolbar.style.left = `${window.scrollX + rect.left}px`;
});


//Hide

document.addEventListener("mousedown",(e) => {
    if(toolbar && !toolbar.contains(e.target)){
        setTimeout(() => {
            toolbar.style.display="none";
        },200);
    }
});

//Copy
copyBtn.addEventListener("click", async()=>{
    await navigator.clipboard.writeText(
        currentSelection
    );
    alert("Copied!");
});

//Share
shareBtn.addEventListener("click",()=>{
    const url =`https://twitter.com/intent/tweet?text=${encodeURIComponent(currentSelection)}`;
    window.open(url,"_blank");
})

//Speak

speakBtn.addEventListener("click", () => {
    speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(currentSelection);
    speech.rate = 1;
    speech.pitch = 1;
    speechSynthesis.speak(speech);
})

// Highlight
highlightBtn.addEventListener("click", () => {
    const selection = window.getSelection();

    if (selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    const span = document.createElement("span");
    span.className = "highlight";

    try {
        range.surroundContents(span);
        saveHighlights();
    } catch (err) {
        alert("Please select text within a single paragraph.");
    }

    toolbar.style.display = "none";
});

// Save Highlights
function saveHighlights() {
    localStorage.setItem(
        "articleContent",
        document.getElementById("article").innerHTML
    );
}

// Load Highlights
window.addEventListener("load", () => {
    const saved = localStorage.getItem("articleContent");

    if (saved) {
        document.getElementById("article").innerHTML = saved;
    }
});



