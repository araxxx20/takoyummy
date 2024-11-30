document.addEventListener("DOMContentLoaded", function () {
    const salesTableBody = document.getElementById("salesTableBody");
    const filterDateInput = document.getElementById("filterDate");
    const paginationControls = document.getElementById("paginationControls");

    let filteredData = [];
    let currentPage = 1;
    const rowsPerPage = 4;  // Change to 4 rows per page

    // Function to render the table
    const renderTable = (data, page = 1) => {
        salesTableBody.innerHTML = ""; // Clear the table
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedData = data.slice(start, end);

        if (paginatedData.length === 0) {
            salesTableBody.innerHTML = '<tr><td colspan="5" class="text-center">No sales data available</td></tr>';
            return;
        }

        // Render each sale item
        paginatedData.forEach(sale => {
            // Check if sale has valid properties like product, quantity, price
            if (!sale.product || !sale.quantity || !sale.price) {
                console.error("Invalid sale data:", sale);
                return;
            }

            const row = `
                <tr>
                    <td>${new Date(sale.createdAt).toLocaleDateString()}</td>
                    <td>${sale.product}</td>
                    <td>₱${sale.price.toFixed(2)}</td>
                    <td>${sale.quantity}</td>
                    <td>₱${(sale.price * sale.quantity).toFixed(2)}</td>
                </tr>
            `;
            salesTableBody.innerHTML += row;
        });

        // Render pagination controls
        renderPagination(data.length);
    };

    // Function to render pagination
    const renderPagination = (totalRows) => {
        paginationControls.innerHTML = "";
        const totalPages = Math.ceil(totalRows / rowsPerPage);

        const prevButton = document.createElement("button");
        prevButton.textContent = "Previous";
        prevButton.className = "btn btn-secondary btn-sm mx-1";
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable(filteredData, currentPage);
            }
        });
        paginationControls.appendChild(prevButton);

        const nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        nextButton.className = "btn btn-secondary btn-sm mx-1";
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener("click", () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderTable(filteredData, currentPage);
            }
        });
        paginationControls.appendChild(nextButton);
    };

    // Fetch sales data from the server
    fetch("http://localhost:5050/api/v1/sales/")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch sales data - Network response was not ok.");
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched sales data:", data); // Inspect the structure of the response
            if (!Array.isArray(data)) {
                throw new Error("Sales data is not in the expected array format.");
            }

            if (data.length === 0) {
                salesTableBody.innerHTML = '<tr><td colspan="5" class="text-center">No sales data available</td></tr>';
                return;
            }

            filteredData = data; // Default to all data initially
            renderTable(filteredData);

            // Automatically filter sales by date as the user types
            filterDateInput.addEventListener("input", function () {
                const selectedDate = new Date(filterDateInput.value);
                filteredData = data.filter(sale => {
                    const saleDate = new Date(sale.createdAt);
                    return (
                        saleDate.getFullYear() === selectedDate.getFullYear() &&
                        saleDate.getMonth() === selectedDate.getMonth() &&
                        saleDate.getDate() === selectedDate.getDate()
                    );
                });

                currentPage = 1; // Reset to the first page
                renderTable(filteredData, currentPage);
            });
        })
        .catch(error => {
            console.error("Error fetching sales data:", error);
            salesTableBody.innerHTML = `<tr><td colspan="5" class="text-center">Failed to load sales data: ${error.message}</td></tr>`;
        });
});
