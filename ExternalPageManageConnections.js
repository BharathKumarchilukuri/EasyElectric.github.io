function displayConnections(user) {
    user.connections.forEach((connection) => {
        const listGroupItem = document.createElement('li');
        listGroupItem.className = 'list-group-item m-0 p-0';

        const divHeader = document.createElement('div');
        divHeader.className = 'd-flex justify-content-between align-items-center bg-light m-0 p-2';
        divHeader.setAttribute('data-bs-toggle', 'collapse');
        divHeader.setAttribute('data-bs-target', `#collapseConnection${connection.id}`);
        divHeader.setAttribute('aria-expanded', 'false');
        divHeader.setAttribute('aria-controls', `collapseConnection${connection.id}`);

        const h5 = document.createElement('h5');
        h5.className = 'mb-0';
        h5.textContent = `Connection ${connection.id}`;

        const btnGroup = document.createElement('div');
        btnGroup.className = 'btn-group';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger';
        deleteButton.textContent = 'Delete';
        deleteButton.setAttribute('onclick', 'confirm("This will Delete the Connection")');

        btnGroup.appendChild(deleteButton);

        divHeader.appendChild(h5);
        divHeader.appendChild(btnGroup);

        const collapseDiv = document.createElement('div');
        collapseDiv.id = `collapseConnection${connection.id}`;
        collapseDiv.className = 'collapse p-2';

        const table = document.createElement('table');
        table.className = 'table';

        const row1 = document.createElement('tr');
        const row1Col1 = document.createElement('td');
        row1Col1.className = 'fw-bold text-start';
        row1Col1.textContent = 'Name:';
        const row1Col2 = document.createElement('td');
        row1Col2.className = 'text-end';
        row1Col2.textContent = connection.name;
        row1.appendChild(row1Col1);
        row1.appendChild(row1Col2);

        const row2 = document.createElement('tr');
        const row2Col1 = document.createElement('td');
        row2Col1.className = 'fw-bold text-start';
        row2Col1.textContent = 'Meter ID:';
        const row2Col2 = document.createElement('td');
        row2Col2.className = 'text-end';
        row2Col2.textContent = connection.type;
        row2.appendChild(row2Col1);
        row2.appendChild(row2Col2);

        const row3 = document.createElement('tr');
        const row3Col1 = document.createElement('td');
        row3Col1.className = 'fw-bold text-start';
        row3Col1.textContent = 'Address:';
        const row3Col2 = document.createElement('td');
        row3Col2.className = 'text-end';
        row3Col2.textContent = connection.address;
        row3.appendChild(row3Col1);
        row3.appendChild(row3Col2);

        table.appendChild(row1);
        table.appendChild(row2);
        table.appendChild(row3);

        collapseDiv.appendChild(table);

        listGroupItem.appendChild(divHeader);
        listGroupItem.appendChild(collapseDiv);

        document.getElementById('AllConnections').appendChild(listGroupItem);
    });
}

function AddConnection(){
    let connection = {};
        connection.id = document.getElementById("ConnectionID").value;
        connection.name = document.getElementById("ConnectionName").value;
        connection.address = {
            doorNo: document.getElementById("AddressDoorNo").value,
            city: document.getElementById("AddressStreet").value,
            street: document.getElementById("AddressCity").value,
            state: document.getElementById("AddressState").value,
            pincode: document.getElementById("AddressPincode").value
        };

        user.connections.push(connection);
        
        displayConnections(user);

        document.querySelector('input[name="ConnectionID"]').value = '';
        document.querySelector('input[name="ConnectionName"]').value = '';
        document.querySelector('input[name="Address-Doorno"]').value= '';
        document.querySelector('input[name="Address-City"]').value = '';
        document.querySelector('input[name="Address-Street"]').value = '';
        document.querySelector('input[name="State"]').value = '';
        document.querySelector('input[name="Address-Pincode"]').value = '';
}

let userId = localStorage.getItem("UserId") === null ? 'U1001' : localStorage.getItem("UserId");
let user;
for (const iterator of JSON.parse(localStorage.getItem("allUserData"))) {
    if (userId == iterator.id) user = iterator;
}

displayConnections(user);

document.getElementById("AddConnection").addEventListener("click", (event) => {
    event.preventDefault();
    AddConnection();
})