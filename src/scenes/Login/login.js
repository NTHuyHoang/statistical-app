document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Ngăn chặn form submit mặc định
            // Chuyển hướng tới trang khác
            window.location.href = this.action;
        });
    }
});
