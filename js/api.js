// Hàm để lấy token từ localStorage
function getAuthToken() {
    return localStorage.getItem('token');  // Lấy token từ localStorage
}

// Hàm gửi yêu cầu API GET để lấy thông tin người dùng
function fetchData(url) {
    const token = getAuthToken();
    
    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token ? `Bearer ${token}` : '', // Gửi token nếu có
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Lỗi trong yêu cầu API');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
        throw error; // Ném lỗi ra để mã gọi có thể xử lý
    });
}

// Hàm gửi yêu cầu API POST
function postData(url, data) {
    const token = getAuthToken();
    
    return fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': token ? `Bearer ${token}` : '', // Gửi token nếu có
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Lỗi trong yêu cầu API');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Có lỗi xảy ra khi gửi dữ liệu:', error);
        throw error; // Ném lỗi ra để mã gọi có thể xử lý
    });
}

// Hàm đăng xuất (xóa token)
function logout() {
    localStorage.removeItem('token'); // Xóa token khi đăng xuất
    window.location.href = '/login.html'; // Chuyển hướng về trang đăng nhập
}

// Xuất các hàm ra toàn cục
window.getAuthToken = getAuthToken;
window.fetchData = fetchData;
window.postData = postData;
window.logout = logout;