var comments = [];

document.addEventListener("DOMContentLoaded", function() {
    const stars = document.querySelectorAll(".star");
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener("click", function() {
            resetStars();
            this.classList.add("active");
            selectedRating = this.getAttribute("data-rating");
        });

        star.addEventListener("mouseover", function() {
            resetStars();
            highlightStars(this.getAttribute("data-rating"));
        });

        star.addEventListener("mouseout", function() {
            resetStars();
            highlightStars(selectedRating);
        });
    });

    function resetStars() {
        stars.forEach(star => {
            star.classList.remove("active");
        });
    }

    function highlightStars(endIndex) {
        for (let i = 0; i < endIndex; i++) {
            stars[i].classList.add("active");
        }
    }

    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById("msg");

    form.addEventListener('submit', e => {
        e.preventDefault();

        const formData = new FormData(form);
        formData.append('user_rating', selectedRating);
/*
        fetch(scriptURL, { method: 'POST', body: formData })
          .then(response => {
            msg.innerHTML = "Message has sent successfully!";
            setTimeout(function(){
                msg.innerHTML = "";
            }, 5000);
            form.reset();
          })
          .catch(error => console.error('Error!', error.message));*/
    });

   
    loadComments();

    document.getElementById('comment-add').onclick = function(){
        var commentName = document.getElementById('name-input');
        var commentEmail = document.getElementById('email-input');
        var commentBody = document.getElementById('recenze-imput');

        var comment = {
            name: commentName.value,
            email: commentEmail.value,
            body: commentBody.value,
            time: Math.floor(Date.now() / 1000),
            rating: Number(selectedRating)
        };
        console.log(comment);

        commentEmail.value = '';
        commentBody.value = '';
        commentName.value = '';
        

        comments.push(comment);
        saveComent();
        showComent();
    };
});
function saveComent(){
    localStorage.setItem('comments', JSON.stringify(comments));
}
function loadComments(){
    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
    showComent(); // Change this line
}

function showComent(){
    let commentField = document.getElementById('comment-field');
    let out = '';

    comments.forEach(function(item){
        let stars = '';
        for (let i = 0; i < item.rating; i++) {
            stars += '⭐';
        }
        out += `<div class="comment-block">`;
        out += `<p class="text-right small" id="time"><em>${timeConverter(item.time)}</em></p><br>`;
        out += `<div style="display: flex; flex-direction: row; justify-content: space-between;"><h3 class="alert alert-primary" role="alert">${item.name}</h3><div class="stars">${stars}</div></div><br />`;
        out += `<p class="alert alert-primary" id="em" role="alert">${item.email}</p><br>`;
        out += `<div class="comment-block-main">`;
        out += `<p class="alert alert-success" id="mainKomentText" role="alert">${item.body}</p><br>`;
        out += `</div>`;
        out += `</div>`;
    });
    commentField.innerHTML = out;
}

function resetComments() {
    comments = []; // Очищаємо масив коментарів
    saveComent(); // Зберігаємо пустий масив в локальному сховищі
    showComent(); // Показуємо оновлений список коментарів (пустий)
}


function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }