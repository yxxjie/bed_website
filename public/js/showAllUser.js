const callback = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  if (responseStatus == 401) {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  }

  //Display all users that has been registered
  const userList = document.getElementById("userList");
  responseData.rows.forEach((user) => {
    const displayItem = document.createElement("div");
    displayItem.className =
      "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
    displayItem.innerHTML = `
        <div class="container">
            <div class="container" style="background-color: rgba(0, 0, 0, 0.8); padding: 15px; border: solid; border-radius: 10px; border-color: #D3D3D3">
               <h5 class="card-title" style="color: #D3D3D3; font-size: 20px; font-weight: bold;">${user.username}</h5>
                <p class="card-text" style="color: #D3D3D3;">                     
                    Points: ${user.points} <br>
                    Created On: ${user.created_on} <br>
                </p>
                <a href="#" class="btn viewbutton" id="update-${user.id}">View Details</a>
                <a href="#" class="btn updatebutton" id="update2-${user.id}">Convert Points</a>
            </div>
        </div>
        `;
    userList.appendChild(displayItem);

    //Button to change the user's username
    const updateButton = document.getElementById(`update-${user.id}`);
    updateButton.addEventListener("click", (event) => {
      event.preventDefault();
      const callbackForUpdate = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        window.location.reload();

        if (responseStatus == 409) {
          alert(responseData.message)
        }
        else window.location.href = `updateUser.html?user_id=${user.id}`;
      };

      fetchMethod(currentUrl + "/api/user/" + user.id, callbackForUpdate, 'PUT', null, localStorage.getItem("token"));
    });

    //Button to convert points to money
    const updateButton2 = document.getElementById(`update2-${user.id}`);
    updateButton2.addEventListener("click", (event) => {
      event.preventDefault();
      const callbackForUpdate = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        window.location.reload();

        if (responseStatus == 409) {
          alert(responseData.message)
        }
        else window.location.href = ` updatePoints.html?user_id=${user.id}`;
      };

      fetchMethod(currentUrl + "/api/user/" + user.id + "/money", callbackForUpdate, 'PUT', null, localStorage.getItem("token"));
    });
  });
};

fetchMethod(currentUrl + "/api/user", callback, "GET", null, localStorage.getItem("token"));




