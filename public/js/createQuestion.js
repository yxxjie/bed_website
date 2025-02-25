document.addEventListener("DOMContentLoaded", function () {
  const createQuestionForm = document.getElementById("createQuestionForm");

  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    if (responseStatus == 401) {
      localStorage.removeItem("token");
      window.location.href = "login.html";
    }

    if (responseStatus == 201) {
      // Reset the form fields
      createQuestionForm.reset();
      // Check if create question was successful
      window.location.href = "question.html";
    } else {
      alert(responseData.message);
    }
  };

  createQuestionForm.addEventListener("submit", function (event) {
    console.log("createQuestionForm.addEventListener");
    event.preventDefault();

    const question = document.getElementById("question").value;

    const data = {
      question: question,
    };
    // Perform login request
    fetchMethod( currentUrl + "/api/question", callback, "POST", data, localStorage.getItem("token"));
  });
});
