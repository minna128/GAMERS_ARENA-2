// Load the order from sessionStorage
window.onload = () => {
    const order = JSON.parse(sessionStorage.getItem("orderSummary"));
    const tbody = document.querySelector("#order-summary tbody");
    let total = 0; //initial total cost
  
    //adding row for each order
    if (order) {
      order.forEach(item => {
        const row = `
          <tr>
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>LKR ${item.price}</td>
            <td>LKR ${item.subtotal}</td>
          </tr>`;
        tbody.innerHTML += row; // Append row to table
        total += parseFloat(item.subtotal); // Add item subtotal to total
      });

      // Display the total amount in the checkout section
      document.getElementById("checkout-total").textContent = `LKR ${total.toFixed(2)}`;
    }
  };
  
  //checkout form
  document.getElementById("checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();
  
    const form = e.target;

    // Validate form inputs using HTML5 validation rules
    if (!form.checkValidity()) {
      alert("Please fill all fields correctly.");
      return;
    }
    
    //calculating delivery date +3 days from today
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
  
    // Show thank-you message
    const messageBox = document.getElementById("thank-you-message");
    messageBox.innerHTML = `
      ✅ <strong>Thank you for your purchase!</strong><br>
      Your items will be delivered by: <strong>${deliveryDate.toDateString()}</strong>.
    `;
    messageBox.style.display = "block";
  
    // Resets the form after successful submission
    form.reset();
  });
  

 