document.addEventListener("DOMContentLoaded", function () {
    const salesTableBody = document.getElementById("salesTableBody");
    const filterDateInput = document.getElementById("filterDate");
    const paginationControls = document.getElementById("paginationControls");

    let filteredData = [];
    let currentPage = 1;
    const rowsPerPage = 4;  // Change to 15 rows per page

    const renderTable = (data, page = 1) => {
        salesTableBody.innerHTML = ""; // Clear the table
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedData = data.slice(start, end);

        if (paginatedData.length === 0) {
            salesTableBody.innerHTML = '<tr><td colspan="5" class="text-center">No sales data available</td></tr>';
            return;
        }

        paginatedData.forEach(sale => {
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

        renderPagination(data.length);
    };

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

    fetch("http://localhost:5050/api/v1/sales/")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch sales data");
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                salesTableBody.innerHTML = '<tr><td colspan="5" class="text-center">No sales data available</td></tr>';
                return;
            }

            filteredData = data; // Default to all data initially
            renderTable(filteredData); 

            // Filter sales by date 
            filterDateInput.addEventListener("keypress", function (e) {
                if (e.key === "Enter") {
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
                }
            });
        })
        .catch(error => {
            console.error("Error fetching sales data:", error);
            salesTableBody.innerHTML = '<tr><td colspan="5" class="text-center">Failed to load sales data</td></tr>';
        });
});
