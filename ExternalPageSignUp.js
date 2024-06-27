import { CheckUser } from "./ExternalPageHome.js";

function CheckDetails(userDetails){
    return CheckUser(userDetails);
}

function createNewUserId(){
    let str = 'U';
    let num = 1001;

    while(idNumbers.indexOf(num) != -1 && idNumbers > 1000){
        num = Math.floor(Math.random()*10000);
    }

    return str + num;
}

let idNumbers = [1001,1002,1003,1004,1005];

function loadSignUp(){
    document.getElementById("SignUpForm").addEventListener("submit", async function(event) {
        event.preventDefault();
        const newUser = {};
        
        if (connectionDetails.length == 0) {
            document.getElementById("connInfo").className = "text-danger";
            alert("Add atleast a connection");
            return;
        }
        // Get user form data
        newUser.id = createNewUserId();
        newUser.name = document.querySelector('input[name="Name"]').value;
        newUser.username = newUser.name.replace(' ','_');
        newUser.mobile = document.querySelector('input[name="Mobile"]').value;
        newUser.email = '';
        let OTP = document.querySelector('input[name="OTP"]').value;
        newUser.password = document.querySelector('input[name="Password"]').value;

        newUser.connections = connectionDetails;
        
        newUser.connections.forEach((connection) => {
            connection.unitsConsumed = 0;
            connection.amount = 0;
            connection.tax = 0;
            connection.payments = [];
        })
    
        let alreadyUser = await CheckDetails(newUser);
        if(alreadyUser == -1){
            alert("Connection Already Registered");
        } else if(alreadyUser == 0){
            alert("User Already Exists on this Mobile Number or email");
        } else if(alreadyUser == 1){
            window.location.href = "PageLogin.html";
        }
    });

    let password = document.getElementById("Password");
    let passerror = document.getElementById("passwordError");
    let ConfPassword = document.getElementById("ConfPassword");

    ConfPassword.addEventListener("keyup", (event) => {
        if(ConfPassword.value !== password.value.slice(0,ConfPassword.value.length)){
            passerror.style.display = "block";
        } else {
            passerror.style.display = "none";
        }
    });

    document.getElementById("AddConnection").addEventListener("click", () => {
        // Get connection details
        let connection = {};
        connection.id = document.querySelector('input[name="ConnectionID"]').value;
        connection.name = document.querySelector('input[name="ConnectionName"]').value;
        connection.address = {
            doorNo: document.querySelector('input[name="Address-Doorno"]').value,
            city: document.querySelector('input[name="Address-City"]').value,
            street: document.querySelector('input[name="Address-Street"]').value,
            state: document.querySelector('input[name="State"]').value,
            pincode: document.querySelector('input[name="Address-Pincode"]').value
        };

        connectionDetails.push(connection);
        
        renderConnections();

        document.querySelector('input[name="ConnectionID"]').value = '';
        document.querySelector('input[name="ConnectionName"]').value = '';
        document.querySelector('input[name="Address-Doorno"]').value= '';
        document.querySelector('input[name="Address-City"]').value = '';
        document.querySelector('input[name="Address-Street"]').value = '';
        document.querySelector('input[name="State"]').value = '';
        document.querySelector('input[name="Address-Pincode"]').value = '';
    })

    SessionSuccess();
}

let connectionDetails = [];

function renderConnections(){
    document.getElementById("YourConnections").innerHTML += ``
        
    const container = document.getElementById('YourConnections');
    container.innerHTML = ''; // Clear existing content
    connectionDetails.forEach((connection, index) => {
        const connectionDiv = document.createElement('li');
        connectionDiv.className = 'connection p-1 text-white list-group-item my-1 border border-1';
        connectionDiv.innerHTML = `
            <button class="btn btn-danger my-1" type="button" onclick="removeConnection(${index})">Remove</button>
            <div class="p-2 bg-success rounded-1">
                <p><strong>ID:</strong> ${connection.id}</p>
                <p><strong>Name:</strong> ${connection.name}</p>
                <p><strong>Address:</strong></p>
                <ul>
                    <li><strong>Door No:</strong> ${connection.address.doorNo}</li>
                    <li><strong>City:</strong> ${connection.address.city}</li>
                    <li><strong>Street:</strong> ${connection.address.street}</li>
                    <li><strong>State:</strong> ${connection.address.state}</li>
                    <li><strong>Pincode:</strong> ${connection.address.pincode}</li>
                </ul>
            </div>
        `;
        container.appendChild(connectionDiv);
    });
}

function removeConnection(index) {
    connectionDetails.splice(index, 1);
    renderConnections(); // Re-render the connections
}

function SessionSuccess() {
    console.log("In session");
    console.log(localStorage.getItem("sessionId"));
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

window.loadSignUp = loadSignUp;
window.removeConnection = removeConnection;