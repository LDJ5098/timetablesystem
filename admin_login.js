function checkLogin() {
    var userName = document.getElementsByName("userName")[0].value;
    var userPassword = document.getElementsByName("userPassword")[0].value;

    // AJAX를 사용하여 PHP 파일에 요청을 보냅니다.
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // PHP 파일에서 반환한 결과를 확인합니다.
            if (this.responseText === "true") {
                sendSuccessToTimetableSystem();
                
            } else {
                alert("아이디 또는 비밀번호가 올바르지 않습니다.");
            }
        }
    };
    xhttp.open("POST", "admin_login.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("userName=" + userName + "&userPassword=" + userPassword);
}


function sendSuccessToTimetableSystem() {
    // AJAX를 사용하여 timetable_system.html에 값을 전송합니다.
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // AJAX 요청이 성공적으로 완료된 후에 timetable_system.html로 리디렉션합니다.
            window.location.href = "timetable_system.html";
        }
    };
    xhttp.open("POST", "timetable_system.html", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("loginSuccess=true");
}
