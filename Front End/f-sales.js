document.addEventListener("DOMContentLoaded", function () {
    const salesTableBody = document.getElementById("salesTableBody");

    // Fetch sales data from the backend
    fetch("http://localhost:5050/api/v1/sales")
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch sales data');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Check if data is empty
            if (data.length === 0) {
                salesTableBody.innerHTML = '<tr><td colspan="5" class="text-center">No sales data available</td></tr>';
                return;
            }

            data.forEach(sale => {
                sale.items.forEach(item => {
                    const row = `
                        <tr>
                            <td>${new Date(sale.createdAt).toLocaleDateString()}</td>
                            <td>${item.product}</td>
                            <td>₱${item.price.toFixed(2)}</td>
                            <td>${item.quantity}</td>
                            <td>₱${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    `;
                    salesTableBody.innerHTML += row;
                });
            });
        })
        .catch(error => {
            console.error("Error fetching sales data:", error);
            salesTableBody.innerHTML = '<tr><td colspan="5" class="text-center">Failed to load sales data</td></tr>';
        });
});
