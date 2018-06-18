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
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			document.getElementById("login_group").style.display = "none";
			document.getElementById("logout_group").style.display = "block"
			if(location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == "dataEntry.html")
			loadData();
		} else {
			document.getElementById("login_group").style.display = "block";
			document.getElementById("logout_group").style.display = "none"
		}
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
	$(document).on("click", "#logout-submit", function (e) {
		firebase.auth().signOut().then(function () {}).catch(function (error) {
			console.log(error)
		});
	});
	//const auth = firebase.auth();
	//auth.signInWithEmailAndPassword(email, pass);
	//auth.createUserWithEmailAndPassword(email, pass)
	//auth.onAuthStateChanged(firebaseUser => {});
	$(document).on("click", "#nav-icon", function () {
		$("#nav-icon").toggleClass('open');

	});
	$(document).on("click", "#data-submit", function (e) {
		var dbUser = firebase.database().ref().child('users');
		const cName = $('#i_chineseName').val();
		const eName = $('#i_englishName').val();
		const dept = $('#i_dept').val();
		const studNo = $('#i_studNo').val();
		const cellPhone = $('#i_cellPhone').val();
		const dob = $('#i_dob').val();
		const passportNo = $('#i_passportNo').val();
		const arcNo = $('#i_arcNo').val();
		const email = $('#i_email').val();
		const user = firebase.auth().currentUser;
		console.log(user.uid)

		const dbUserid = dbUser.child(user.uid)
		dbUserid.set({
			ChineseName: cName,
			EnglishName: eName,
			Department: dept,
			StudentNo: studNo,
			CellPhone: cellPhone,
			DateOfBirth: dob,
			PassportNo: passportNo,
			ARCNo: arcNo,
			Email: email,
			uid: user.uid
		})
	});
});

function loadData() {
	if (firebase.auth().currentUser) {
		var userId = firebase.auth().currentUser.uid;
		return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
			$('#i_chineseName').val(snapshot.val().ChineseName);
			$('#i_englishName').val(snapshot.val().EnglishName);
			$('#i_dept').val(snapshot.val().Department);
			$('#i_studNo').val(snapshot.val().StudentNo);
			$('#i_cellPhone').val(snapshot.val().CellPhone);
			$('#i_dob').val(snapshot.val().DateOfBirth);
			$('#i_passportNo').val(snapshot.val().PassportNo);
			$('#i_arcNo').val(snapshot.val().ARCNo);
			$('#i_email').val(snapshot.val().Email);
		});
	}else{console.log("testset1111")}
}
