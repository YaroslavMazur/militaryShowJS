function addBlocks(data) {

  let blocks_container = document.querySelector(".blocks");
  let blocks = "";

  let i = blocks_container.childElementCount;
 
  while((i < blocks_container.childElementCount + 8) && (i < data.length)){
    blocks += `
      <div class="block" data-id = "${data[i].id}" data-type = "${data[i].type}">
        <div class="container-img">
          <img src="files/${data[i].imgName}">
          <p class="price">${data[i].price}$</p>
        </div>
        <p class="name">${data[i].name}</p>
        <p class="describe">${data[i].describe}</p>
        <img class="btnDescribe" src = "describe.svg">
        <button class = "addCartBtn">Add to cart</button>
      </div>
    `;
    i++;
  };
  
  blocks_container.innerHTML += blocks;

  let len = blocks_container_len = document.querySelector(".blocks").childElementCount;
  let moreBtn = document.querySelector(".moreBtn");

  if(len === data.length)
    moreBtn.style.display = "none";
  else
    moreBtn.style.display = "block";
}


function renderCards(){
  fetch("infoJSON.json")
    .then(response => response.json())
    .then(dataConst => {

      let filterPanel = `
      <div class = "filterPanel">
        <div class = "search-container">
          <input class = "searchInput" type="text" placeholder="...">
          <button class = "searchBtn">Search</button>
        </div>

        <div class = "sort-container">
          <div class = "selectPrice">
            <p class = "priceP">Price:</p>

            <select class = "priceSelection" size = "1">
                <option value = "0" >default</option>
                <option value= "growth">in descending order</option>
                <option value = "decline">in ascending order</option>
            </select>
          </div>
          <div class = "inputPrice">
            <p class = "sortP">from</p>
            <input class = "fromPrice" type = "number" min = "0">
            <p class = "sortP">to</p>
            <input class = "toPrice" type = "number" min = "0">
          </div>
        </div>
        
      </div>
      `;


      const buttons = document.querySelectorAll(".btnDescribe");
      const card = document.querySelector(".block");  

      let filter_container = document.getElementById("filterContainer");
      filter_container.innerHTML = filterPanel;

      addBlocks(dataConst);

      

    let data = dataConst; 
    let searchBtn = document.querySelector(".searchBtn");
    searchBtn.addEventListener("click", ()=>{
       data = filterData(dataConst);
    })

    //кнопка відкриття корзини
    
    const btnMore = document.querySelector(".moreBtn");

      btnMore.addEventListener("click",() =>{
        addBlocks(data);  
      })

      

    //кнопка додавання до кошику
    blocks.addEventListener('click', (event) => {

      let thisBlock = event.target.parentNode;

      if (event.target.classList.contains('addCartBtn')) {

        let price = thisBlock.querySelector(".price").innerHTML.slice(0,-1);
        let name = thisBlock.querySelector(".name").innerHTML;
        let id = thisBlock.getAttribute("data-id");
              
        let dataToCart = {
          id: id,
          name: name,
          price: price,
        }
        console.log(dataToCart);
        addToCart(dataToCart);
            
        let emptyP = document.querySelector(".empty");
        emptyP.classList.remove("show");

      }

      if (event.target.classList.contains('btnDescribe')){
      
          const pDescribe = thisBlock.querySelector(".describe");
          const btnDescribe = thisBlock.querySelector(".btnDescribe");
          pDescribe.classList.toggle("show");
          btnDescribe.classList.toggle("show");
        };
    });

    
    renderGraphic(dataConst);

    
    })
  .catch(error => {
    console.error("Error loading infoJSON.json:", error);
});
}
  
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
//реклама

class AD{
  adAdd(){

    setTimeout(()=>{
          let advertise = document.querySelector(".advertise");
          advertise.classList.add("show");

          const timer = document.querySelector(".timer");
          const close = document.querySelector(".close");
      
          let sec = 6;
          const count = () => {
            sec--;
            timer.innerHTML = sec;
      
            if (sec === 0) {
              timer.style.display = "none";
              close.style.display = "block";
              
              close.addEventListener("click", this.adRemove);

            } else {
              setTimeout(count, 1000);
            }
          };

          count();
      },6000);

    
  }

  adRemove(){
    let advertise = document.querySelector(".advertise");
    advertise.classList.remove("show");
  }
}

function filterData(dataConst){
  

  
  let searchText = document.querySelector(".searchInput");
  let byPrice = document.querySelector(".priceSelection");
  let fromPrice = document.querySelector(".fromPrice");
  let toPrice = document.querySelector(".toPrice");

  let content = searchText.value;
  let data = dataConst;
  let blocks = document.querySelector(".blocks");
  blocks.innerHTML = "";

  if(content !== ""){
          
    let data_filtered = [];

    let i = 0;
    while(i < dataConst.length){
      if(dataConst[i].name.toLowerCase().includes(content.toLowerCase())){ //tolovercasw щоб не враховувати регістр
          data_filtered.push(dataConst[i]);
      }
      i++;
      }
    data = data_filtered;
    
            
  }

  if(byPrice.value === "growth")
    data = alasql('SELECT * FROM ? ORDER BY price ASC', [data]);
  

  if(byPrice.value === "decline")
    data = alasql('SELECT * FROM ? ORDER BY price DESC', [data]);

  if(fromPrice.value !== "")
    data = alasql('SELECT * FROM ? WHERE price > ?', [data, parseFloat(fromPrice.value)]);

  if(toPrice.value !== "")
    data = alasql('SELECT * FROM ? WHERE price < ?', [data, parseFloat(toPrice.value)])

  addBlocks(data);
  renderGraphic(data);
  
  return data;
}


function renderGraphic(array){


  console.log(array);
  let dataSet = alasql('SELECT type as label, COUNT(*) as y FROM ? GROUP BY type', [array]);

  chart = new CanvasJS.Chart("chartContainer", {
      
      backgroundColor: "transparent",

      colorSet:"whiteColorSet",
      
      axisX: {
          labelFontColor: "white"
      },
      axisY: {
          labelFontColor: "white"
      },
      title:{
          text: "Items",
          fontColor:"white",
          fontFamily:"Helvetica"
      },
      toolTip:{ 
          fontColor:"Black",
          content: "{label} : {y}",
          //content: "",
          //backgroundColor: "transparent",
      
      },
      data: [{
          type: "pie",
          indexLabelFontColor: "white",
          toolTipContent:"{label}:{y}",
          indexLabel: "{label} {y}",
           
          // indexLabelLineThickness: 0,
          showInLegend: false,
          //legendText: "{label}",
          dataPoints: dataSet,
          
      }]
    });
  

  
    let column = document.querySelector(".Column");
    let pie = document.querySelector(".Pie");
    let linear = document.querySelector(".Linear");

    column.addEventListener("click", ()=>{
        chart.data[0].set("type", "column");
        chart.render();
    })
    pie.addEventListener("click", ()=>{
        chart.data[0].set("type", "pie");
        chart.render();
    })
    linear.addEventListener("click", ()=>{
        chart.data[0].set("type", "line");
        chart.render();
    })

  chart.render();

}









  
