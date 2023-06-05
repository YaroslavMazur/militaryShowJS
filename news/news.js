renderNews();

function renderNews(){

    fetch("newsJSON.json")
    .then(response => response.json())
    .then(newsJSON => {

        let column1 = document.querySelector(".news-column-1");
        let newsBlock = document.querySelector(".news-column-2");
        

        newsBlock.innerHTML = "";
        let news = "";
        let titles = "";
        let nowDate = moment();

        newsJSON = newsJSON.sort(function(a, b){
            let dateA = moment(a.date),
            dateB= moment(b.date);
            return dateA-dateB 
        })

        
        window.onresize = function() {

            let allNews = document.querySelectorAll(".news-item-text");
            if (window.innerWidth < 1300){
                column1.style.display = "none";
                allNews.forEach((obj)=>{
                    obj.classList.add("remove");
                })
                
            }
            else {
                column1.style.display = "flex";
                allNews.forEach((obj)=>{
                    obj.classList.remove("remove");
                })
            }
 
        };


        

        for(let i = newsBlock.childElementCount;i < newsJSON.length;i++){

            newsJSON[i].date = moment(newsJSON[i].date,"YYYY.MM.DD HH:mm");

            if(newsJSON[i].date.isBefore(nowDate)){
                news += `
                <div class = "news-item">
                    <p class = "news-item-title">${newsJSON[i].title}</p>
                    <p class = "news-item-text">${newsJSON[i].text}</p>
                    <div class = "news-item-date-container">
                        <p class = "date-year">${newsJSON[i].date.format("HH:mm")}</p>
                        <p class="date-time">${newsJSON[i].date.format("YYYY.MM.DD")}</p>
                    </div>
                </div>
                `
            }

        }
        newsBlock.innerHTML += news;

        for(let i = column1.childElementCount;i < newsJSON.length;i++){

            if(newsJSON[i].date.isBefore(nowDate) && newsJSON[i].importance === "1"){
                titles += `
                <div class = "importance-container">
                    <p class = "importance-title">${newsJSON[i].title}</p>
                </div>
                `
            }

        }

        column1.innerHTML += titles;

        let newsContainer = document.querySelector(".news-container");

        newsContainer.addEventListener("click", (event)=>{
            if(event.target.classList.contains("importance-title")){
                let textToOpen = event.target.innerHTML;

                openNews(textToOpen, newsJSON);
                console.log(textToOpen)
            }
        //console.log(event.target);

        let newsClose = document.querySelector(".news-close");

        newsClose.addEventListener("click",()=>{
            document.querySelector(".news-scaled").style.display = "none";
        })
    })
    })
    .catch(error => {
        console.error("Error loading newsJSON.json:", error);
    });


    let cart_open = document.querySelector(".cart-open");
    cart_open.addEventListener("click", () => {
        open_cart();
    })

    addButtonsListeners();
}


function openNews(textToOpen,newsJSON){
    let newsScaled = document.querySelector(".news-scaled");
    let newsScaledTitle = document.querySelector(".news-scaled-title");
    let newsScaledText = document.querySelector(".news-scaled-text");

    
    let findedNews = newsJSON.find(obj => obj.title === textToOpen);
    
    newsScaledTitle.innerHTML = findedNews.title;
    newsScaledText.innerHTML = findedNews.text;
    
    newsScaled.style.display = "flex";

}

renderSubscribePage();
