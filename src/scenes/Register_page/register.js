document.addEventListener('DOMContentLoaded', function() {
    var registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Ngăn chặn form submit mặc định
            // Chuyển hướng tới trang khác
            window.location.href = this.action;
        });
    }
});
