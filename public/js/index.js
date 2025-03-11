const myModal = new bootstrap.Modal("#register-modal")
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//LOGIN NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault()

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account){
        alert("Ops! verifique o usuário ou senha");
        return;
    }

    if(account){
        if(account.password !== password){   
            alert("Ops! verifique o usuário ou senha");
            return;
        }
        window.location.href = "home.html";
    
        saveSession(email, checkSession);
    
    }


});


//CRIA CONTA
document.getElementById("create-form").addEventListener("submit",function(e){
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if(email.length < 5){
        alert("Insira um e-mail válido!");
        return;
    }

    if(password.length < 4){
        alert("Insira uma senha com no mínimo 4 dígitos.");
        return;
    }

    saveNewAccount({
        login: email,
        password: password,
        transactions: []
    })

    myModal.hide();
    alert("Conta criada com sucesso!");
});

function checkLogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged){
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}

function saveNewAccount (data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession){
    if(saveSession){
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);

}

function getAccount (key){
    const account = localStorage.getItem(key);

    if(account){
        return JSON.parse(account);
    }

    return "";
}

