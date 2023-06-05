const BIN_ID = "645a75c29d312622a35ae78d";
const KEY = "$2b$10$AWTP0IUYQzZoJss7139lFu/5110JcJxctPY4kmxExcNPTnSjDihDe";

let form = document.querySelector('.form');



form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Отримуємо дані форми
  const formData = new FormData(form);
  const email = formData.get('email');
  const password1 = formData.get('password1');
  const password2 = formData.get('password2');

  if (password1 !== password2) {
    alert("Different passwords");
    return
  }

  let validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password1);
  
  if(!validPassword){
    alert("Bad password");
    return
  }

  if (await findUser(email)) {
    alert("User already exist")
    return
  }

  // Відправляємо дані на сервер за допомогою Fetch API
  let response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { 'X-Master-Key': KEY }
  });

  let data = await response.json();
  let dataCart = localStorage.getItem('itemsInCart');

  if (dataCart !== null)
    dataCart = JSON.parse(dataCart);
  else dataCart = [];

  console.log(dataCart);


  data.record.users.push({ "email": email, "password": password1, "cart": dataCart });
  localStorage.setItem("userEmail", email);

  await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'X-Master-Key': KEY
    },
    body: JSON.stringify(data.record)
  });


  alert('Your are logined!');
  window.location.replace('/main.html')

});


async function findUser(email) {
  let response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { 'X-Master-Key': KEY }
  });

  let data = await response.json();

  let indexUser = data.record.users.findIndex(obj => obj["email"] === email);
  let indexAdmin = data.record.admins.findIndex(obj => obj["email"] === email);

  if (indexUser === -1 && indexAdmin === -1) {
    return false
  }
  else return true

}





