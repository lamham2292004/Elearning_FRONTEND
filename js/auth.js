// Hàm để lấy thông tin người dùng
async function getUserData() {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('Token không tồn tại. Vui lòng đăng nhập lại.');
        window.location.href = 'login.html'; // Điều hướng về trang đăng nhập nếu không có token
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/Elearning/users/myInfo', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Không thể lấy dữ liệu người dùng');
        }

        const data = await response.json();
        console.log('Dữ liệu người dùng:', data);
        displayUserData(data.result); // Gọi hàm để hiển thị dữ liệu
    } catch (error) {
        console.error('Lỗi:', error);
    }
}

// Hàm để hiển thị dữ liệu người dùng
function displayUserData(user) {
    const userNameElements = document.querySelectorAll('#user-name');
    const userRoleElements = document.querySelectorAll('#user-role');
    const userUsernameElement = document.getElementById('user-username');
    const userEmailElement = document.getElementById('user-email');
    const userPhoneElement = document.getElementById('user-phone');
    const userPasswordElement = document.getElementById('user-password');
    const logoutButton = document.getElementById('logout-button');
    const authButtons = document.getElementById('auth-btns');
    const registerButton = document.querySelectorAll('.btn[href="register.html"]');

    // Lưu mật khẩu vào biến để sử dụng sau
    let userPassword = user.password;

    // Hiển thị thông tin người dùng
    userNameElements.forEach(element => element.textContent = user.username);
    userRoleElements.forEach(element => element.textContent = Array.from(user.roles).join(', '));
    if (userUsernameElement) userUsernameElement.textContent = user.username;
    if (userEmailElement) userEmailElement.textContent = user.email;
    if (userPhoneElement) userPhoneElement.textContent = user.phone;
    if (userPasswordElement) userPasswordElement.textContent = '********'; // Hiển thị mật khẩu dưới dạng ẩn

    // Hiển thị nút Logout và ẩn nút Login/Register
    if (logoutButton) logoutButton.style.display = 'block';
    if (authButtons) authButtons.style.display = 'none';

    // Chuyển đổi liên kết "Register" thành "Profile"
    registerButton.forEach(element => {
        element.textContent = 'Profile';
        element.href = 'profile.html';
    });

    // Xử lý sự kiện hiển thị và ẩn mật khẩu
    const showPasswordCheckbox = document.getElementById('show-password');
    if (showPasswordCheckbox) {
        showPasswordCheckbox.addEventListener('change', function() {
            if (this.checked) {
                userPasswordElement.textContent = userPassword; // Hiển thị mật khẩu thật
            } else {
                userPasswordElement.textContent = '********'; // Ẩn mật khẩu
            }
        });
    }
}

// Hàm để xử lý sự kiện Logout
function handleLogout() {
    localStorage.removeItem('token'); // Xóa token khỏi localStorage
    window.location.href = 'login.html'; // Điều hướng về trang đăng nhập
}

// Gán sự kiện cho nút Logout
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
    getUserData();
});