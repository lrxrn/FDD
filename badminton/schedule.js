document.addEventListener('DOMContentLoaded', () => {
  function setupTrainerTabs() {
    const trainerButtons = document.querySelectorAll('.availability .days button');
    const trainerTabs = document.querySelectorAll('.trainer-tab-content');

    trainerButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active classes
        trainerButtons.forEach(btn => btn.classList.remove('active'));
        trainerTabs.forEach(tab => tab.classList.remove('active'));

        // Add active to current
        button.classList.add('active');
        const targetId = button.textContent.toLowerCase() + '-trainer';
        const activeTab = document.getElementById(targetId);
        if (activeTab) activeTab.classList.add('active');
      });
    });
  }

function showTrainer(day) {
  const tabs = document.querySelectorAll('.trainer-tab-content');
  tabs.forEach(tab => tab.classList.remove('active'));

  const activeTab = document.getElementById(`${day}-trainer`);
  if (activeTab) activeTab.classList.add('active');
}

  function setupCourtTabs() {
    const courtButtons = document.querySelectorAll('.court-tab-button');
    const courtTabs = document.querySelectorAll('.court-tab-content');

    courtButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active classes
        courtButtons.forEach(btn => btn.classList.remove('active'));
        courtTabs.forEach(tab => tab.classList.remove('active'));

        // Add active to current
        const targetId = button.dataset.target;
        const activeTab = document.getElementById(targetId);
        if (activeTab) {
          button.classList.add('active');
          activeTab.classList.add('active');
        }
      });
    });
  }

  setupTrainerTabs();
  setupCourtTabs();
});
