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

    window.allUserData = allUserData;
    window.allAdminData = allAdminData;
}

function Load(){
    if(localStorage.getItem("sessionid") === null){
        window.location.href = "PageLogin.html";
    }
}

// window.Load = Load;