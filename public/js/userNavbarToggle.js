document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("loginButton");
  const registerButton = document.getElementById("registerButton");
  const profileButton = document.getElementById("profileButton");
  const logoutButton = document.getElementById("logoutButton");
  const points = document.getElementById("points");
  // Check if token exists in local storage
  const token = localStorage.getItem("token");
  const loginMessage = document.getElementById('loginMessage')

  if (token) {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      if (responseStatus == 200) {
        // Token exists, show profile button and hide login and register buttons
        loginButton.classList.add("d-none");
        registerButton.classList.add("d-none");
        profileButton.classList.remove("d-none");
        logoutButton.classList.remove("d-none");
        // Show the user's points
        points.classList.remove("d-none");
        points.innerText = `Points: ${responseData.rows[0].points}`;
        // Show login and register buttons
        loginMessage.classList.add("d-none");
      }
      else {
          localStorage.removeItem("token");
          window.location.href = "login.html";
      }
    };
 
    // Getting User's points
    fetchMethod(currentUrl + "/api/user/survey/points", callback, "GET", null, localStorage.getItem("token"));
  } else {
    // Token does not exist, show login and register buttons and hide profile and logout buttons
    loginButton.classList.remove("d-none");
    registerButton.classList.remove("d-none");
    profileButton.classList.add("d-none");
    logoutButton.classList.add("d-none");
    points.classList.add("d-none");
  }
 
  logoutButton.addEventListener("click", function () {
    // Remove the token from local storage and redirect to index.html
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });
});