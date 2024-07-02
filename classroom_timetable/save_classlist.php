<?php
header('Content-Type: text/html; charset=utf-8');
// MySQL 계정 정보
$servername = "localhost";
$username = "ser";
$password = "0000";
$dbname = "timetable_system";

$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// JSON으로 전송된 데이터를 수신
$data = json_decode(file_get_contents('php://input'), true);

$object_code = $data['object_code'];
$maindata = json_encode($data['maindata'], JSON_UNESCAPED_UNICODE);
$serial_class_data = json_encode($data['serial_class_data'], JSON_UNESCAPED_UNICODE);

// 준비된 SQL 문
$sql = "INSERT INTO classlist (object_code, maindata, serial_class_data) VALUES ('$object_code', '$maindata', '$serial_class_data')
        ON DUPLICATE KEY UPDATE maindata='$maindata', serial_class_data='$serial_class_data'";

// 데이터베이스에 저장
if ($conn->query($sql) === TRUE) {
    echo "Data successfully inserted or updated.";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>
