document.getElementById('login-btn').addEventListener('click', function () {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        showErrorMessage("Please fill in both email and password!");
        return;
    }

    if (!isValidEmail(email)) {
        showErrorMessage("Please enter a valid email address!");
        return;
    }

    const data = { email, password };

    fetch('http://localhost:8080/Elearning/auth/token', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.message); });
        }
        return response.json();
    })
    .then(data => {
        if (data && data.result && data.result.token && data.result.userId) {
            localStorage.setItem('token', data.result.token); // Lưu token vào localStorage
            localStorage.setItem('userId', data.result.userId); // Lưu userId vào localStorage
            localStorage.setItem('role', data.result.role); //
            localStorage.setItem('email', email); // Lưu email vào localStorage

            // Kiểm tra vai trò của người dùng và chuyển hướng đến trang quản trị nếu là Admin
            if (data.result.roles.includes('ADMIN')) {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'home.html';
            }
        } else {
            showErrorMessage("Thông tin đăng nhập không hợp lệ hoặc mã thông báo không được cung cấp.");
        }
    })
    .catch(error => {
        console.error("Error during login:", error);
        if (error.message === "Email không tồn tại") {
            showErrorMessage("Email không tồn tại.");
        } else if (error.message === "Mật khẩu sai") {
            showErrorMessage("Mật khẩu sai.");
        } else {
            showErrorMessage("Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.");
        }
    });
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showErrorMessage(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
}