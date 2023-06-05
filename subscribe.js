
let windowContainer = document.querySelector(".subscribe-window")

let subWindow = `
<p>Do you want to subscribe to our news?</p>
<button class = "acceptBtn" onclick="addMember()">Accept</button>
<button class = "declineBtn" onclick="removeWindow()">Close</button>
`
windowContainer.innerHTML = subWindow;

function removeWindow() {
    let subscribeWindow = document.querySelector(".subscribe-window");
    subscribeWindow.classList.remove("show");
}

function addMember() {
    document.cookie = "subscribe=true";
}

function renderSubscribePage(){
    //таймаут на виведення вікна про підписку
    setTimeout(()=>{
      if(!checkCookie()){
        let subscribeWindow = document.querySelector(".subscribe-window");
        subscribeWindow.classList.add("show");
      }
    },4000);
}

function checkCookie() {
    let cookieValue = document.cookie.split(';').find(row => row.startsWith('subscribe='));//розділяємо строку на значення
    
    if(cookieValue === undefined) return false;
    
    cookieValue = cookieValue.split('=')[1];
  
    if(cookieValue === "true"){
      return true;
    }
    else return false;
}