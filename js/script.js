$(function () {
	//$("#footer").load("footer.html");
	$('header').load('header.html');

});
$(document).ready(function () {
	var config = {
		apiKey: "AIzaSyAgTbBfhw6qEJ_2UOMRKFDqSqX_oMW_0kc",
		authDomain: "webfinalproject-9ddcc.firebaseapp.com",
		databaseURL: "https://webfinalproject-9ddcc.firebaseio.com",
		projectId: "webfinalproject-9ddcc",
		storageBucket: "webfinalproject-9ddcc.appspot.com",
		messagingSenderId: "462597688502"
	  };
	  firebase.initializeApp(config);

	//var dbRef = firebase.database().ref.child('object');
	//var ref = new Firebase("https://webfinalproject-9ddcc.firebaseio.com/");
	//console.log(dbRef);
	  firebase.auth().onAuthStateChanged(function(user){
		  if(user){document.getElementById("login_group").style.display = "none";document.getElementById("logout_button").style.display = "block"}
		  else{document.getElementById("login_group").style.display = "block";document.getElementById("logout_button").style.display = "none"}
	  })
	$(document).on("click", "#signUp-submit", function (e) {
		const email = $('#email').val();
		const pass = $('#password').val();
		//const auth = firebase.auth();
		//const promise = firebase.auth().createUserWithEmailAndPassword(email, pass);
		//promise.catch(function (e) {
		//	console.log(e.message);
		//});
		firebase.auth().createUserWithEmailAndPassword(email, pass)
			.catch(function (error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				if (errorCode == 'auth/weak-password') {
					alert('The password is too weak.');
				} else {
					alert(errorMessage);
				}
				console.log(error);
			});
	});
	$(document).on("click", "#login-submit", function (e) {
		const email = $('#email').val();
		const pass = $('#password').val();
		//const auth = firebase.auth();
		//const promise = firebase.auth().createUserWithEmailAndPassword(email, pass);
		//promise.catch(function (e) {
		//	console.log(e.message);
		//});
		firebase.auth().signInWithEmailAndPassword(email, pass)
			.catch(function (error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				if (errorCode == 'auth/weak-password') {
					alert('The password is too weak.');
				} else {
					alert(errorMessage);
				}
				console.log(error);
			});
	});
	//const auth = firebase.auth();
	//auth.signInWithEmailAndPassword(email, pass);
	//auth.createUserWithEmailAndPassword(email, pass)
	//auth.onAuthStateChanged(firebaseUser => {});
	$(document).on("click", "#nav-icon", function () {
		$("#nav-icon").toggleClass('open');

	});
});