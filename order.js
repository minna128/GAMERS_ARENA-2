//Order summary table automatic updates as user change quantities
function updateOrderSummary() {
    const inputs = document.querySelectorAll('input[type="number"]');//variable for quantity input
    const tbody = document.querySelector("#summary-table tbody");//variable for table body
    let total = 0;
    tbody.innerHTML = '';//Remove previous summary
  
    inputs.forEach(input => {
      const qty = parseInt(input.value);//input converted to number
      if (qty > 0) {
        const name = input.dataset.name; // Product name from data attribute
        const price = parseFloat(input.dataset.price); // Product price from data attribute
        const subtotal = qty * price; //Calculate subtotal
        total += subtotal; //Calculate total

        // Creating a new row with product details  
        const row = `
          <tr>
            <td>${name}</td>
            <td>${qty}</td>
            <td>LKR ${price.toFixed(2)}</td>
            <td>LKR ${subtotal.toFixed(2)}</td>
          </tr>`;
        tbody.innerHTML += row;
      }
    });

    //Display total cost  
    document.getElementById("total").textContent = `LKR ${total.toFixed(2)}`;
  }
   
    // Add event listener to each quantity input to update the summary on change
    document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', updateOrderSummary);
  });
  
  // current products add in local storage
  function addToFavourites() {
    const items = {};
    document.querySelectorAll('input[type="number"]').forEach(input => {
      items[input.dataset.name] = input.value; // Save name and quantity
    });
    localStorage.setItem("favouriteOrder", JSON.stringify(items)); // Store in localStorage
    alert("Favourites saved!");
  }
  
  //Apply favourites function
  function applyFavourites() {
    const items = JSON.parse(localStorage.getItem("favouriteOrder"));
    if (items) {
      document.querySelectorAll('input[type="number"]').forEach(input => {
        const name = input.dataset.name;
        input.value = items[name] || 0; // Use saved value or 0 if not found
      });
      updateOrderSummary(); // Refresh summary table
    } else {
      alert("No saved favourite found.");
    }
  }
  
  //Redirect to checkout page
  // Buy Now
  function buyNow() {
    updateOrderSummary();
    const orderItems = [];
    document.querySelectorAll('input[type="number"]').forEach(input => {
      const qty = parseInt(input.value);
      if (qty > 0) {
        const name = input.dataset.name;
        const price = parseFloat(input.dataset.price).toFixed(2);
        const subtotal = (qty * price).toFixed(2);
        orderItems.push({ name, qty, price, subtotal });
      }
    });
    
    //Current products add to session storage
    sessionStorage.setItem("orderSummary", JSON.stringify(orderItems));
    window.location.href = "checkout.html";
  }
  


  // Hamburger menu toggle logic
  document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger"); //Hamburger icon
    const navLinks = document.querySelector(".nav-links"); //Navigation menu
    
    //Toggle show button when hamburger clicked
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("show");
    });
  });

  