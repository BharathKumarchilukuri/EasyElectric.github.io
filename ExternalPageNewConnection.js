const formHandler = {
    data : {},

    saveFormData: function(formId) {
        const form = document.getElementById(formId);
        const formData = new FormData(form);
        const data = {};

        console.log(formData);

        formData.forEach((value, key) => {
            data[key] = value;
        });

        this.data[formId] = data;
        console.log(`Data saved for ${formId}:`, this.data);
        alert(`Data saved for ${formId}`);
    },

    submitAllData: function() {
        if(userDetailsForm && addressForm && connectionDetailsForm && documentsUploadForm && agreementForm) {
            alert('You are making a payment');
            AddApplication(this.data);
        }
        else {
            let errorElements = document.getElementsByClassName("allErrorDiv");
            for (const iterator of errorElements) {
                iterator.style.display = "block";
            }
            setInterval(()=> {
                for (const iterator of errorElements) {
                    iterator.style.display = "none";
                }
            }, 10000);
        }
    }
};

function AddApplication(data){
    if(currUser.newConnections === undefined){
        currUser.newConnections = [data];
    } else {
        currUser.newConnections.push(data);
    }
    let allUserData = [];
    let users = JSON.parse(localStorage.getItem("allUserData"));
    let userId = localStorage.getItem("UserId");
    for (const iterator of users) {
        if (iterator.id == userId) {
            allUserData.push(currUser);
        } else {
            allUserData.push(iterator);
        }
    }
    localStorage.setItem("allUserData", JSON.stringify(allUserData));
    console.log(JSON.parse(localStorage.getItem("allUserData")));
}

let userDetailsForm = false;
let addressForm = false;
let connectionDetailsForm = false;
let documentsUploadForm = false;
let agreementForm = false;

document.getElementById('userDetailsForm').addEventListener('submit', function(event) {
    event.preventDefault();
    formHandler.saveFormData('userDetailsForm');
    userDetailsForm = true;
});

document.getElementById('addressForm').addEventListener('submit', function(event) {
    event.preventDefault();
    formHandler.saveFormData('addressForm');
    addressForm = true;
});

document.getElementById('connectionDetailsForm').addEventListener('submit', function(event) {
    event.preventDefault();
    formHandler.saveFormData('connectionDetailsForm');
    connectionDetailsForm = true;
});

document.getElementById('documentsUploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    formHandler.saveFormData('documentsUploadForm');
    documentsUploadForm = true;
});

document.getElementById('agreementForm').addEventListener('submit', function(event) {
    event.preventDefault();
    formHandler.saveFormData('agreementForm');
    agreementForm = true;
});

document.getElementById('finalSubmit').addEventListener('click', function(event) {
    event.preventDefault();
    formHandler.submitAllData();
});

let userId = localStorage.getItem("UserId") === null ? 'U1001' : localStorage.getItem("UserId");
let currUser;
for (const iterator of JSON.parse(localStorage.getItem("allUserData"))) {
    if (userId == iterator.id) currUser = iterator;
}