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
        console.log('Final Data:', this.data);
        alert('You are making a payment');
        AddApplication(this.data);
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
    let userId = localStorage.getItem("userId");
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


document.getElementById('userDetailsForm').addEventListener('submit', function(event) {
    event.preventDefault();
    formHandler.saveFormData('userDetailsForm');
});

document.getElementById('addressForm').addEventListener('submit', function(event) {
    event.preventDefault();
    formHandler.saveFormData('addressForm');
});

document.getElementById('connectionDetailsForm').addEventListener('submit', function(event) {
    event.preventDefault();
    formHandler.saveFormData('connectionDetailsForm');
});

document.getElementById('documentsUploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    formHandler.saveFormData('documentsUploadForm');
});

document.getElementById('agreementForm').addEventListener('submit', function(event) {
    event.preventDefault();
    formHandler.saveFormData('agreementForm');
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