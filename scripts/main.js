document.addEventListener('DOMContentLoaded', function() {
  const chatNavLinks = document.querySelectorAll('.chat-nav-link');

  chatNavLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();

      const id = this.dataset.id;

      if (id === "clearer") {
        localStorage.removeItem('storedMessages');
      }

      window.location.href = '../pages/chat.html';
    });
  });
});