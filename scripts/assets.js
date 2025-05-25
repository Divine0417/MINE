// Only add event listener if the form exists
const nameForm = document.getElementById("nameForm");
if (nameForm) {
  nameForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("nameInput").value;
    window.location.href = `welcome.html?name=${encodeURIComponent(name)}`;
  });
}

// Only update welcome message if the element exists
const welcomeMsg = document.getElementById("welcomeMsg");
if (welcomeMsg) {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');
  if (name) {
    welcomeMsg.textContent = `Welcome, ${name}! 🎉`;
  }
}