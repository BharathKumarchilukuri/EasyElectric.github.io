export async function VerifyUser(username, password) {
    await loadData();
    console.log(allUserData);
    for (const user of allUserData) {
        console.log(user.username);
        if(user.username === username){
            if(user.password === password){
                localStorage.setItem("UserId", user.id);
                localStorage.setItem("UserData", JSON.stringify(user));
                return 1;
            } else {
                return 0;
            }
        }
    }
    return -1;
}

export async function VerifyAdmin(username, password) {
    await loadData();
    console.log(username, password);
    for (const admin of allAdminData) {
        if(admin.username == username){
            if(admin.password == password){
                localStorage.setItem("AdminId", admin.id);
                return 1;
            } else {
                removeAllData();
                return 0;
            }
        } else {
            removeAllData();
            return -1;
        }
    }
}

export async function CheckUser(userDetails){
    await loadData();

    for (const user of allUserData) {
        if(user.mobile != userDetails.mobileNum && user.email != userDetails.email){
            for (const iterator of user.connections) {
                for (const it01 of userDetails.connectionDetails) {
                    if(iterator.id == it01.id){
                        return -1;
                    }
                }
            }
            allUserData.push(userDetails);
            console.log(allUserData);
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

    allUserData = JSON.parse(localStorage.getItem("allUserData"));
    console.log(allUserData);

    if (!(allUserData)) {
        let allData = await callData;
        allUserData = allData.users;
        allAdminData = allData.admins;
    
        localStorage.setItem("allUserData", JSON.stringify(allUserData));
        localStorage.setItem("allAdminData", JSON.stringify(allAdminData));
    }
}

function removeAllData(){
    localStorage.clear();
}

function loadAdminData(){
    // if(localStorage.getItem("sessionAdminId") === null){
    //     window.location.href = "PageAdminLogin.html";
    // }
    loadData();
}

document.getElementById("logOutLink").addEventListener("click", (event) => {
    event.preventDefault();
    removeAllData();
    window.location.href = "PageLogin.html";
})

window.loadAdminData = loadAdminData;
window.loadData = loadData;