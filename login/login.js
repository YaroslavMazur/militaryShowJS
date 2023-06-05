const BIN_ID = "645a75c29d312622a35ae78d";
const KEY = "$2b$10$AWTP0IUYQzZoJss7139lFu/5110JcJxctPY4kmxExcNPTnSjDihDe";

let form = document.querySelector('.form');



form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Отримуємо дані форми
  const formData = new FormData(form);
  const email = formData.get('email');
  const password = formData.get('password');

  dataUser = await validUser(email, password);

  if (dataUser === null) {
    alert("Wrong password or email")
    return
  }

  localStorage.setItem('itemsInCart', dataUser.cart);


  localStorage.setItem("userEmail", dataUser.email);

  alert('Your are logined!');
  window.location.replace('/main.html')

});


async function validUser(email, passwordToCheck) {
    let response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: { 'X-Master-Key': KEY }
    });
  
    let data = await response.json();
  
    let indexUser = data.record.users.findIndex(obj => obj["email"] === email);
    let indexAdmin = data.record.admins.findIndex(obj => obj["email"] === email);
    
    if (indexUser === -1 && indexAdmin === -1)
      return null
    
    if(indexUser !== -1){
        if(data.record.users[indexUser].password == passwordToCheck){
            localStorage.setItem("isAdmin", false);
            return data.record.users[indexUser];
        }
        else return null;
        
    }

    if(indexAdmin !== -1){
        if(data.record.admins[indexAdmin].password == passwordToCheck){
            localStorage.setItem("isAdmin", true);
            return data.record.users[indexAdmin];

        }
        else return null;
        
    }


  
  }