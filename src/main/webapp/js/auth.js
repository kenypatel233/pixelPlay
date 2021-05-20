const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e) => {
    e.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email,password).then(cred => {
        signupForm.reset();
        window.location.href="welcome.html";
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert(errorMessage);
    })
});

const signinForm = document.querySelector('#signin-form');
signinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signinForm['signin-email'].value;
    const password = signinForm['signin-password'].value;

    auth.signInWithEmailAndPassword(email,password).then(cred => {
        signinForm.reset();
        window.location.href="welcome.html";
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert(errorMessage);
    })
});
