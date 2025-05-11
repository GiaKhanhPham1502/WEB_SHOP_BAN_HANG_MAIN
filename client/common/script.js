const logout = document.getElementById('logout');
if (logout) {
    logout.addEventListener('click', () => {
        window.location.href = '../signin/index.html';
    });
}