import { CheckUser } from "./ExternalPageHome";

function CheckDetails(userDetails){
    return CheckUser(userDetails);
}

function loadSignUp(){
    document.getElementById("SignUpForm").addEventListener("submit", async function(event) {
        event.preventDefault();
        const newUser = {};

        // Get user form data
        newUser.name = document.querySelector('input[name="Name"]').value;
        newUser.mobile = document.querySelector('input[name="Mobile"]').value;
        newUser.otp = document.querySelector('input[name="OTP"]').value;
        newUser.password = document.querySelector('input[name="Password"]').value;
        newUser.confPassword = document.querySelector('input[name="ConfPassword"]').value;

        // Get connection details
        const connectionDetails = {};
        connectionDetails.id = document.querySelector('input[name="ConnectionID"]').value;
        connectionDetails.name = document.querySelector('input[name="ConnectionName"]').value;
        connectionDetails.address = {
            doorNo: document.querySelector('input[name="Address-Doorno"]').value,
            city: document.querySelector('input[name="Address-City"]').value,
            street: document.querySelector('input[name="Address-Street"]').value,
            state: document.querySelector('input[name="State"]').value,
            pincode: document.querySelector('input[name="Address-Pincode"]').value
        };

        newUser.connectionDetails = connectionDetails;
        
        let alreadyUser = await CheckDetails(newUser);;
        if(alreadyUser == -1){
            alert("Connection Already Registered");
        } else if(alreadyUser == 0){
            alert("User Already Exists on this Mobile Number or email");
        } else if(alreadyUser == 1){
            window.location.href = "PageLogin.html";
        }
    });

    SessionSuccess();
}

function SessionSuccess() {
    if(localStorage.getItem("sessionId") === null){
        document.getElementById("HomeLink").classList.add("disabled");
        document.getElementById("MngConneLink").classList.add("disabled");
        document.getElementById("PayBillLink").classList.add("disabled");
        document.getElementById("PayHistoryLink").classList.add("disabled");
        document.getElementById("AlertLink").classList.add("disabled");
        document.getElementById("AccountLink").classList.add("disabled");
        document.getElementById("ServicesLink").classList.add("disabled");
        document.getElementById("MaintenanceLink").classList.add("disabled");
        document.getElementById("feedbacklink").classList.add("disabled");
        document.getElementById("ShopLink").classList.add("disabled");
        document.getElementById("CommercialLink").classList.add("disabled");
    }
}

loadSignUp();
