import { VerifyAdmin } from "./ExternalPageHome.js";

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

function createsessionAdminId() {
    return Math.floor(Math.random() * 1000);
}

export function loadAdminLogin() {
    document.getElementById("adminLogin").addEventListener("submit", async function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const captchaInput = document.getElementById('captchaInput').value;
        const captcha = document.getElementById('captcha').innerText;
        console.log(username, password, captchaInput);
        if (captcha === captchaInput) {
            let user = await VerifyAdmin(username, password);
            if (user == -1) {
                alert("Not an Admin");
            } else if (user == 0) {
                alert("Wrong password, please check once again");
            } else if (user == 1) {
                localStorage.setItem("sessionAdminId", createsessionAdminId());
                window.location.href = "PageHome.html";
            }
        }
    });

    document.getElementById("RegenerateCap").addEventListener("click", () => { RegenerateCaptcha(); });
    RegenerateCaptcha();
}

window.loadAdminLogin = loadAdminLogin;