function animateWallet(element, newValue, duration = 1000) {
  const startValue = parseInt(element.textContent.slice(8).trim().replace(/,/g, ''));
  const startTime = performance.now();

  function updateWallet(timestamp) {
    const elapsedTime = timestamp - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const currentValue = Math.floor(startValue + (newValue - startValue) * progress);

    // Format the currentValue with commas
    element.textContent = `Wallet: $${currentValue.toLocaleString()}`;

    if (progress < 1) {
      requestAnimationFrame(updateWallet);
    } else {
      // Ensure the final value is set and formatted with commas
      element.textContent = `Wallet: $${newValue.toLocaleString()}`;
    }
  }

  requestAnimationFrame(updateWallet);
}


const callback = (responseStatus, responseData) => {
  console.log("Response Status:", responseStatus);
  console.log("Response Data:", responseData);

  const carList = document.getElementById("carList");
  carList.innerHTML = ""; // Clear existing items

  //Show all cars in the dealership
  responseData.rows.forEach((car) => {
    const displayItem = document.createElement("div");
    displayItem.className = "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
    displayItem.innerHTML = `
      <div class="container">
      <div class="container car-container" style="background-color: #303030; padding: 15px; border-radius: 5px; display: flex; flex-direction: column; align-items: center;">
        <img src="../images/photo${car.id}.jpg" class="card-img-top car-image" id="cars">
        <h5 class="card-title" style="color: #D3D3D3; font-size:30px; font-weight: bold; margin-top:10px;">${car.brand}</h5>
        <p class="card-text" style="color: #D3D3D3; text-align: center;">
            HP: ${car.hp} <br>
            Top Speed: ${car.speed}km/hr <br>
            Price: $${car.cost.toLocaleString()} <br>
            Status Gain: ${car.status_gain} <br><br>
            <a href="#" class="btn purchasebutton allbutton" id="update-${car.id}" data-id="${car.id}">Purchase</a>
        </p>
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
            box-shadow: 0 1px 8px  rgb(255, 255, 255);
            transition: transform 0.5s ease, box-shadow 0.5s ease;
        }
        .car-image {
            height: 300px;
            width: 300px;
            object-fit: cover;
            object-position: center;
            border-radius: 10px;
        }
    </style>
</div>


    `;
    carList.appendChild(displayItem);

    //Button to purchase car
    const updateButton = document.getElementById(`update-${car.id}`);
    updateButton.addEventListener("click", (event) => {
      event.preventDefault();
      const carId = event.target.getAttribute("data-id");

      const callbackForUpdate = (responseStatus, responseData) => {
        console.log("Update Response Status:", responseStatus);
        console.log("Update Response Data:", responseData);
        if (responseStatus === 200) {
          // Handle successful update
          const wallet = document.getElementById("wallet");
          var oldWallet = parseInt(wallet.textContent.slice(8));
          animateWallet(wallet, oldWallet - car.cost, 2500);

        }

        if (responseStatus == 401) {
          localStorage.removeItem("token");
          window.location.href = "login.html";
        } else if (responseStatus == 409) {
          // Handle error response
          alert(responseData.message)
          console.error("Update failed:", responseData);
        } else if (responseStatus == 400) {
          // Handle error response
          alert(responseData.message)
          console.error("Update failed:", responseData);
        }
      };


      // Call the fetch method
      fetchMethod(currentUrl + "/api/user/token/car", callbackForUpdate, 'PUT', { id: carId }, localStorage.getItem("token"));
    });

    //To disable buttons when not logged in
    var token = localStorage.getItem("token");
    if (token == null) {
      var buttons = document.querySelectorAll('.allbutton');
      buttons.forEach(function (button) {
        button.classList.add("disabled");
      });
    }
  });
};

fetchMethod(currentUrl + "/api/car", callback);