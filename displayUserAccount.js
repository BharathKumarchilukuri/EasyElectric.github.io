function displayUserAccount(data) {
    const userDataDiv = document.getElementById('user-data');
    
    let userHtml = `
        <div class="card mb-3 shadow-sm">
            <div class="card-header bg-primary text-white"><strong>User Details</strong></div>
            <div class="card-body">
                <p><strong>ID:</strong> ${data.id}</p>
                <p><strong>Username:</strong> ${data.username}</p>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Mobile:</strong> ${data.mobile}</p>
                <p><strong>Email:</strong> ${data.email}</p>
            </div>
        </div>

        <div class="card mb-3 shadow-sm">
            <div class="card-header bg-success text-white"><strong>Connections</strong></div>
            <div class="card-body">
    `;

    // Iterate over connections
    if(data.connections){
        for (let i = 0; i < data.connections.length; i++) {
            const connection = data.connections[i];
            userHtml += `
                <div class="mb-3 border p-3 rounded shadow-sm">
                    <h5 class="text-secondary">${connection.name}</h5>
                    <p><strong>Type:</strong> ${connection.type}</p>
                    <p><strong>Address:</strong> ${connection.address}</p>
                    <p><strong>Units Consumed:</strong> ${connection.unitsConsumed}</p>
                    <p><strong>Amount:</strong> $${connection.amount}</p>
                    <p><strong>Tax:</strong> $${connection.tax}</p>
                    <h6>Payments</h6>
                    <ul class="list-group">
            `;
    
            // Iterate over payments
            for (let j = 0; j < connection.payments.length; j++) {
                const payment = connection.payments[j];
                userHtml += `
                    <li class="list-group-item">
                        <p><strong>Transaction ID:</strong> ${payment.transactionId}</p>
                        <p><strong>Total Amount:</strong> $${payment.totalAmount}</p>
                        <p><strong>Date:</strong> ${payment.date}</p>
                    </li>
                `;
            }
    
            userHtml += `
                    </ul>
                </div>
            `;
        }
    }

    userHtml += `
            </div>
        </div>

        <div class="card mb-3 shadow-sm">
            <div class="card-header bg-info text-white"><strong>Commercial Applications</strong></div>
            <div class="card-body">
    `;

    // Iterate over commercial applications
    if(data.commercialAppData){
        for (let i = 0; i < data.commercialAppData.length; i++) {
            const app = data.commercialAppData[i];
            userHtml += `
                <div class="mb-3 border p-3 rounded shadow-sm">
                    <h5 class="text-secondary">${app.applicantName}</h5>
                    <p><strong>Applicant Type:</strong> ${app.applicantType}</p>
                    <p><strong>Contact Person:</strong> ${app.contactPerson}</p>
                    <p><strong>Email:</strong> ${app.email}</p>
                    <p><strong>Phone:</strong> ${app.phone}</p>
                    <p><strong>Property Address:</strong> ${app.propertyAddress}</p>
                    <p><strong>Property Use:</strong> ${app.propertyUse}</p>
                    <p><strong>Electric Load:</strong> ${app.electricLoad} kW</p>
                    <p><strong>Voltage Requirements:</strong> ${app.voltageRequirements}</p>
                    <p><strong>Other Requirements:</strong> ${app.otherRequirements}</p>
                    <p><strong>Business Registration:</strong> ${app.businessRegistration}</p>
                </div>
            `;
        }
    }

    userHtml += `
            </div>
        </div>

        <div class="card mb-3 shadow-sm">
            <div class="card-header bg-warning text-white"><strong>Complaints</strong></div>
            <div class="card-body">
    `;

    // Iterate over complaints
    if(data.complaints){
        for (let i = 0; i < data.complaints.length; i++) {
            const complaint = data.complaints[i];
            userHtml += `
                <div class="mb-3 border p-3 rounded shadow-sm">
                    <p><strong>ID:</strong> ${complaint.id}</p>
                    <p><strong>Date:</strong> ${complaint.date}</p>
                    <p><strong>Issue:</strong> ${complaint.issue}</p>
                    <p><strong>Status:</strong> ${complaint.status}</p>
                </div>
            `;
        }
    }

    userHtml += `
            </div>
        </div>
    `;

    userDataDiv.innerHTML = userHtml;
}

let userData = JSON.parse(localStorage.getItem("tempUser"));

// Call the function to display user account data
displayUserAccount(userData);