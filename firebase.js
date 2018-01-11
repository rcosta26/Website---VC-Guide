// Initialize Firebase
var config = {
	apiKey: "AIzaSyC1DTWA_LhtjQFZYEkMsJcEo9cTaFs8QG4",
	authDomain: "turismo-vc.firebaseapp.com",
	databaseURL: "https://turismo-vc.firebaseio.com",
	storageBucket: "turismo-vc.appspot.com",
	messagingSenderId: "29044026342"
};
firebase.initializeApp(config);

$(document).ready(function () {

	var database = firebase.database();
	$(function () {
		/*
		 Login de utilizador
		*/
		$("#confirm-login").click(function () {
			firebase.auth().signInWithEmailAndPassword($("#emaillog").val(), $("#passlog").val()).catch(function (error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				alert(error.message);
				console.log(errorCode);
				console.log(errorMessage);
			});

			firebase.auth().onAuthStateChanged(user => {
				console.log("firebase.auth().onAuthStateChanged" + user);
				if (user) {
					$("#loginnav").hide();
					$("#logoutnav").removeAttr("style").show();
				}
			});
			return false;
		});

		/*
		Novo user
		verifica email e passwords
		Apos registo fica o utilizador loggado
		*/
		$("#registoconfirm").click(function () {
			var email = $("#email").val();
			var password = $("#passreg1").val();
			var cpassword = $("#passreg2").val();
			if (email == '' || password == '' || cpassword == '') {
				alert("Preencha todos os campos");
			} else if (!(password).match(cpassword)) {
				alert("As passwords não condizem. Tente de novo");
			} else {
				firebase.auth().createUserWithEmailAndPassword($("#emailreg").val(), $("#passreg1").val()).catch(function (error) {
					var errorCode = error.code;
					var errorMessage = error.message;
					if (errorCode == 'auth/weak-password') {
						alert('The password is too weak.');
					} else {
						alert(errorMessage);
					}
				});
				firebase.auth().onAuthStateChanged(user => {
					console.log("firebase.auth().onAuthStateChanged" + user);
					if (user) {
						$("#loginnav").hide();
						$("#logoutnav").removeAttr("style").show();
					}
				});
			}
		});

		/*Logout
		Pergunta se quer confirmar
		Termina sessao se sim
		*/
		$("#logoutnav").click(function () {
			firebase.auth().signOut().then(function () {
				var txt;
				var r = confirm("Quer confirmar o logout?");
				if (r == true) {
					txt = "Terminou a sua sessão!";
					$("#loginnav").show();
					$("#logoutnav").removeAttr("style").hide();
				} else {
					txt = "Cancelou o logout!";
				}
				alert(txt);
			}, function (error) {
				console.log("Sign Out Error", error);
			});
		});

	});

});