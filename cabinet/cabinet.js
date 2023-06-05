const BIN_ID = "645a75c29d312622a35ae78d";
const KEY = "$2b$10$AWTP0IUYQzZoJss7139lFu/5110JcJxctPY4kmxExcNPTnSjDihDe";

let isLogedEmail = localStorage.getItem("userEmail") || null;

if (isLogedEmail === null) {
    alert("Please log in");
    window.location.replace('/login/login.html')
}

let email = document.querySelector(".email-text")

let exit = document.querySelector(".user-logout")

email.innerHTML = isLogedEmail;

if(localStorage.getItem("isAdmin")){
    email.innerHTML+=" (ADMIN)";
}

exit.addEventListener("click", async(event) => {
    event.preventDefault();

    let response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: { 'X-Master-Key': KEY }
    });

    let data = await response.json();
    console.log(localStorage.getItem("itemsInCart"));
    data.record.users.find(obj => obj["email"] === isLogedEmail).cart = localStorage.getItem("itemsInCart");


    await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'X-Master-Key': KEY
        },
        body: JSON.stringify(data.record)
    });

    localStorage.removeItem("userEmail");
    localStorage.setItem("itemsInCart", JSON.stringify([]))
    localStorage.removeItem("isAdmin");
    window.location.replace('/main.html')
})

