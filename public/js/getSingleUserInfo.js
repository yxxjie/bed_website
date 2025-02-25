document.addEventListener("DOMContentLoaded", function () {
  const url = new URL(document.URL);
  const urlParams = url.searchParams;
  const userId = urlParams.get("user_id");

  const callbackForUserInfo = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const userInfo = document.getElementById("userInfo");

    if (responseStatus == 404) {
      userInfo.innerHTML = `${responseData.message}`;
      return;
    }

    // Format wallet with commas
    const formattedWallet = responseData.wallet.toLocaleString();

    //Display user info
    userInfo.innerHTML = `
        <div class="container">
             <div class="container" style="background-color: rgba(0, 0, 0, 0.8); padding: 15px; border: solid; border-radius: 10px; border-color: #D3D3D3">
                <p class="card-text" style="color: #D3D3D3;">
                    User ID: ${responseData.id} <br>
                    Username: ${responseData.username} <br>
                    Email: ${responseData.email} <br>
                    Points: ${responseData.points} <br>
                    Wallet: $${formattedWallet} <br>
                    Net Worth: ${responseData.status} <br>
                    Created On: ${responseData.created_on} <br>
                </p>
            </div>
        </div>
    `;
  };


  const callbackForUserCar = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    //Display all cars owned by the user
    const userCarList = document.getElementById("userCarList");
    responseData.forEach((car) => {
      const displayItem = document.createElement("div");
      displayItem.className = "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
      displayItem.innerHTML = `
          <div class="container">
            <div class="container car-container" style="background-color: #303030; padding: 15px; border-radius: 5px; display: flex; flex-direction: column; align-items: center;">
              <img src="../images/photo${car.id}.jpg" class="card-img-top car-image" id="cars">
              <h5 class="card-title" style="color: #D3D3D3; font-size:30px; font-weight: bold; margin-top:10px;">${car.brand}</h5>
              <p class="card-text" style="color: #D3D3D3; text-align: center;">
                HP: ${car.hp} <br>
                Top Speed: ${car.speed} km/hr <br>
              </p>
            </div>
          </div>
          <style>
        .car-container {
            transition: transform 0.3s ease-in-out;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .car-container:hover {
            transform: scale(1.05);
        }
        .car-image {
            height: 300px;
            width: 300px;
            object-fit: cover;
            object-position: center;
            border-radius: 10px;
        }
    </style>
          `;
      userCarList.appendChild(displayItem);
    });
  };



  fetchMethod(currentUrl + `/api/user/${userId}`, callbackForUserInfo);
  fetchMethod(currentUrl + `/api/user/${userId}/car`, callbackForUserCar);
});
