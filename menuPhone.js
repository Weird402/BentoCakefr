window.addEventListener('pageshow', function (event) {
    var nav = document.querySelector('.navList');
    nav.classList.remove('show-menu');
});

function showMenu() {
    var nav = document.querySelector('.navList');
    nav.classList.toggle('show-menu');
}

function hideMenu(){
    var nav = document.querySelector('.navigate');
    nav.classList.remove('show-menu');
}