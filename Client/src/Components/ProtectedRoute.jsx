const ProtectedRouteUser = ({ children, user }) => {
    if (user === null) {
        return children;
    }
      // Kiểm tra nếu user chưa được xác thực hoặc không phải admin
    if (user.role === 'provider' || user.role === 'admin') {
    window.location.href = 'http://localhost:3001/login';
    return null; // Tránh render nội dung // Chuyển hướng về trang login
    }
    
      return children; // Hiển thị nội dung nếu người dùng hợp lệ
    };
    
    export default ProtectedRouteUser;