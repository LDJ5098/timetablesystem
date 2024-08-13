<?php
$servername = "localhost";
$username = "ser";
$password = "0000";
$dbname = "timetable_system";

// MySQL 연결 생성
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// GET 파라미터 수집
$device_code = $_GET['code']; // "X1345247"

// 입력 데이터 유효성 검증
if (is_null($device_code)) {
    die("디바이스 코드가 비어있습니다.");
}

// 1. device_code가 power_table에 있는지 확인
$sql_check_power = "SELECT power FROM power_table WHERE device_code = '$device_code'";
$result_power = $conn->query($sql_check_power);

if ($result_power->num_rows === 0) {
    die("디바이스 코드를 찾을 수 없습니다.");
} else {
    $row = $result_power->fetch_assoc();
    $power_data = json_decode($row['power'], true);
    echo json_encode($power_data); // JSON 형식으로 반환
}

// 연결 종료
$conn->close();
?>
