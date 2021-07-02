let user = localStorage.getItem('user');

$(() => {
  if (!user) {
    renderLogin();
    $('.modal-cont').hide()

    $('#login').click(function (event) {
      $('.modal-cont').show()
      $('.get_started').css('z-index', '-1')


      $('.modal-box').on('click', '.close', function () {
        $('.modal-cont').hide()
      });



      $('#login-box').submit(function (event) {
        event.preventDefault();
        console.log('the form is submitted')

    const data = $(this).serialize();

        $.ajax({
          method: "POST",
          url: "/login",
          data
        })
        .then(json => {
            if (!json) {
              console.log("the json file is not transfered")
            }

            console.log('json on front-end:', json)

          localStorage.setItem('user', JSON.stringify(json));
          console.log("storage session", localStorage.getItem('user'))

          })
      })

    })
  }


})



const renderLogin = function () {
  $('main').css({'margin': '0', 'padding':'0', 'width':'100%'})
  $('html').css('background','none')
  $('.nav-container').css('margin', '0')
  $('nav').css('background-color', 'white')
  $('.nav-container').html(`
<nav class="login-nav-container">
  <img id='logo' src='images/logo.jpg'>
  <p class="main_text">Keep your tasks and recommendations organised</p>
  <ul class="login-nav-bar-right">
    <li id="register">Register</li>
    <li id="login">Login</li>
  </ul>
</nav>


<div class="modal-cont">
<div class="modal-box">
    <span class="close">&times;</span>
    <form id="login-box">
      <h1> Login Page </h1>
          <input id="username_input" type="username" name="username" placeholder="Username" required>
        <input type="password" id="password_input" name="password" placeholder="Password" required>
        <input type="submit" class="login_button"></input>
      </form>
</div>
</div>
`)


$('main').css({'display':'flex', 'flex-direction':'column'})
  $('main').html(`
 <div class="login-main">
 <img class="main-pic" src='/images/main_body_image.png'>
 <button class="get_started">Get Started</button>
</div>
<footer><i class="far fa-copyright"></i> Casey Wood, Jojo Li, Korlan Kassembayeva</footer>
`)
}
