document.addEventListener("DOMContentLoaded", function () {
    const salesTableBody = document.getElementById("salesTableBody");
    const filterDateInput = document.getElementById("filterDate");

    fetch("http://localhost:5050/api/v1/pos/calculate")
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch sales data');
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                salesTableBody.innerHTML = '<tr><td colspan="5" class="text-center">No sales data available</td></tr>';
                return;
            }

            
            const renderTable = (filteredData) => {
                salesTableBody.innerHTML = ""; // Clear table before rendering new rows
                filteredData.forEach(sale => {
                    sale.items.forEach(item => {
                        const row = `
                            <tr>
                                <td>${new Date(sale.createdAt).toLocaleDateString()}</td>
                                <td>${item.name}</td>
                                <td>₱${item.price.toFixed(2)}</td>
                                <td>${item.quantity}</td>
                                <td>₱${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        `;
                        salesTableBody.innerHTML += row;
                    });
                });
            };

            renderTable(data); // Initially render all data

            // Event listener for filtering when pressing Enter
            filterDateInput.addEventListener("keypress", function (e) {
                if (e.key === "Enter") {
                    const selectedDate = new Date(filterDateInput.value);
                    const filteredData = data.filter(sale => {
                        const saleDate = new Date(sale.createdAt);
                        return (
                            saleDate.getFullYear() === selectedDate.getFullYear() &&
                            saleDate.getMonth() === selectedDate.getMonth() &&
                            saleDate.getDate() === selectedDate.getDate()
                        );
                    });
                    renderTable(filteredData);
                }
            });
        })

        .catch(error => {
            console.error("Error fetching sales data:", error);
            salesTableBody.innerHTML = '<tr><td colspan="5" class="text-center">Failed to load sales data</td></tr>';
        });
});
