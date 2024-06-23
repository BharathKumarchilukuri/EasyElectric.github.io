import { loadAdminData } from "./ExternalPageHome";

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
            content += `<li class="list-group-item">User: ${complaint.user}, Complaint: ${complaint.complaint}</li>`;
        });
        content += '</ul>';
        document.getElementById('adminContent').innerHTML = "";
        document.getElementById('adminContent').innerHTML = content;
    },

    viewNewApplications: function() {
        const applications = this.data.newApplications;
        let content = '<h3>New Applications</h3><ul class="list-group">';
        applications.forEach(application => {
            content += `<li class="list-group-item">User: ${application.user}, Application: ${application.application}</li>`;
        });
        content += '</ul>';
        document.getElementById('adminContent').innerHTML = "";
        document.getElementById('adminContent').innerHTML = content;
    },

    viewNewPayments: function() {
        const payments = this.data.payments;
        let content = '<h3>New Payments</h3><ul class="list-group">';
        payments.forEach(payment => {
            content += `<li class="list-group-item">User: ${payment.user}, Amount: ${payment.amount}, Date: ${payment.date}</li>`;
        });
        content += '</ul>';
        document.getElementById('adminContent').innerHTML = "";
        document.getElementById('adminContent').innerHTML = content;
    }
};

function getComplaints(){
    let allComp = [];
    AllUsers.forEach(element => {
        if(element.complaints){
            allComp.add(...element.complaints);
        }
    });
    return allComp;
}

function getApplications(){
    let allApp = [];
    AllUsers.forEach(element => {
        if(element.applications){
            allComp.add(...element.applications);
        }
    });
    return allApp;
}

function getPayments(){
    let allPay = [];
    AllUsers.forEach(user => {
        user.connections.forEach(function(connection) {
            connection.payments.forEach(function(payment) {
                allPay.push(...payment);
            });
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
console.log(AllUsers + "add");
let AllComplaints = getComplaints();
let AllApplications = getApplications();
let AllPayments = getPayments();

function LoadAdmin(){
    // if(localStorage.getItem("sessionAdminId") === null){
    //     window.location.href = "PageAdminLogin.html";
    // }
    loadAdminData();
}

window.LoadAdmin = LoadAdmin;
