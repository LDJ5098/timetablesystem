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
$date = $_GET['date']; // "2024-08-13"
$time = $_GET['time']; // "08:00"
$power = $_GET['power']; // "100.5"

// 입력 데이터 유효성 검증
if (is_null($device_code) || is_null($date) || is_null($time) || is_null($power)) {
    die("null값은 입력하면 안됩니다.");
}

if (!preg_match("/^\d{4}-\d{2}-\d{2}$/", $date)) {
    die("날짜 형식이 올바르지 않습니다. 올바른 형식: YYYY-MM-DD");
}

if (!preg_match("/^\d{2}:\d{2}$/", $time)) {
    die("시간 형식이 올바르지 않습니다. 올바른 형식: HH:MM");
}

if (!is_numeric($power)) {
    die("파워 값은 숫자여야 합니다.");
}

// 1. device_code가 classroomDB에 있는지 확인
$sql_check_classroom = "SELECT device_code FROM classroomDB WHERE device_code = '$device_code'";
$result_classroom = $conn->query($sql_check_classroom);

if ($result_classroom->num_rows === 0) {
    die("존재하지 않는 디바이스 코드입니다.");
}

// 2. device_code가 power_table에 있는지 확인
$sql_check_power = "SELECT power FROM power_table WHERE device_code = '$device_code'";
$result_power = $conn->query($sql_check_power);

if ($result_power->num_rows === 0) {
    // power_table에 device_code가 존재하지 않으면 새롭게 JSON 데이터 삽입
    $initial_power_data = json_encode([["date" => $date, "time" => $time, "power" => $power]]);
    $sql_insert = "INSERT INTO power_table (device_code, power) VALUES ('$device_code', '$initial_power_data')";
    
    if ($conn->query($sql_insert) === TRUE) {
        echo "새로운 디바이스 코드로 데이터가 삽입되었습니다.";
    } else {
        echo "데이터 삽입 실패: " . $conn->error;
    }

} else {
    // 3. 기존 데이터를 불러와서 새로운 데이터를 추가하고, 크기가 336개를 넘으면 가장 오래된 데이터를 삭제
    $row = $result_power->fetch_assoc();
    $power_data = json_decode($row['power'], true);

    if (count($power_data) >= 336) {
        array_shift($power_data); // 가장 오래된 데이터 삭제
    }

    // 배열의 마지막 자리에 새로운 데이터를 추가
    $new_entry = array("date" => $date, "time" => $time, "power" => $power);
    $power_data[] = $new_entry;

    // 4. 업데이트된 JSON 배열을 다시 JSON으로 인코딩하여 테이블에 저장
    $updated_power_json = json_encode($power_data);
    $sql_update = "UPDATE power_table SET power = '$updated_power_json' WHERE device_code = '$device_code'";
    
    if ($conn->query($sql_update) === TRUE) {
        echo "데이터가 성공적으로 업데이트되었습니다.";
    } else {
        echo "데이터 업데이트 실패: " . $conn->error;
    }
}

// 연결 종료
$conn->close();
?>
