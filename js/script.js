$(function () {
    $("footer").load("footer.html");
    $('header').load('header.html');
});

var edt_uid;

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
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            document.getElementById("header_user_email").append(firebase.auth().currentUser.email)
            document.getElementById("login_group").style.display = "none";
            document.getElementById("logout_group").style.display = "block"
            if (location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == "dataEntry.html" || location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == "dataEntry") {
                document.getElementById("login_warning").style.display="none";
                document.getElementById("dataEntry").style.display="block";
                loadData();
            }
            if (location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == "admin.html" || location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == "admin") {
                document.getElementById("admin_warning").style.display="none";
                document.getElementById("all_student_data").style.display="block";
                loadAllStudentData()
            }
        } else {
            if (location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == "admin.html" || location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == "admin") {
                document.getElementById("admin_warning").style.display="block";
                document.getElementById("all_student_data").style.display="none";
            }
            if (location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == "dataEntry.html" || location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == "dataEntry") {
                document.getElementById("login_warning").style.display="block";
                document.getElementById("dataEntry").style.display="none";
            }
            document.getElementById("login_group").style.display = "block";
            document.getElementById("logout_group").style.display = "none"
        }
    })
    $(document).on("click", "#signUp-submit", function (e) {
        const email = $('#email').val();
        const pass = $('#password').val();
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
        location.reload();
    });
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
        alert("儲存成功")
    });
    $(document).on("click", ".flip", function (e) {
        clicked = ($(".flip").index(this))
        $(".panel:eq(" + clicked + ")").slideToggle("slow");
        //$(".xs1:eq(" + clicked + ")").toggle();
        //$(".xs2:eq(" + clicked + ")").toggle();
    });
    $(document).on("click", ".save_edt_btn", function (e) {
        clicked = ($(".flip").index(this))
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

        const dbUserid = dbUser.child(edt_uid)
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
            uid:edt_uid
        })
        loadAllStudentData();
    });
    $(document).on("click", ".edt_btn", function (e) {
        clicked = ($(".edt_btn").index(this))
        edt_uid = $(".hide:eq(" + clicked + ")").val();
        $(".panel:eq(" + clicked + ")").empty();
        $(".panel:eq(" + clicked + ")").append(
            $('<div class="row">').append(
                $('<div class="col-md-6">').append(
                    $('<div class="row">').append(
                        $('<div class="col-4">').append(
                            $("<p>", {
                                text: "中文姓名:"
                            })
                        ),
                        $('<div class="col-8">').append(
                            $("<input type='text' id='i_chineseName'>")
                        ),
                    )
                ),
                $('<div class="col-md-6">').append(
                    $('<div class="row">').append(
                        $('<div class="col-4">').append(
                            $("<p>", {
                                text: "英文姓名:"
                            })
                        ),
                        $('<div class="col-8">').append(
                            $("<input type='text' id='i_englishName'>")
                        ),
                    )
                ),
                $('<div class="col-md-6">').append(
                    $('<div class="row">').append(
                        $('<div class="col-4">').append(
                            $("<p>", {
                                text: "系所:"
                            })
                        ),
                        $('<div class="col-8">').append(
                            $("<input type='text' id='i_dept'>")
                        ),
                    )
                ),
                $('<div class="col-md-6">').append(
                    $('<div class="row">').append(
                        $('<div class="col-4">').append(
                            $("<p>", {
                                text: "學號:"
                            })
                        ),
                        $('<div class="col-8">').append(
                            $("<input type='text' id='i_studNo'>")
                        ),
                    )
                ),
                $('<div class="col-md-6">').append(
                    $('<div class="row">').append(
                        $('<div class="col-4">').append(
                            $("<p>", {
                                text: "在臺行動電話:"
                            })
                        ),
                        $('<div class="col-8">').append(
                            $("<input type='text' id='i_cellPhone'>")
                        ),
                    )
                ),
                $('<div class="col-md-6">').append(
                    $('<div class="row">').append(
                        $('<div class="col-4">').append(
                            $("<p>", {
                                text: "出生日期:"
                            })
                        ),
                        $('<div class="col-8">').append(
                            $("<input type='text' id='i_dob' placeholder='DD/MM/YYYY'>")
                        ),
                    )
                ),
                $('<div class="col-md-6">').append(
                    $('<div class="row">').append(
                        $('<div class="col-4">').append(
                            $("<p>", {
                                text: "護照號碼:"
                            })
                        ),
                        $('<div class="col-8">').append(
                            $("<input type='text' id='i_passportNo'>")
                        ),
                    )
                ),
                $('<div class="col-md-6">').append(
                    $('<div class="row">').append(
                        $('<div class="col-4">').append(
                            $("<p>", {
                                text: "居留證號碼:"
                            })
                        ),
                        $('<div class="col-8">').append(
                            $("<input type='text' id='i_arcNo'>")
                        ),
                    )
                ),
                $('<div class="col-md-6">').append(
                    $('<div class="row">').append(
                        $('<div class="col-4">').append(
                            $("<p>", {
                                text: "電子郵件:"
                            })
                        ),
                        $('<div class="col-8">').append(
                            $("<input type='text' id='i_email'>")
                        ),
                    )
                ),
                $("<input type='button' name='edit_Data' tabindex='4' class='btn btn-info save_edt_btn' value='Save'>"),
            ),
        );
        return firebase.database().ref('/users/' + edt_uid).once('value').then(function (snapshot) {
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
        //$(".xs1:eq("+clicked+")").toggle();
        //$(".xs2:eq("+clicked+")").toggle();
    });
});

function loadAllStudentData() {
    var uid = firebase.auth().currentUser.uid;
    var urlRef = firebase.database().ref("users");
    var allStudentData = new Array();
    urlRef.once("value", function (snapshot) {
        snapshot.forEach(function (child) {
            if (child.val().uid != uid)
                allStudentData.push(new student(child.val().ChineseName,
                    child.val().EnglishName,
                    child.val().Department,
                    child.val().StudentNo,
                    child.val().CellPhone,
                    child.val().DateOfBirth,
                    child.val().PassportNo,
                    child.val().ARCNo,
                    child.val().Email,
                    child.val().uid))
        })
        allStudentData.sort(sortByStdNo)
        $("#data_fuild").empty()
        for (var i = 0; i < allStudentData.length; i++) {
            $("#data_fuild").append(
                $('<div class="student_data">').append(
                    $('<div class="flip">').append(
                        $('<div class="row">').append(
                            $('<div class="col-sm-4">').append(
                                $("<h5>", {
                                    text: "名字: " + allStudentData[i].ChineseName
                                })
                            ),
                            $('<div class="col-sm-4">').append(
                                $("<h5>", {
                                    text: "學號: " + allStudentData[i].StudentNo
                                })
                            ),
                            $('<div class="col-sm-4">').append(
                                $("<h5>", {
                                    text: "科系: " + allStudentData[i].Department
                                })
                            )
                        )
                    )
                )
            )
            $("#data_fuild").append(
                $('<div class="panel">').append(
                    $('<div class="row">').append(
                        $('<div class="col-md-6">').append(
                            $('<div class="row">').append(
                                $('<div class="col-4">').append(
                                    $("<p>", {
                                        text: "中文姓名:"
                                    })
                                ),
                                $('<div class="col-8">').append(
                                    $("<p>", {
                                        text: allStudentData[i].ChineseName
                                    })
                                ),
                            )
                        ),
                        $('<div class="col-md-6">').append(
                            $('<div class="row">').append(
                                $('<div class="col-4">').append(
                                    $("<p>", {
                                        text: "英文姓名:"
                                    })
                                ),
                                $('<div class="col-8">').append(
                                    $("<p>", {
                                        text: allStudentData[i].EnglishName
                                    })
                                ),
                            )
                        ),
                        $('<div class="col-md-6">').append(
                            $('<div class="row">').append(
                                $('<div class="col-4">').append(
                                    $("<p>", {
                                        text: "系所:"
                                    })
                                ),
                                $('<div class="col-8">').append(
                                    $("<p>", {
                                        text: allStudentData[i].Department
                                    })
                                ),
                            )
                        ),
                        $('<div class="col-md-6">').append(
                            $('<div class="row">').append(
                                $('<div class="col-4">').append(
                                    $("<p>", {
                                        text: "學號:"
                                    })
                                ),
                                $('<div class="col-8">').append(
                                    $("<p>", {
                                        text: allStudentData[i].StudentNo
                                    })
                                ),
                            )
                        ),
                        $('<div class="col-md-6">').append(
                            $('<div class="row">').append(
                                $('<div class="col-4">').append(
                                    $("<p>", {
                                        text: "在臺行動電話:"
                                    })
                                ),
                                $('<div class="col-8">').append(
                                    $("<p>", {
                                        text: allStudentData[i].CellPhone
                                    })
                                ),
                            )
                        ),
                        $('<div class="col-md-6">').append(
                            $('<div class="row">').append(
                                $('<div class="col-4">').append(
                                    $("<p>", {
                                        text: "出生日期(DD/MM/YYYY):"
                                    })
                                ),
                                $('<div class="col-8">').append(
                                    $("<p>", {
                                        text: allStudentData[i].DateOfBirth
                                    })
                                ),
                            )
                        ),
                        $('<div class="col-md-6">').append(
                            $('<div class="row">').append(
                                $('<div class="col-4">').append(
                                    $("<p>", {
                                        text: "護照號碼:"
                                    })
                                ),
                                $('<div class="col-8">').append(
                                    $("<p>", {
                                        text: allStudentData[i].PassportNo
                                    })
                                ),
                            )
                        ),
                        $('<div class="col-md-6">').append(
                            $('<div class="row">').append(
                                $('<div class="col-4">').append(
                                    $("<p>", {
                                        text: "居留證號碼:"
                                    })
                                ),
                                $('<div class="col-8">').append(
                                    $("<p>", {
                                        text: allStudentData[i].ARCNo
                                    })
                                ),
                            )
                        ),
                        $('<div class="col-md-6">').append(
                            $('<div class="row">').append(
                                $('<div class="col-4">').append(
                                    $("<p>", {
                                        text: "電子郵件:"
                                    })
                                ),
                                $('<div class="col-8">').append(
                                    $("<p>", {
                                        text: allStudentData[i].Email
                                    })
                                ),
                            )
                        ),
                        $('<input type="button" name="edit_Data"class="btn btn-info edt_btn" value="Edit">'),
                        $("<p class='hide'>").val(allStudentData[i].uid),
                    )
                )
            )
        }
    },function(error) {
        // The Promise was rejected.
        document.getElementById("admin_warning").style.display="block";
        document.getElementById("all_student_data").style.display="none";
      }

)
    
}

function sortByStdNo(a, b) {
    if (parseInt(a.StudentNo) < parseInt(b.StudentNo))
        return -1;
    else
        return 1;
}

function student(chineseName, englishName, department, studentNo, cellPhone, dateOfBirth, passportNo, arcNo, email, uid) {
    this.ChineseName = chineseName;
    this.EnglishName = englishName;
    this.Department = department;
    this.StudentNo = studentNo;
    this.CellPhone = cellPhone;
    this.DateOfBirth = dateOfBirth;
    this.PassportNo = passportNo;
    this.ARCNo = arcNo;
    this.Email = email;
    this.uid = uid;
}

function loadData() {
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
}