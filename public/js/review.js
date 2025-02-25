document.addEventListener("DOMContentLoaded", function () {

    const createReviewForm = document.getElementById("createReviewForm");
    const rateInputs = document.querySelectorAll('.rate input[type="radio"]');

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus == 201) {
            // Reset the form fields
            createReviewForm.reset();
            window.location.reload()
        } else if (responseStatus == 401) {
            localStorage.removeItem("token");
            window.location.href = "login.html";
        } else {
            alert(responseData.message);
        }
    };

    //Display all reviews with edit and delete buttons
    const callbackForShowReviews = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const reviewList = document.getElementById("Reviews");
        responseData.forEach((review) => {
            const displayItem = document.createElement("div");
            displayItem.className =
                `col-xl-4 col-lg-5 col-md-5 col-sm-6 col-xs-12 p-3 px-2`;
            displayItem.innerHTML = `
                <div class="container">
                    <div class="conatiner" style="background-color: rgba(0, 0, 0, 0.8); padding: 15px; border: solid; border-radius: 10px; border-color: #D3D3D3">
                        <h5 class="card-title" style="color: #D3D3D3; font-size:15px; font-weight: bold;">Username: ${review.username}</h5>
                        <div class="row">
                            <div class="col-12">
                            <p class="card-text"  style="color: #D3D3D3;">                                
                                User ID: ${review.user_id} <br>
                                Rating: <strong>${review.rating_amt}</strong> <br>
                                Creation Date: ${review.created_at} <br>
                            </p>
                            </div>
                        </div>
                        <div class="button-group">
                            <a class="btn updatebutton allbutton" id="edit-${review.review_id}">Edit</a>
                            <a class="btn deletebutton allbutton" id="delete-${review.review_id}">Delete</a>
                        </div>
                    </div>

                    <div id="editForm-${review.review_id}" style="display: none; background-color: rgba(0, 0, 0, 0.8); padding: 15px; border: solid; border-radius: 10px; border-color: #D3D3D3">
                        <div class="ratechange mx-auto">
                            <input type="radio" id="star5-${review.review_id}" name="ratechange" value="5" />
                            <label for="star5-${review.review_id}" title="text">5 stars</label>
                            <input type="radio" id="star4-${review.review_id}" name="ratechange" value="4" />
                            <label for="star4-${review.review_id}" title="text">4 stars</label>
                            <input type="radio" id="star3-${review.review_id}" name="ratechange" value="3" />
                            <label for="star3-${review.review_id}" title="text">3 stars</label>
                            <input type="radio" id="star2-${review.review_id}" name="ratechange" value="2" />
                            <label for="star2-${review.review_id}" title="text">2 stars</label>
                            <input type="radio" id="star1-${review.review_id}" name="ratechange" value="1" />
                            <label for="star1-${review.review_id}" title="text">1 star</label>
                        </div>
                        <div class="button-group-edit p-2">
                            <a href="#" class="btn submitbutton allbutton" id="confirm-${review.review_id}" style="margin-top: 5px;">Confirm Changes</a>
                            <a href="#" class="btn btn-secondary allbutton" id="cancel-${review.review_id}" style="margin-top: 5px;">Cancel</a>
                        </div>
                    </div>
                </div>
                `;
            reviewList.appendChild(displayItem)

            //Button to delete review
            const deleteButton = document.getElementById(`delete-${review.review_id}`);
            deleteButton.addEventListener("click", (event) => {
                event.preventDefault();
                const callbackForDelete = (responseStatus, responseData) => {
                    if (responseStatus == 204) {
                        console.log("responseStatus:", responseStatus);
                        console.log("responseData:", responseData);
                        window.location.reload();
                    } else if (responseStatus == 401) {
                        localStorage.removeItem("token");
                        window.location.href = "login.html";
                    } else {
                        alert(responseData.message);
                    }
                };
                fetchMethod(currentUrl + "/api/review/" + review.review_id, callbackForDelete, 'DELETE', null, localStorage.getItem("token"));
            });

            //Button to edit review
            const editButton = document.getElementById(`edit-${review.review_id}`);
            editButton.addEventListener("click", (event) => {
                event.preventDefault();
                document.getElementById(`editForm-${review.review_id}`).style.display = 'block';
            });

            //Buttonto confirm to edit the review
            const confirmButton = document.getElementById(`confirm-${review.review_id}`);
            confirmButton.addEventListener("click", (event) => {
                event.preventDefault();
                const rateInputsEdit = document.querySelectorAll('.ratechange input[type="radio"]');

                let selectedStars = 0;
                rateInputsEdit.forEach((input) => {
                    if (input.checked) {
                        selectedStars = input.value;
                    }
                });
                console.log("Selected stars:", selectedStars);

                const data = {
                    rating_amt: selectedStars
                };
                const callbackForEdit = (responseStatus, responseData) => {
                    console.log("responseStatus:", responseStatus);
                    console.log("responseData:", responseData);
                    if (responseStatus === 204) {
                        window.location.reload()
                    } else if (responseStatus == 401) {
                        localStorage.removeItem("token");
                        window.location.href = "login.html";
                    } else {
                        alert(responseData.message)
                    }
                };

                fetchMethod(currentUrl + `/api/review/${review.review_id}`, callbackForEdit, 'PUT', data, localStorage.getItem("token"));
            });

            //Button to cancel modification of the review
            const cancelButton = document.getElementById(`cancel-${review.review_id}`);
            cancelButton.addEventListener("click", (event) => {
                event.preventDefault();
                document.getElementById(`editForm-${review.review_id}`).style.display = 'none';
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
    fetchMethod(currentUrl + "/api/review", callbackForShowReviews);

    //By submiting the form, data is stored in rating_amt
    createReviewForm.addEventListener("submit", function (event) {
        console.log("createReviewForm.addEventListener");
        event.preventDefault();

        let selectedStars = 0;
        rateInputs.forEach((input) => {
            if (input.checked) {
                selectedStars = input.value;
            }
        });
        console.log("Selected stars:", selectedStars);

        const data = {
            rating_amt: selectedStars
        };
        // Perform login request
        fetchMethod(currentUrl + "/api/review", callback, "POST", data, localStorage.getItem("token"));
    });
});