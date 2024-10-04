// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAC3kBUXruxN8l--oFjIGTbx6h7po4tY3A",
  authDomain: "code-for-climate.firebaseapp.com",
  projectId: "code-for-climate",
  storageBucket: "code-for-climate.appspot.com",
  messagingSenderId: "310220180917",
  appId: "1:310220180917:web:feae7879c1d7f46e189dfc",
  measurementId: "G-JGCGT3FKW9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



// Ashwani's code
// Sign Up code
document.getElementById("sign_up").addEventListener("submit", sign_up);
function sign_up() {
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
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBnGTRkVjUP00cNVKnKUEKuybly4lUSf_g",
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

// LogIn code
document.getElementById("log_in").addEventListener("submit", log_in);
function log_in() {
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
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBnGTRkVjUP00cNVKnKUEKuybly4lUSf_g",
      request
    )
      .then((res) => res.json())
      .then((res) => {
        if(res.registered==true){
          document.getElementById("log_in").reset()
          window.location.href="../varadcode/index.html"
        }else{
          alert('LogIn failed')
        }
    })
  }
  fun();
  
}


