// Hàm để lấy thông tin người dùng
async function getUserData() {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('Token không tồn tại. Vui lòng đăng nhập lại.');
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
    const logoutButton = document.getElementById('logout-button');
    const authButtons = document.getElementById('auth-btns');

    // Hiển thị thông tin người dùng
    userNameElements.forEach(element => element.textContent = user.username);
    userRoleElements.forEach(element => element.textContent = Array.from(user.roles).join(', '));

    // Hiển thị nút Logout và ẩn nút Login/Register
    logoutButton.style.display = 'block';
    authButtons.style.display = 'none';
}

// Hàm để xử lý sự kiện Logout
function handleLogout() {
    localStorage.removeItem('token'); // Xóa token khỏi localStorage
    window.location.reload(); // Tải lại trang để cập nhật giao diện
}

// Gán sự kiện cho nút Logout
document.getElementById('logout-button').addEventListener('click', handleLogout);

// Gọi hàm để lấy dữ liệu người dùng khi trang được tải
document.addEventListener('DOMContentLoaded', getUserData);