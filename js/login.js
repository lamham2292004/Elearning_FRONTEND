document.getElementById("login-btn").addEventListener("click", async function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Kiểm tra nếu có bất kỳ trường nào bị bỏ trống
    if (!email || !password) {
        alert("Please fill in both fields.");
        return;
    }

    const loginData = { email: email, password: password };

    try {
        // Gửi yêu cầu đăng nhập tới API
        const response = await fetch('http://localhost:8080/Elearning/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        // Kiểm tra nếu yêu cầu trả về thành công
        if (response.ok) {
            const data = await response.json();
            console.log("Login successful:", data);

            // Kiểm tra nếu API trả về token
            if (data.token) {
                // Lưu token vào localStorage và điều hướng đến trang home
                localStorage.setItem('authToken', data.token);
                alert("Login successful!");
                window.location.href = "home.html"; // Điều hướng sau khi đăng nhập thành công
            } else {
                // Nếu không có token, hiển thị thông báo lỗi
                alert("Login failed: No token returned from server.");
            }
        } else {
            // Nếu response không phải là thành công, lấy thông tin lỗi từ API
            const errorData = await response.json();
            alert("Login failed: " + (errorData.message || "Invalid credentials"));
        }
    } catch (error) {
        // Bắt lỗi nếu không thể kết nối với server
        console.error("Error during login:", error);
        alert("Cannot connect to the server. Please try again later.");
    }
});
