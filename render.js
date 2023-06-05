CanvasJS.addColorSet("whiteColorSet", [
    
    "#E5E5E5",
    "#CCCCCC",
    "#BFBFBF",
    "#A6A6A6",
    "#999999",
    "#8C8C8C",
   "#404040",
   "#363636",
   "#494949",
   "#5C5C5C",
   "#6F6F6F",
  ])
  
  
blocks = document.querySelector(".blocks");

addButtonsListeners();
renderCards();


renderSubscribePage();

let Ad1 = new AD();
Ad1.adAdd();

window.onscroll = function () {
    if (window.pageYOffset > (window.innerHeight / 2)) {
        document.getElementById("goUp").classList.add("show");
      } else {
        document.getElementById("goUp").classList.remove("show")
      }
};

