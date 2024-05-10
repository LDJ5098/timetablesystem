<?php
// MySQL 서버 정보
$servername = "localhost"; // MySQL 서버 주소
$username = "ser"; // MySQL 사용자 이름
$password = "0000"; // MySQL 사용자 비밀번호
$dbname = "timetable_system"; // 사용할 데이터베이스 이름

// 받아온 아이디와 비밀번호
$userName = $_POST['userName'];
$userPassword = $_POST['userPassword'];

// MySQL 데이터베이스에 연결
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die("연결 실패: " . $conn->connect_error);
}

// 쿼리문 작성
$sql = "SELECT * FROM Account_info WHERE ID='$userName' AND PASSWORD='$userPassword'";

// 쿼리 실행
$result = $conn->query($sql);

// 결과 확인
if ($result->num_rows > 0) {
    // 결과가 있으면 true 반환
    echo "true";
} else {
    // 결과가 없으면 false 반환
    echo "false";
}

// 연결 종료
$conn->close();
?>
