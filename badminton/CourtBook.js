document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("booking-form");
  const confirmation = document.getElementById("confirmation");

  form.addEventListener("submit", function (e) {
    e.preventDefault();


    form.style.display = "none";
    confirmation.style.display = "block";
  });
});
