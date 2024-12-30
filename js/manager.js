document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('Token không tồn tại. Vui lòng đăng nhập lại.');
        return;
    }

    fetch('http://localhost:8080/Elearning/users', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Không thể lấy danh sách người dùng');
        }
        return response.json();
    })
    .then(data => {
        const userList = document.getElementById('user-list');
        data.result.forEach(user => {
            const roles = user.roles ? user.roles.join(', ') : 'N/A';
            const userItem = document.createElement('div');
            userItem.classList.add('user-item');
            userItem.innerHTML = `
                <div class="user-info">
                    <p><strong>Tên:</strong> ${user.username}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Số điện thoại:</strong> ${user.phone}</p>
                    <p><strong>Vai trò:</strong> ${roles}</p>
                </div>
                <button class="inline-btn delete-btn" onclick="deleteUser('${user.id}', '${roles}')">Xóa</button>
            `;
            userList.appendChild(userItem);
        });
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });
});

function deleteUser(userId, roles) {
    if (roles.includes('ADMIN')) {
        alert('Không thể xóa tài khoản admin');
        return;
    }

    const token = localStorage.getItem('token');

    fetch(`http://localhost:8080/Elearning/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Không thể xóa người dùng');
        }
        alert('Xóa người dùng thành công');
        window.location.reload(); // Tải lại trang để cập nhật danh sách người dùng
    })
    .catch(error => {
        console.error('Lỗi:', error);
        alert('Có lỗi xảy ra. Vui lòng thử lại.');
    });
}

function handleLogout() {
    localStorage.removeItem('token'); // Xóa token khỏi localStorage
    window.location.href = 'login.html'; // Chuyển hướng đến trang đăng nhập
}