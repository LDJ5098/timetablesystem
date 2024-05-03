<?php
// MySQL 계정 정보
$servername = "http://192.168.88.128/";
$username = "ser";
$password = "0000";
$dbname = "timetable_systemDB";

// 객체 생성
$object_code = $_POST['object_code'];
$which_select = $_POST['which_select'];
$floor_select = $_POST['floor_select'];
$class_number = $_POST['class_number'];
$class_name = $_POST['class_name'];
$device_code = $_POST['device_code'];
$width = $_POST['width'];
$height = $_POST['height'];
$other = $_POST['other'];
$wifi = $_POST['wifi'];
$top = $_POST['top'];
$left = $_POST['left'];

// 데이터베이스 연결
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL 쿼리 작성
$sql = "INSERT INTO classroomDB (object_code, which, floor, class_number, class_name, device_code, width, height, other, wifi, top_value, left_value)
VALUES ('$object_code', '$which_select', '$floor_select', '$class_number', '$class_name', '$device_code', '$width', '$height', '$other', '$wifi', '$top', '$left')";

// 쿼리 실행
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// 연결 종료
$conn->close();
?>
