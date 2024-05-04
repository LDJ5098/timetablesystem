<?php
header('Content-Type: text/html; charset=utf-8'); // UTF-8 문자 인코딩 설정

// MySQL 서버 연결 정보
$servername = "localhost"; // MySQL 서버 주소
$username = "ser"; // MySQL 사용자 이름
$password = "0000"; // MySQL 암호
$dbname = "timetable_system"; // 사용할 데이터베이스 이름

// MySQL 서버에 연결
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 쿼리 작성
$sql = "SELECT which, floor, class_number, class_name, device_code, width, height, other, wifi, top_value, left_value, object_code FROM classroomDB";

// 쿼리 실행
$result = $conn->query($sql);

// 결과를 배열로 저장
$rows = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $rows[] = (object)$row; // 각 행을 객체로 저장
    }
}

// JSON 형식으로 출력
header('Content-Type: application/json; charset=utf-8'); // UTF-8로 JSON 형식 설정
echo json_encode($rows, JSON_UNESCAPED_UNICODE); // JSON_UNESCAPED_UNICODE 옵션을 사용하여 유니코드 문자를 이스케이프하지 않도록 설정

// 연결 종료
$conn->close();
?>
