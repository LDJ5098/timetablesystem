<?php
header('Content-Type: application/json; charset=utf-8');

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

// object_code를 받아옴 (예시로 임의로 지정)
$object_code = $_GET['object_code'];

// SQL 쿼리를 준비
$sql = "SELECT maindata, serial_class_data FROM classlist WHERE object_code = '$object_code'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // 데이터가 존재하는 경우
    $row = $result->fetch_assoc();
    $maindata = $row['maindata'];
    $serial_class_data = $row['serial_class_data'];
    
    // JSON 형태로 반환
    echo json_encode(array(
        'maindata' => json_decode($maindata),
        'serial_class_data' => json_decode($serial_class_data)
    ));
} else {
    // 데이터가 없는 경우
    echo json_encode(array(
        'maindata' => null,
        'serial_class_data' => null
    ));
}

$conn->close();
?>
