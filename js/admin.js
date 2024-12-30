document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('Token không tồn tại. Vui lòng đăng nhập lại.');
        return;
    }

    fetch('http://localhost:8080/Elearning/stats', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Không thể lấy dữ liệu thống kê');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('total-users').textContent = data.totalUsers;
        document.getElementById('total-teachers').textContent = data.totalTeachers;
        document.getElementById('total-courses').textContent = data.totalCourses;

        // Hiển thị biểu đồ
        const ctx = document.getElementById('dashboardChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Người dùng', 'Giáo viên', 'Bài học'],
                datasets: [{
                    label: 'Thống kê',
                    data: [data.totalUsers, data.totalTeachers, data.totalCourses],
                    backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
                    borderColor: ['#4e73df', '#1cc88a', '#36b9cc'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });
});

function handleLogout() {
    localStorage.removeItem('token'); // Xóa token khỏi localStorage
    window.location.href = 'login.html'; // Chuyển hướng đến trang đăng nhập
}