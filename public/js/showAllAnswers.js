url = new URL(document.URL);
const urlParams = url.searchParams;
const id = urlParams.get("id");

const callbackForquestionInfo = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const answerList = document.getElementById("answerList");

    //DIsplay all answers
    responseData.forEach((answer) => {
        const displayItem = document.createElement("div");
        displayItem.className = "col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 p-4";
        displayItem.innerHTML = `
              <div class="container" style="background-color: rgba(0, 0, 0, 0.8); padding: 15px; border: solid; border-radius: 10px; border-color: #D3D3D3">
                <div class="card-body">
                    <p class="card-text" style="color: #D3D3D3;">
                        User ID: ${answer.participant_id} <br>
                        Answer: ${answer.answer} <br>
                        Additional Notes: ${answer.additional_notes} <br>
                    </p>
                </div>
            </div>
        `;
        answerList.appendChild(displayItem);
    });

};


fetchMethod(currentUrl + `/api/question/${id}/answer`, callbackForquestionInfo);