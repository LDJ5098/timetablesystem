<?php
header('Content-Type: text/html; charset=utf-8');
// MySQL 계정 정보
$servername = "localhost";
$username = "ser";
$password = "0000";
$dbname = "timetable_system";

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

// 데이터베이스 연결
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL 쿼리 작성
$sql = "UPDATE classroomDB SET 
        which = '$which_select',
        floor = '$floor_select',
        class_number = '$class_number',
        class_name = '$class_name',
        device_code = '$device_code',
        width = '$width',
        height = '$height',
        other = '$other',
        wifi = '$wifi'
        WHERE object_code = '$object_code'";

// 쿼리 실행
if ($conn->query($sql) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

// 연결 종료
$conn->close();
?>
