document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Ngừng việc form gửi mặc định

    // Lấy thông tin từ form
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const phone = document.getElementById("phone").value;

    // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp không
    if (password !== confirmPassword) {
        alert("Mật khẩu không khớp!");
        return;
    }

    // Tạo object chứa dữ liệu người dùng
    const userData = {
        username: name, // Đảm bảo rằng key là 'username'
        email: email,
        password: password,
        phone: phone
    };

    // Gửi yêu cầu POST đến API đăng ký
    fetch('http://localhost:8080/Elearning/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Sử dụng application/json thay vì multipart/form-data
        },
        body: JSON.stringify(userData) // Chuyển object thành JSON
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 200) {
            alert("Đăng ký thành công!");
            window.location.href = "login.html";
        } else {
            alert("Đăng ký thất bại: " + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Có lỗi xảy ra. Vui lòng thử lại.");
    });
});