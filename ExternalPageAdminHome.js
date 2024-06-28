import { loadAdminData, removeAllData } from "./ExternalPageHome.js";

function getComplaints(){
    let allComp = [];
    AllUsers.forEach(user => {
        if(user.complaints){
            user.complaints.forEach((complaint) => {
                let newUser = {
                    userid: user.id,
                    reason: complaint.reason,
                    complaint: complaint.detailedComplaint,
                }
                allComp.push(newUser);
            });
        }
    });

    return allComp;
}

function getApplications(){
    let allApp = [];
    AllUsers.forEach(user => {
        if(user.commercialAppData){
            user.commercialAppData.forEach((application) => {
                let newUser = {
                    userid: user.id,
                    application: application,
                }
                allApp.push(newUser);
            });
        }
    });

    return allApp;
}

function getPayments(){
    let allPay = [];
    AllUsers.forEach(user => {
        let pay = [];
        user.connections.forEach((connection) => {
            connection.payments.forEach((payment) => {
                let newUser = {
                    userid: user.id,
                    connection: connection,
                    amount : payment.totalAmount,
                    date: payment.date,
                }
                allPay.push(newUser);
            })
        });
    });

    allPay.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
    });

    allPay.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
    });

    return allPay;
}

document.getElementById('adminContent').addEventListener("submit", () => {
    login();
});

document.getElementById('Complaints').addEventListener("click", () => {
    adminHandler.viewComplaints();
});

document.getElementById('Applications').addEventListener("click", () => {
    adminHandler.viewNewApplications();
});

document.getElementById('Payments').addEventListener("click", () => {
    adminHandler.viewNewPayments();
});

let AllUsers = JSON.parse(localStorage.getItem("allUserData"));

let AllComplaints = getComplaints();
let AllApplications = getApplications();
let AllPayments = getPayments();

export function loadAdmin(){
    if(localStorage.getItem("sessionAdminId") === null){
        window.location.href = "PageAdminLogin.html";
    }
    loadAdminData();
}

const adminHandler = {
    data: {
        complaints: AllComplaints,
        newApplications: AllApplications,
        payments: AllPayments,
    },

    viewComplaints: function() {
        const complaints = this.data.complaints;
        let content = '<h3>Complaints</h3><ul class="list-group">';
        complaints.forEach(complaint => {
            content += `<li class="list-group-item">User: ${complaint.userid}, <br>Reason: ${complaint.reason},<br> Complaint: ${complaint.complaint}</li>`;
        });
        content += '</ul>';
        document.getElementById('adminContent').innerHTML = "";
        document.getElementById('adminContent').innerHTML = content;
    },

    viewNewApplications: function() {
        const applications = this.data.newApplications;
        let content = '<h3>New Applications</h3>';

        for (let i = 0; i < applications.length; i++) {
            const application = applications[i].application;
            content += `<li class="list-group-item"><h5 class="h5"><a class='userLink text-info fw-bold' id='${applications[i].userid}'> ${applications[i].userid}</a></h5>` + `
                <div class="card mb-3 shadow-sm">
                    <div class="card-header bg-primary text-white"><strong>${application.applicantName}</strong></div>
                    <div class="card-body">
                        <p><strong>Applicant Type:</strong> ${application.applicantType}</p>
                        <p><strong>Contact Person:</strong> ${application.contactPerson}</p>
                        <p><strong>Email:</strong> ${application.email}</p>
                        <p><strong>Phone:</strong> ${application.phone}</p>
                        <p><strong>Property Address:</strong> ${application.propertyAddress}</p>
                        <p><strong>Property Use:</strong> ${application.propertyUse}</p>
                        <p><strong>Electric Load:</strong> ${application.electricLoad} kW</p>
                        <p><strong>Voltage Requirements:</strong> ${application.voltageRequirements}</p>
                        <p><strong>Other Requirements:</strong> ${application.otherRequirements}</p>
                        <p><strong>Business Registration:</strong> ${application.businessRegistration}</p>
                    </div>
                </div>
            ` + `</li>`
        }

        content += '</ul>';
        
        document.getElementById('adminContent').innerHTML = "";
        document.getElementById('adminContent').innerHTML = content;
        
        addLinks(document.getElementById('adminContent'));
    },

    viewNewPayments: function() {
        const payments = this.data.payments;
        let heading = '<h3>New Payments</h3>';
        let content = `<thead>
                            <tr>
                              <th>User</th>
                              <th>Amount</th>
                              <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>`;

        payments.forEach(payment => {
            content += `<tr>
                            <td><a class='userLink text-info fw-bold' id='${payment.userid}'>${payment.userid}</a></td>
                            <td class="d-flex justify-content-end">&#8377 ${payment.amount}</td>
                            <td>${payment.date}</td>
                        </tr>`;
        });
        content += `</tbody>`
        
        content = heading + AddTable(content);
        
        document.getElementById('adminContent').innerHTML = "";
        document.getElementById('adminContent').innerHTML = content;
        addLinks(document.getElementById('adminContent'));
    }
};

function addLinks(element){
    let alllinks = element.getElementsByClassName("userLink");
    for (const link of alllinks) {
        link.addEventListener("click", (event) => {
            let tuser;
            AllUsers.forEach(user => {
                if(user.id === link.id) tuser = user;
            })
            localStorage.setItem("tempUser", JSON.stringify(tuser));
            window.location.href = "PageUser.html";
        })
    }
}

function AddTable(content){
    return `<table class="table table-bordered">` + content + `</table>`;
}

document.getElementById('adminLogOutLink').addEventListener("click", (event) => {
    event.preventDefault();
    removeAllData();
    window.location.href = "PageAdminLogin.html";
})

window.loadAdmin = loadAdmin;
