const ProtectedRouteUser = ({ children, user }) => {
    // Kiểm tra nếu user chưa được xác thực hoặc không phải admin
    if (!user || user.role !== 'tourist') {
      window.location.href = 'http://localhost:3001/login';
      return null; // Tránh render nội dung // Chuyển hướng về trang login
    }
  
    return children; // Hiển thị nội dung nếu người dùng hợp lệ
  };
  
  export default ProtectedRouteUser;