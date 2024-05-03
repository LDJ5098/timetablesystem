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
$sql = "UPDATE classroomDB SET 
        which = '$which_select',
        floor = '$floor_select',
        class_number = '$class_number',
        class_name = '$class_name',
        device_code = '$device_code',
        width = '$width',
        height = '$height',
        other = '$other',
        wifi = '$wifi',
        top_value = '$top',
        left_value = '$left'
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
