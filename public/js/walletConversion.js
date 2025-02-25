document.addEventListener("DOMContentLoaded", function () {
  url = new URL(document.URL);
  const urlParams = url.searchParams;
  const user_id = urlParams.get("user_id");
  const form = document.getElementById("pointsConversionForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const callbackForUpdate = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      if (responseStatus == 204) {
        // Redirect or perform further actions for logged-in user
        window.location.href = "updateUser.html?user_id=" + user_id      ;
      } else {
        alert(responseData.message);
        window.location.href = "updatePoints.html?user_id=" + user_id 

      }
    };

    //Data stored in pointsAmount
    const pointsAmount = document.getElementById("pointsConversionInput").value;
    const data = {
      pointsAmount: pointsAmount,
    };
    fetchMethod(currentUrl + "/api/user/" + user_id + "/money", callbackForUpdate, "PUT", data, localStorage.getItem("token"));
  });
});
