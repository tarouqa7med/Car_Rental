// ==============================================
// 🔐 REGISTRATION.JS - LOGIN, REGISTER, FORGOT PASSWORD
// ==============================================

// Path to registered accounts txt file
const ACCOUNTS_FILE_PATH = "../user-data/registered_accounts.txt";
const USERS_STORAGE_KEY = "registered_accounts";

// ==============================================
// 📁 HELPER FUNCTIONS (Read from txt file)
// ==============================================

// Load users from registered_accounts.txt file (async function)
async function loadUsersFromFile() {
    try {
        // First try to fetch from the actual txt file
        const response = await fetch(ACCOUNTS_FILE_PATH);
        if (response.ok) {
            const text = await response.text();
            if (text.trim()) {
                // Parse the txt file - format: name\nemail\npassword (blank line between users)
                const users = parseUsersFromText(text);
                // Also save to localStorage for offline use
                localStorage.setItem(USERS_STORAGE_KEY, text);
                return users;
            }
        }
    } catch (e) {
        console.log("Could not read txt file, using localStorage");
    }
    
    // Fallback to localStorage if txt file read fails
    const data = localStorage.getItem(USERS_STORAGE_KEY);
    if (!data) return [];
    return parseUsersFromText(data);
}

// Parse users from text format: name\nemail\npassword\n\nname2\nemail2\npassword2\n
function parseUsersFromText(text) {
    const users = [];
    const blocks = text.trim().split(/\n\n+/);
    
    blocks.forEach(block => {
        const lines = block.split("\n").map(line => line.trim());
        if (lines.length >= 2) {
            users.push({
                name: lines[0] || "",
                email: lines[1] || "",
                password: lines[2] || ""
            });
        }
    });
    
    return users;
}

// Save users (store in localStorage as backup)
// Note: Client-side JS cannot write to actual files on server
function saveUsersToFile(users) {
    // Convert to text format: name\nemail\npassword\n
    const text = users.map(u => `${u.name}\n${u.email}\n${u.password}`).join("\n\n");
    localStorage.setItem(USERS_STORAGE_KEY, text);
}

// Find user by email
function findUserByEmail(email) {
    const users = loadUsersFromFile();
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
}

// Check if email exists
function emailExists(email) {
    return findUserByEmail(email) !== undefined;
}

// ==============================================
// 📝 REGISTER PAGE FUNCTIONALITY
// ==============================================

function initRegisterForm() {
    const form = document.getElementById("registerForm");
    if (!form) return;

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const name = document.querySelector("input[name='name']").value.trim();
        const email = document.querySelector("input[name='email']").value.trim();
        const password = document.querySelector("input[name='password']").value;
        
        // Get or create error message element
        let errorMsg = document.getElementById("register-error");
        if (!errorMsg) {
            errorMsg = document.createElement("p");
            errorMsg.id = "register-error";
            errorMsg.style.color = "red";
            errorMsg.style.textAlign = "center";
            errorMsg.style.marginTop = "10px";
            form.appendChild(errorMsg);
        }
        
        errorMsg.innerText = "";
        errorMsg.style.color = "red";
        
        // Check if email already exists (IMPORTANT: email must NOT exist)
        if (emailExists(email)) {
            errorMsg.innerText = "Email already exists";
            return;
        }
        
        // Validate inputs
        if (name.length < 2) {
            errorMsg.innerText = "Name must be at least 2 characters";
            return;
        }
        
        if (password.length < 4) {
            errorMsg.innerText = "Password must be at least 4 characters";
            return;
        }
        
        // Create new user and save to file
        const newUser = {
            name: name,
            email: email,
            password: password,
            createdAt: new Date().toISOString()
        };
        
        const users = loadUsersFromFile();
        users.push(newUser);
        saveUsersToFile(users);
        
        // Success message
        errorMsg.style.color = "green";
        errorMsg.innerText = "Account created! Redirecting to login...";
        
        // Redirect to login page after 1.5 seconds
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    });
}

// ==============================================
// 🔑 LOGIN PAGE FUNCTIONALITY
// ==============================================

function initLoginForm() {
    const form = document.getElementById("loginForm");
    if (!form) return;

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const email = document.querySelector("input[name='email']").value.trim();
        const password = document.querySelector("input[name='password']").value;
        
        // Get or create error message element
        let errorMsg = document.getElementById("login-error");
        if (!errorMsg) {
            errorMsg = document.createElement("p");
            errorMsg.id = "login-error";
            errorMsg.style.color = "red";
            errorMsg.style.textAlign = "center";
            errorMsg.style.marginTop = "10px";
            form.appendChild(errorMsg);
        }
        
        errorMsg.innerText = "";
        errorMsg.style.color = "red";
        
        // Check if email exists in file
        if (!emailExists(email)) {
            errorMsg.innerText = "Email not found";
            return;
        }
        
        // Get user and check password
        const user = findUserByEmail(email);
        
        if (user.password !== password) {
            errorMsg.innerText = "Incorrect password";
            return;
        }
        
        // Login successful
        errorMsg.style.color = "green";
        errorMsg.innerText = "Login successful!";
        
        // Store logged in user info
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        
        // Redirect after 2.5 seconds (2500 milliseconds)
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 2500);
    });
}

// ==============================================
// 🔄 FORGOT PASSWORD FUNCTIONALITY
// ==============================================

function initForgotPasswordForm() {
    // Email verification form
    const emailForm = document.getElementById("emailVerifyForm");
    if (emailForm) {
        emailForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const email = emailForm.querySelector("input[name='email']").value.trim();
            
            let errorMsg = emailForm.querySelector(".email-error");
            if (!errorMsg) {
                errorMsg = document.createElement("p");
                errorMsg.className = "email-error";
                errorMsg.style.color = "red";
                errorMsg.style.textAlign = "center";
                errorMsg.style.marginTop = "10px";
                emailForm.appendChild(errorMsg);
            }
            
            errorMsg.innerText = "";
            errorMsg.style.color = "red";
            
            // Check if email exists
            if (!emailExists(email)) {
                errorMsg.innerText = "Email not exist";
                return;
            }
            
            // Email found - proceed
            errorMsg.style.color = "green";
            errorMsg.innerText = "Email found! Enter new password below.";
            
            // Store email for password reset
            localStorage.setItem("resetEmail", email);
            
            // Hide email form, show new password form
            emailForm.style.display = "none";
            const otpForm = document.getElementById("otpForm");
            const newPasswordForm = document.getElementById("newPasswordForm");
            if (otpForm) otpForm.style.display = "block";
            if (newPasswordForm) newPasswordForm.style.display = "block";
        });
    }
    
    // New password form
    const newPasswordForm = document.getElementById("newPasswordForm");
    if (newPasswordForm) {
        newPasswordForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const newPassword = newPasswordForm.querySelector("input[name='newPassword']").value;
            
            let errorMsg = newPasswordForm.querySelector(".password-error");
            if (!errorMsg) {
                errorMsg = document.createElement("p");
                errorMsg.className = "password-error";
                errorMsg.style.color = "red";
                errorMsg.style.textAlign = "center";
                errorMsg.style.marginTop = "10px";
                newPasswordForm.appendChild(errorMsg);
            }
            
            errorMsg.innerText = "";
            errorMsg.style.color = "red";
            
            // Get stored email
            const resetEmail = localStorage.getItem("resetEmail");
            if (!resetEmail) {
                errorMsg.innerText = "Session expired. Please start again.";
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
                return;
            }
            
            // Validate password
            if (newPassword.length < 4) {
                errorMsg.innerText = "Password must be at least 4 characters";
                return;
            }
            
            // Update password in storage
            const users = loadUsersFromFile();
            const userIndex = users.findIndex(u => u.email.toLowerCase() === resetEmail.toLowerCase());
            
            if (userIndex !== -1) {
                users[userIndex].password = newPassword;
                saveUsersToFile(users);
                
                // Success
                errorMsg.style.color = "green";
                errorMsg.innerText = "Password reset successful! Redirecting to login...";
                
                // Clear reset email
                localStorage.removeItem("resetEmail");
                
                // Redirect to login after 2 seconds
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2000);
            }
        });
    }
}

// ==============================================
// 🚀 INITIALIZE ALL FORMS ON PAGE LOAD
// ==============================================

document.addEventListener("DOMContentLoaded", function() {
    initRegisterForm();
    initLoginForm();
    initForgotPasswordForm();
});
