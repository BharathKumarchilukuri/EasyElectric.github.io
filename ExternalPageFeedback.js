function addComplaint(complaint){
    if(currUser.complaints === undefined){
        currUser.complaints = [complaint];
    } else {
        currUser.complaints.push(complaint);
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
}

function addFeedBack(feedback){
    if(currUser.feedbacks === undefined){
        currUser.feedbacks = [feedback];
    } else {
        currUser.feedbacks.push(feedback);
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
}

function FeedBackLoad() {
    let users = JSON.parse(localStorage.getItem("allUserData"));
    let userId = localStorage.getItem("UserId");
    for (const iterator of users) {
        if (iterator.id == userId) {
            console.log(userId);
            currUser = iterator;
            let connections = document.getElementById("Connections");
            connections.innerHTML = '';
            for (const conn of iterator.connections) {
                connections.innerHTML += `<option value="${conn.name}">${conn.name}</option>`
            }
            connections.innerHTML += `<option value="Website">Website</option>
        <option value="Others">Others</option>`

        }
    }

    document.getElementById("ComplaintForm").addEventListener("submit", (event) => {
        event.preventDefault();
        let complaint = {
            onConnection: document.getElementById("Connections").value,
            issueDate: document.getElementById('CDate').value,
            reason: document.getElementById("Reason").value,
            detailedC: document.getElementById("DetailedComplaint").value,
            complaintSubmitDate: new Date().toISOString()
        };

        addComplaint(complaint);
        
    });

    document.getElementById("FeedBackForm").addEventListener("submit", (event) => {
        event.preventDefault();
        let feedback = {
            experience: document.getElementById("experience").value,
            detailedF: document.getElementById("DetailedFeedback").value,
            FeedBackDate: new Date().getDate()
        };

        addFeedBack(feedback);
    });
}

let currUser;

FeedBackLoad();