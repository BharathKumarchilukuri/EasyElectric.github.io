function Load(){
    if(localStorage.getItem("sessionId") === null){
        window.location.href = "PageLogin.html";
    }
    // localStorage.removeItem("UserId");
    loadData('user');
}

document.getElementById("logOutLink").addEventListener("click", (event) => {
    event.preventDefault();
    removeAllData();
    window.location.href = "PageLogin.html";
})

window.Load = Load;