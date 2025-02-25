//Animation for points
function animatePoints(element, newValue, duration = 1000) {
    const startValue = parseInt(element.textContent.slice(8).trim());
    const startTime = performance.now();

    function updatePoints(timestamp) {
        const elapsedTime = timestamp - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentValue = Math.floor(startValue + (newValue - startValue) * progress);

        element.textContent = `Points: ${currentValue}`;

        if (progress < 1) {
            requestAnimationFrame(updatePoints);
        } else {
            element.textContent = `Points: ${newValue}`; // Ensure final value is set
        }
    }

    requestAnimationFrame(updatePoints);
}

//Display all questions
const questionsCallback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const questionList = document.getElementById("questionList");
    responseData.rows.forEach((question) => {
        const displayItem = document.createElement("div");
        displayItem.className = "col-12 p-2";
        displayItem.innerHTML = `
        <div class="container" style="margin-left: 20px;">
            <div class="container" style="background-color: rgba(0, 0, 0, 0.8); padding: 15px; border: solid; border-radius: 10px; border-color: #D3D3D3">
                <h5 class="card-title" style="color: #D3D3D3; font-size:15px; font-weight: bold;">${question.question} (Creator ID: ${question.creator_id})</h5>
                <form id="createAnswerForm-${question.question_id}">
                    <div class="form-check" style="color: #D3D3D3;">
                        <input class="form-check-input" type="radio" name="flexRadioDefault${question.question_id}" id="flexRadioTrue${question.question_id}" value="true">
                        <label class="form-check-label" for="flexRadioTrue${question.question_id}">
                            True
                        </label>
                    </div>
                    <div class="form-check" style="color:  #D3D3D3;">
                        <input class="form-check-input" type="radio" name="flexRadioDefault${question.question_id}" id="flexRadioFalse${question.question_id}" value="false">
                        <label class="form-check-label" for="flexRadioFalse${question.question_id}">
                            False
                        </label>
                    </div>
                    <div class="mb-3" style="color: #D3D3D3;">
                        <label for="additional_notes${question.question_id}" class="form-label">Additional Notes</label>
                        <input class="form-control" type="text" id="additional_notes${question.question_id}"  placeholder="35 characters only" maxlength="35" required aria-label="default input example">            
                    </div>
                    <div style="display: flex;">
                        <a href="#" class="btn submitbutton allbutton" id="submit-${question.question_id}">Submit Answer</a>
                        <a href="#" class="btn updatebutton allbutton" id="update-${question.question_id}" style="margin-left: 10px;">Edit</a>
                        <a href="#" class="btn deletebutton allbutton" id="delete-${question.question_id}" style="margin-left: 10px;">Delete</a>
                        <a href="#" class="btn viewbutton allbutton" id="viewAnswer-${question.question_id}" style="margin-left: auto;">View All Answer</a>
                    </div>
                </form>                
            </div>
        </div>
        `;

        questionList.appendChild(displayItem);

        //button to submit answers for each question
        const submitButton = document.getElementById(`submit-${question.question_id}`);
        submitButton.addEventListener("click", (event) => {
            event.preventDefault();

            // Get selected radio button value
            const selectedAnswerElement = document.querySelector(`input[name="flexRadioDefault${question.question_id}"]:checked`);
            const additionalNotesElement = document.getElementById(`additional_notes${question.question_id}`);
            const additionalNotesValue = additionalNotesElement.value.trim();

            if (!selectedAnswerElement) {
                alert("Please select an answer (True or False).");
                return;
            }

            if (additionalNotesValue === "") {
                alert("Please fill in the additional notes.");
                return;
            }

            const selectedAnswer = selectedAnswerElement.value;
            const booleanAnswer = toBoolean(selectedAnswer);

            // Data to send to the controller
            const answer = {
                question_id: question.question_id,
                answer: booleanAnswer,
                notes: additionalNotesValue
            };

            const form = document.getElementById(`createAnswerForm-${question.question_id}`);

            const callbackForSubmit = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);

                if (responseStatus == 401) {
                    localStorage.removeItem("token");
                    window.location.href = "login.html";
                }

                if (responseStatus === 201) {
                    form.reset();
                    const points = document.getElementById("points");
                    var oldPoints = parseInt(points.textContent.slice(8));
                    animatePoints(points, oldPoints + 5, 800);
                }
                // Handle the response as needed
            };

            fetchMethod(currentUrl + `/api/question/token/${answer.question_id}/answer`, callbackForSubmit, 'POST', answer, localStorage.getItem("token"));
        });

        //Button to edit the question
        const updateButton = document.getElementById(`update-${question.question_id}`);
        updateButton.addEventListener("click", (event) => {
            event.preventDefault();
            const callbackForUpdate = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
                window.location.reload();

                if (responseStatus == 409) {
                    alert(responseData.message);
                } else {
                    window.location.href = `updateQuestion.html?id=${question.question_id}`;
                }
            };

            fetchMethod(currentUrl + "/api/question/" + question.question_id, callbackForUpdate, 'PUT', null, localStorage.getItem("token"));
        });

        //Button to delete question and answers of the question deleted
        const deleteButton = document.getElementById(`delete-${question.question_id}`);
        deleteButton.addEventListener("click", (event) => {
            event.preventDefault();
            const callbackForDelete = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
                window.location.reload();

                if (responseStatus == 409) {
                    alert(responseData.message);
                }

                if (responseStatus == 401) {
                    localStorage.removeItem("token");
                    window.location.href = "login.html";
                }
            };
            fetchMethod(currentUrl + "/api/question/" + question.question_id, callbackForDelete, 'DELETE', null, localStorage.getItem("token"));
        });

        //Button to show all answers for the particiular question
        const getButton = document.getElementById(`viewAnswer-${question.question_id}`);
        getButton.addEventListener("click", (event) => {
            event.preventDefault();
            const callbackForUpdate = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
                window.location.reload();


                if (responseStatus == 401) {
                    localStorage.removeItem("token");
                    window.location.href = "login.html";
                } else 
                if (responseStatus == 404) {
                    alert(responseData.message);
                } else {
                    window.location.href = `showAnswer.html?id=${question.question_id}`;
                }
            };

            fetchMethod(currentUrl + "/api/question/" + question.question_id + "/answer", callbackForUpdate, 'GET', null, localStorage.getItem("token"));
        });
    });

    // Event listener for character count
    questionList.querySelectorAll('.question-input').forEach(input => {
        input.addEventListener('input', () => {
            const maxLength = parseInt(input.getAttribute('maxlength'));
            const currentLength = input.value.length;
            const remaining = maxLength - currentLength;
            const countElement = input.nextElementSibling;
            countElement.textContent = `${remaining} characters remaining`;
        });
    });

    //To disable buttons when not logged in
    var token = localStorage.getItem("token");
        if (token == null) {
            var buttons = document.querySelectorAll('.allbutton');
            buttons.forEach(function (button) {
                button.classList.add("disabled");
            });
        }
};

fetchMethod(currentUrl + "/api/question", questionsCallback);

function toBoolean(value) {
    return value.toLowerCase() === "true";
}
