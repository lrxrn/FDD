const modal = document.getElementById("modal");
const joinButtons = document.querySelectorAll(".join-btn");
const closeBtn = document.querySelector(".close-btn");
const teamForm = document.getElementById("teamForm");
const playerFields = document.getElementById("playerFields");

// Show modal and update fields based on player format
joinButtons.forEach(button => {
  button.addEventListener("click", () => {
    const format = button.getAttribute("data-format");
    playerFields.innerHTML = "";

    for (let i = 1; i <= format; i++) {
      const label = document.createElement("label");
      label.textContent = `Player ${i}:`;

      const input = document.createElement("input");
      input.type = "text";
      input.name = `player${i}`;
      input.required = true;

      playerFields.appendChild(label);
      playerFields.appendChild(input);
    }

    modal.style.display = "block";
  });
});

closeBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

teamForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("✅ Team Registered Successfully!");
  modal.style.display = "none";
  teamForm.reset();
});
