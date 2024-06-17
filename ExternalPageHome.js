export async function VerifyUser(username, password) {
    await loadData();
    console.log(username, password);
    for (const user of allUserData) {
        if(user.username == username){
            if(user.password == password){
                localStorage.setItem("UserId", user.id);
                return 1;
            } else {
                return 0;
            }
        } else {
            return -1;
        }
    }
}

export async function CheckUser(userDetails){
    await loadData();

    let address = userDetails.address.doorNo + ' '
    + userDetails.address.street + ','
    + userDetails.address.city;

    console.log(userDetails);
    
    userDetails.address = address;
    for (const user of allUserData) {
        if(user.mobile != userDetails.mobileNum && user.email != userDetails.email){
            for (const iterator of user.connections) {
                if(iterator.id == userDetails.connectionDetails.id){
                    return -1;
                }
            }
            allUserData = JSON.parse(allUserData).push(userDetails);
            localStorage.setItem("allUserData", JSON.stringify(allUserData));
            return 1;
        } else {
            return 0;
        }
    }
}

var allUserData;
var allAdminData;

async function loadData(){
    let callData = new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        var url = 'Userdata.json';
        xhr.open('GET', url, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var jsonData = JSON.parse(xhr.responseText);
                resolve(jsonData);
            } else {
                console.error('Request failed. Status code: ' + xhr.status);
            }
        };
        xhr.onerror = function () {
            console.error('Request failed. Network error.');
        };
        xhr.send();

    });
    
    let allData = await callData;
    allUserData = allData.users;
    allAdminData = allData.admins;

    localStorage.setItem("allUserData", JSON.stringify(allUserData));
    localStorage.setItem("allAdminData", JSON.stringify(allAdminData));
}

function Load(){
    if(localStorage.getItem("sessionId") === null){
        window.location.href = "PageLogin.html";
    }
    // localStorage.removeItem("UserId");
    loadData();
}

window.Load = Load;