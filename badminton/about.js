document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});


document.querySelector('.btn-join').addEventListener('click', function() {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <h2>🎉 You're one step away from joining!</h2>
      <p>We’re excited to have you with us! Please fill out the form below to become a part of the APUFit Badminton Club!</p>
      <form>
        <input type="text" placeholder="Full Name" required>
        <input type="email" placeholder="Email" required>
        <button type="submit">Join Now</button>
      </form>
      <button class="close-btn">Close</button>
    </div>
  `;
  document.body.appendChild(modal);


  modal.querySelector('.close-btn').addEventListener('click', () => {
    modal.remove();
  });


  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.remove();
    }
  });
});


const highlights = document.querySelectorAll('.highlight-card');

window.addEventListener('scroll', () => {
  highlights.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      card.classList.add('animated');
    } else {
      card.classList.remove('animated');
    }
  });
});
