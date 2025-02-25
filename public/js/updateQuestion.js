document.addEventListener("DOMContentLoaded", function () {
  url = new URL(document.URL);
  const urlParams = url.searchParams;
  const id = urlParams.get("id");
  const form = document.getElementById("updateQuestionForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const callbackForUpdate = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      if (responseStatus == 204) {
        // Redirect or perform further actions for logged-in user
        window.location.href = "updateQuestion.html?id=" + id;
      } else {
        alert(responseData.message);
      }
    };

    //Data stored in question
    const question = document.getElementById("newQuestion").value;
    const data = {
      question: question,
    };
    fetchMethod(currentUrl + "/api/question/" + id, callbackForUpdate, "PUT", data, localStorage.getItem("token"));
  });
});
