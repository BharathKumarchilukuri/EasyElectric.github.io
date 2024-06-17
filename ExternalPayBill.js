function displayConnections() {
    let count = 0;
    let connectionList = document.getElementById("ConnectionList");
    user.connections.forEach(function (connection) {
        var connectionHtml = `
            <li class="list-group-item">
            <div class="form-check">
                <input class="form-check-input" id="connec${count}" name="connec${count}" type="checkbox" value="${connection.name}">
                <label class="form-check-label" for="connec${count}">
                    <a href="#Pay${count}" class="text-secondary text-decoration-none"  data-bs-toggle="collapse" data-bs-target="#Pay${count}" aria-controls="Pay${count}" aria-expanded="false">`;

        if (connection.type.toLowerCase() == "household") {
            connectionHtml += `<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14px" height="14px" viewBox="0 0 495.40 495.40" xml:space="preserve" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M487.083,225.514l-75.08-75.08V63.704c0-15.682-12.708-28.391-28.413-28.391c-15.669,0-28.377,12.709-28.377,28.391 v29.941L299.31,37.74c-27.639-27.624-75.694-27.575-103.27,0.05L8.312,225.514c-11.082,11.104-11.082,29.071,0,40.158 c11.087,11.101,29.089,11.101,40.172,0l187.71-187.729c6.115-6.083,16.893-6.083,22.976-0.018l187.742,187.747 c5.567,5.551,12.825,8.312,20.081,8.312c7.271,0,14.541-2.764,20.091-8.312C498.17,254.586,498.17,236.619,487.083,225.514z"></path> <path d="M257.561,131.836c-5.454-5.451-14.285-5.451-19.723,0L72.712,296.913c-2.607,2.606-4.085,6.164-4.085,9.877v120.401 c0,28.253,22.908,51.16,51.16,51.16h81.754v-126.61h92.299v126.61h81.755c28.251,0,51.159-22.907,51.159-51.159V306.79 c0-3.713-1.465-7.271-4.085-9.877L257.561,131.836z"></path> </g> </g> </g> </g></svg>`;
        } else {
            connectionHtml += `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14px" height="14px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4,18v2h4v-2H4 M4,14v2h10v-2H4 M10,18v2h4v-2H10 M16,14v2h4v-2H16 M16,18v2h4v-2H16 M2,22V8l5,4V8l5,4V8l5,4l1-10h3l1,10 v10H2z"></path> <rect fill="none" width="24" height="24"></rect> </g></svg>`;
        }

        connectionHtml += `${connection.name}</a>
            </label>
                <div class="collapse" id="Pay${count}">
                    <div class="connection-item">
                        <p><strong>Id:</strong> ${connection.id}</p>
                        <p><strong>Address:</strong> ${connection.address}</p>
                        <p><strong>Units Consumed:</strong> ${connection.unitsConsumed}</p>
                        <p><strong>Amount:</strong> $${connection.amount.toFixed(2)}</p>
                        <p><strong>Tax:</strong> $${connection.tax.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </li>
        `;
        count++;
        connectionList.innerHTML += connectionHtml;
    });
}

let userId = localStorage.getItem("UserId") === null ? 'U1001' : localStorage.getItem("UserId");
let user;
for (const iterator of JSON.parse(localStorage.getItem("allUserData"))) {
    if (userId == iterator.id) user = iterator;
}
let totalAmount = 0;

function UpdatePay() {
    var paymentSummary = document.getElementById('paymentSummary');
    paymentSummary.innerHTML = '';
    totalAmount = 0;

    var selectedConnections = document.querySelectorAll('input[type="checkbox"]:checked');
    selectedConnections.forEach(function (connection) {
        for (let index of user.connections) {
            if (connection.value == index.name) {
                var name = index.name;
                var units = index.unitsConsumed;
                var amount = index.amount;
                totalAmount += amount;

                var paymentHtml = `
            <div class="p-2 border border-1">
                <p><strong>Connection Name:</strong> ${name}</p>
                <p><strong>Units Consumed:</strong> ${units}</p>
                <p><strong>Amount:</strong> &#8377 ${amount}</p>
            </div>
        `;
                paymentSummary.innerHTML += paymentHtml;
            }
        }

    });
    displayAmount();
}

function displayAmount(){
    document.getElementById("TotalAmount").innerHTML = `
    Total Amount: &#8377 ${totalAmount}
    `;
}

function PayBillLoad() {
    displayConnections();
    let allConnections = document.getElementById("allConnections")
    let checkboxes = document.querySelectorAll("input[type=checkbox]");
    function toggleCheckboxes() {
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = allConnections.checked;
        });
    }

    allConnections.addEventListener('change', toggleCheckboxes);

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            allConnections.checked = [...checkboxes].every(function (checkbox) {
                return checkbox.checked;
            });
            UpdatePay();
        });
    });
    displayAmount();
}

PayBillLoad();

