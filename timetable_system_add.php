<?php
// MySQL 계정 정보
$servername = "localhost";
$username = "ser";
$password = "0000";
$dbname = "timetable_systemDB";


$data = json_decode(file_get_contents('php://input'), true);

// 객체 생성
$object_code = $data['object_code'];
$which_select = $data['which_select'];
$floor_select = $data['floor_select'];
$class_number = $data['class_number'];
$class_name = $data['class_name'];
$device_code = $data['device_code'];
$width = $data['width'];
$height = $data['height'];
$other = $data['other'];
$wifi = $data['wifi'];
$top = $data['top'];
$left = $data['left'];

// 데이터베이스 연결
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL 쿼리 작성
$sql = "INSERT INTO classroomDB (object_code, which, floor, class_number, class_name, device_code, width, height, other, wifi, top_value, left_value) VALUES ('$object_code', '$which_select', '$floor_select', '$class_number', '$class_name', '$device_code', '$width', '$height', '$other', '$wifi', '$top', '$left')";

// 쿼리 실행
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// 연결 종료
$conn->close();
?>
