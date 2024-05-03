<?php
// MySQL 계정 정보
$servername = "http://192.168.88.128/";
$username = "ser";
$password = "0000";
$dbname = "timetable_systemDB";

// POST로 받은 데이터 디코딩
$data = json_decode(file_get_contents('php://input'), true);

// randomCODE 가져오기
$object_code = $_POST['object_code'];
// 데이터베이스 연결
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL 쿼리 작성
$sql = "DELETE FROM classroomDB WHERE object_code='$object_code'";

// 쿼리 실행
if ($conn->query($sql) === TRUE) {
    echo "Record deleted successfully";
} else {
    echo "Error deleting record: " . $conn->error;
}

// 연결 종료
$conn->close();
?>
