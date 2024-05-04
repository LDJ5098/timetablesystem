<?php
header('Content-Type: text/html; charset=utf-8'); // UTF-8 문자 인코딩 설정

// MySQL 서버 연결 정보
$servername = "localhost"; // MySQL 서버 주소
$username = "ser"; // MySQL 사용자 이름
$password = "0000"; // MySQL 암호
$dbname = "timetable_system"; // 사용할 데이터베이스 이름

// MySQL 서버에 연결
$conn = new mysqli($servername, $username, $password, $dbname);

$data = json_decode(file_get_contents('php://input'), true);
$object_code = $data['object_code'];

// 연결 확인
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 쿼리 작성
$sql = "SELECT which, floor, class_number, class_name, device_code, width, height, other, wifi, top_value, left_value FROM classroomDB WHERE object_code = $object_code";

// 쿼리 실행
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // 결과 가져오기
    $row = $result->fetch_assoc();
    
    // JSON 형식으로 출력
    header('Content-Type: application/json; charset=utf-8'); // UTF-8로 JSON 형식 설정
    echo json_encode((object)$row, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(array()); // 빈 배열 출력
}

// JSON 형식으로 출력

// 연결 종료
$conn->close();
?>
