document.addEventListener("DOMContentLoaded", function () {
    const salesTableBody = document.getElementById("salesTableBody");

    fetch("http://localhost:5050/api/v1/sales/")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                salesTableBody.innerHTML = "<tr><td colspan='5'>No sales data available</td></tr>";
            } else {
                data.forEach(sales => {
                    const row = `
                        <tr>
                            <td>${new Date(sales.date).toLocaleDateString()}</td>
                            <td>${sales.product}</td>
                            <td>₱${sales.price.toFixed(2)}</td>
                            <td>${sales.quantity}</td>
                            <td>₱${sales.total.toFixed(2)}</td>
                        </tr>
                    `;
                    salesTableBody.innerHTML += row;
                });
            }
        })
        .catch(err => {
            console.error("Failed to fetch sales data:", err);
            salesTableBody.innerHTML = "<tr><td colspan='5'>Failed to load sales data</td></tr>";
        });
});

