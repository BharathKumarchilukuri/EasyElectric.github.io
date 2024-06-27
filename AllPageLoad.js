import { removeAllData } from "./ExternalPageHome.js";

function Load(){
    if(localStorage.getItem("sessionId") === null){
        window.location.href = "PageLogin.html";
    }
    // localStorage.removeItem("UserId");
    loadData('user');
    document.getElementById("PageSignUp").classList.add("disabled");
}
if(document.getElementById("logOutLink")){
    document.getElementById("logOutLink").addEventListener("click", (event) => {
        event.preventDefault();
        removeAllData();
        window.location.href = "PageLogin.html";
    });
}

window.Load = Load;