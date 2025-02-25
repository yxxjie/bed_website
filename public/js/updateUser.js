document.addEventListener("DOMContentLoaded", function () {
  url = new URL(document.URL);
  const urlParams = url.searchParams;
  const user_id = urlParams.get("user_id");
  const form = document.getElementById("updateNameForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const callbackForUpdate = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      if (responseStatus == 401) {
        localStorage.removeItem("token");
        window.location.href = "login.html";
      }

      if (responseStatus == 204) {
        // Redirect or perform further actions for logged-in user
        window.location.href = "updateUser.html?user_id=" + user_id;
      } else {
        alert(responseData.message);
      }
    };

    //Data stored in username
    const username = document.getElementById("newUserName").value;
    const data = {
      username: username,
    };
    fetchMethod(currentUrl + "/api/user/" + user_id, callbackForUpdate, "PUT", data, localStorage.getItem("token"));
  });
});
