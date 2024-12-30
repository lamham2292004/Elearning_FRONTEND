document.getElementById("updateForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Ngừng việc form gửi mặc định

    // Lấy thông tin từ form
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp không
    if (password !== confirmPassword) {
        alert("Mật khẩu không khớp!");
        return;
    }

    // Tạo object chứa dữ liệu người dùng
    const userData = {
        username: name,
        phone: phone,
        password: password
    };

    // Lấy token từ localStorage
    const token = localStorage.getItem('token');

    // Lấy ID người dùng từ localStorage hoặc từ một nguồn khác
    const userId = localStorage.getItem('userId');

    if (!userId) {
        alert("Không tìm thấy ID người dùng. Vui lòng đăng nhập lại.");
        return;
    }

    // Gửi yêu cầu PUT đến API cập nhật
    fetch(`http://localhost:8080/Elearning/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData) // Chuyển object thành JSON
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.message); });
        }
        return response.json();
    })
    .then(data => {
        if (data.code === 200) {
            alert("Cập nhật thành công!");
            window.location.href = "profile.html";
        } else {
            alert("Cập nhật thất bại: " + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Có lỗi xảy ra. Vui lòng thử lại.");
    });
});