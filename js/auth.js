const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Get values
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validation
    if (username.length < 3) {
      alert("Username must be at least 3 characters");
      return;
    }

    if (!email.includes("@")) {
      alert("Enter a valid email");
      return;
    }

    if (password.length < 5) {
      alert("Password must be at least 5 characters");
      return;
    }

    // Create user object
    const user = {
      username,
      email,
      password
    };

    // Store in localStorage
    localStorage.setItem("user", JSON.stringify(user));

    alert("Signup successful!");

    // Redirect to login
    window.location.href = "index.html";
  });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!storedUser) {
      alert("No user found. Please sign up first.");
      return;
    }

    if (username === storedUser.username && password === storedUser.password) {
      // Save login state
      localStorage.setItem("isLoggedIn", "true");

      alert("Login successful!");

      window.location.href = "home.html";
    } else {
      alert("Invalid username or password");
    }
  });
}