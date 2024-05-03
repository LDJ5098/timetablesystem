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
