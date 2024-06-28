import { VerifyUser } from "./ExternalPageHome.js";

let captcha = "HREAM";

function RegenerateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    captcha = result;
    document.getElementById("captcha").innerText = captcha;
}

function createSessionId() {
    return Math.floor(Math.random() * 1000);
}

export function loadLogin() {
    document.getElementById("LoginForm").addEventListener("submit", async function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const captchaInput = document.getElementById('captchaInput').value;
        const captcha = document.getElementById('captcha').innerText;
        if (captcha === captchaInput) {
            let user = await VerifyUser(username, password);
            if (user == -1) {
                alert("Not a user");
            } else if (user == 0) {
                alert("Wrong password, please check once again");
            } else if (user == 1) {
                localStorage.setItem("sessionId", createSessionId());
                window.location.href = "PageHome.html";
            }
        } else {
            let errorElements = document.getElementById("captchaError");
            errorElements.style.display = "block";
            setInterval(()=> {
                errorElements.style.display  = "none";
            }, 10000);
        }
    });

    document.getElementById("RegenerateCap").addEventListener("click", () => { RegenerateCaptcha(); });
    RegenerateCaptcha();
    SessionSuccess();
}

function SessionSuccess() {
    if (localStorage.getItem("sessionId") === null) {
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

loadLogin();