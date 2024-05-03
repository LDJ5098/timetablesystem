<?php
// MySQL 계정 정보
$servername = "192.168.88.128";
$username = "ser";
$password = "0000";
$dbname = "timetable_systemDB";

$jsonData = file_get_contents('php://input');
$object = json_decode($jsonData);
// 객체 생성
$object_code = $object->object_code;
$which_select = $object->which_select;
$floor_select = $object->floor_select;
$class_number = $object->class_number;
$class_name = $object->class_name;
$device_code = $object->device_code;
$width = $object->width;
$height = $object->height;
$other = $object->other;
$wifi = $object->wifi;
$top = $object->top;
$left = $object->left;

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
