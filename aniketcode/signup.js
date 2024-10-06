

document.getElementById("sign_up").addEventListener("submit", sign_up);
function sign_up(event) {
  event.preventDefault();
console.log(10)
  let email = document.getElementById("signup_email").value;
  let password = document.getElementById("signup_password").value;
  let confirm_password = document.getElementById("confirm_password").value;
  if (confirm_password == password){
    let raw = JSON.stringify({
      email: email,
      password: password,
    });
  
    let request = {
      method: "POST",
      body: raw,
    };
    async function fun() {
      await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXkAJVc-DkYxQQnylXQowj2804hX3In60",
        request
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.error.code==400){
            alert("Email already exist")
          }
        })
        .catch((error) => {
          alert("SignUp Suscessfull")
          window.location.reload()
        });
    }
    fun();
  }else{
    alert('Posword is not matching')
  }
}

document.getElementById("log_in").addEventListener("submit", log_in);

function log_in(event) {
  event.preventDefault();

  let email = document.getElementById("login_email").value;
  let password = document.getElementById("login_password").value;

  let raw = JSON.stringify({
    email: email,
    password: password,
  });

  let request = {
    method: "POST",
    body: raw,
  };

  async function fun() {
    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXkAJVc-DkYxQQnylXQowj2804hX3In60",
      request
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.registered == true) {
          // Store the login status in localStorage (or sessionStorage)
          localStorage.setItem('userEmail', email);
          
          document.getElementById("log_in").reset();
          window.location.href = "../index.html";
        } else {
          alert('LogIn failed');
        }
      });
  }
  fun();
}


