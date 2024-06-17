
function displayConnections(user) {
    if (user) {
        // Clear previous content
        var connectionsContainer = document.getElementById('connectionsContainer');
        connectionsContainer.innerHTML = '';
        var allPayments = [];
        user.connections.forEach(function(connection) {
            connection.payments.forEach(function(payment) {
                allPayments.push({
                    ...payment,
                    connectionName: connection.name
                });
            });
        });

        allPayments.sort(function(a, b) {
            return new Date(b.date) - new Date(a.date);
        });

        allPayments.sort(function(a, b) {
            return new Date(b.date) - new Date(a.date);
        });

        // Create HTML for the sorted payments
        var paymentsHtml = `
            <div class="payments card mt-4">
                <div class="card-header">
                    <h4>All Payment History</h4>
                </div>
                <div class="card-body">
                    <ul class="list-group">
                        ${allPayments.map(payment => `
                            <li class="list-group-item">
                                <div class="d-flex justify-content-between py-2 w-100"><strong>Connection ID:</strong><span>${payment.connectionId}</span></div>
                                <div class="d-flex justify-content-between py-2 w-100"><strong>Connection Name:</strong><span>${payment.connectionName}</span></div>
                                <div class="d-flex justify-content-between py-2 w-100"><strong>Transaction ID:</strong><span>${payment.transactionId}</span></div>
                                <div class="d-flex justify-content-between py-2 w-100"><strong>Total Amount:</strong><span>&#8377 ${payment.totalAmount.toFixed(2)}</span></div>
                                <div class="d-flex justify-content-between py-2 w-100"><strong>Date:</strong><span>${payment.date}</span></div>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;

        connectionsContainer.innerHTML += paymentsHtml;
    }
}

let userId = localStorage.getItem("UserId") === null ? 'U1001' : localStorage.getItem("UserId");
let user;
for (const iterator of JSON.parse(localStorage.getItem("allUserData"))) {
    if (userId == iterator.id) user = iterator;
}

displayConnections(user);
