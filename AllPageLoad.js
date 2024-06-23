function Load(){
    if(localStorage.getItem("sessionId") === null){
        window.location.href = "PageLogin.html";
    }
    // localStorage.removeItem("UserId");
    loadData();
}

window.Load = Load;
