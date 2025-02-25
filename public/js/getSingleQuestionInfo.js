url = new URL(document.URL);
const urlParams = url.searchParams;
const id = urlParams.get("id");

const callbackForquestionInfo = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const questionInfo = document.getElementById("questionInfo");

  if (responseStatus == 404) {
    questionInfo.innerHTML = `${responseData.message}`;
    return;
  }

  //Show the question info when editing the question
  questionInfo.innerHTML = `
          <div class="container">
                <div class="container" style="background-color: rgba(0, 0, 0, 0.8); padding: 15px; border: solid; border-radius: 10px; border-color: #D3D3D3">
                <p class="card-text" style="color: #D3D3D3">
                    Creator ID: ${responseData.creator_id} <br>
                    Question: ${responseData.question} <br>
                    Created On: ${responseData.created_on} <br>
                </p>
            </div>
        </div>
    `;
};
 
fetchMethod(currentUrl + `/api/question/${id}`, callbackForquestionInfo);