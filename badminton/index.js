
function showMessage() {
  alert("Welcome to APUFit Badminton Club! Let's smash some goals!");
}


document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll("nav ul li a");

  menuItems.forEach((item) => {
    item.addEventListener("mouseover", function () {
      item.style.color = "#ff5722"; 
      item.style.transition = "color 0.3s ease"; 
    });

    item.addEventListener("mouseout", function () {
      item.style.color = ""; 
    });
  });

  
  const heroText = document.querySelector(".hero h2");

  setTimeout(() => {
    heroText.style.transform = "scale(1.1)";
    heroText.style.transition = "transform 0.5s ease-in-out";
  }, 500);
});
