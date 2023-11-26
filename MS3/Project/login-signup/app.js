// Simulated database for demonstration purposes
import * as data from "../data.js"
  // Function to handle the login process
  function handleLogin() {
    const fakeDatabase = data.getDatabase()
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const user = fakeDatabase.users.find(user => user.email === email && user.password === password);
  
    if (user) {
      // alert('Login successful!');
      window.location.href = '../search-files/search.html';

    } else {
      alert('Login failed: user not found or incorrect password.');
    }
    return false; // Prevent form submission
  }
  
  // Function to handle the signup process
  function handleSignup() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
  
    if (password.length >= 12) {
      if (password === confirmPassword) {
        fakeDatabase.users.push({ username: username, email: email, password: password });
        alert('Signup successful!');
        window.location.href = 'login.html'; //
      } else {
        alert('Passwords do not match.');
      }
    } else {
      alert('Password must be at least 12 characters long.');
    }
  
    return false; // Prevent form submission
  }

  // Function to check password length
  function checkPasswordLength() {
    const password = document.getElementById('password').value;
    const passwordHelp = document.getElementById('password-help');
    if (password.length < 12) {
      passwordHelp.style.display = 'block';
    } else {
      passwordHelp.style.display = 'none';
    }
  }


  // Redirect to the signup page
  function handleGoToSignup() {
    window.location.href = 'signup.html'; // Adjust to the correct path
  }
  
  // Redirect to the login page
  function handleGoToLogin() {
    window.location.href = 'login.html'; // Adjust to the correct path
  }
  
  // Handle "Continue as guest" action
  function handleContinueAsGuest() {
    // Implement the logic for continuing as guest
    window.location.href = "../search-files/search.html"
  }
  
  // Handle "Forgot password" action
  function handleForgotPassword() {
    // Implement the logic for forgotten password
    alert('we have sent an email to your email address.');
  }
  
