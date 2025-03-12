document.addEventListener("DOMContentLoaded", async function () {
  try {
    const navbarHTML = await fetch("/navbar.html").then((res) => res.text());
    document.getElementById("navbar-container").innerHTML = navbarHTML;
  } catch (error) {
    console.error("Error loading the navbar:", error);
  }
});
