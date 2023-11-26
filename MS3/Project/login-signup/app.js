// Simulated database for demonstration purposes
  // Function to handle the login process
  function handleSignup() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
  
    if (password.length >= 12) {
      if (password === confirmPassword) {
        // save the user into LocalStorage
        if (!localStorage.getItem(email)) { // check if user exist
          localStorage.setItem(email, JSON.stringify({ username, password }));
          alert('Signup successful!');
          window.location.href = 'login.html';
        } else {
          alert('Email already registered.');
        }
      } else {
        alert('Passwords do not match.');
      }
    } else {
      alert('Password must be at least 12 characters long.');
    }
  
    return false; // Prevent form submission
  }
  
  
  function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const storedUser = localStorage.getItem(email);
    if (storedUser) {
      const { username, password: storedPassword } = JSON.parse(storedUser);
      if (password === storedPassword) {
        // alert('Login successful!');
        window.location.href = '/search-files/search.html';
        // 可以选择在此处设置全局变量或另一个 LocalStorage 条目来保存当前登录的用户信息
      } else {
        alert('Login failed: incorrect password.');
      }
    } else {
      alert('Login failed: user not found.');
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
  
