document.addEventListener("DOMContentLoaded", () => {
  console.log("Meet the Team page loaded.");

  // Scroll to Top button logic (optional enhancement)
  const scrollBtn = document.createElement("button");
  scrollBtn.textContent = "↑ Top";
  scrollBtn.id = "scrollTopBtn";
  document.body.appendChild(scrollBtn);

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Show button only when scrolling down
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });
});

