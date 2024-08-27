<?php
header('Content-Type: text/html; charset=utf-8');
date_default_timezone_set('Asia/Seoul');

$code = $_GET['code'];
$version = $_GET['version'];

function convertMinutesToTime($minutes, $sep) {//분으로만 표현된 시간을 '09:00'이런형태로 바꿔주는 함수
    $hours = floor($minutes / 60);
    $mins = $minutes % 60;
    return sprintf('%02d' . $sep . '%02d', $hours, $mins);
}


function drawClassInfo($courseName, $professorName, $startTime, $endTime, $version, $code, $key, $TF, $timedata_all, $updatePeroid) {//이미지 생성 + 출력함수
    if($TF===false){
        echo "/" . $code . "::SET::" . $key . '/' . $updatePeroid . "/none_data/";
        return;
    }elseif($TF==='connect_fail'){
        echo "/" . $code . "::SET::" . $key . "/Connection failed...Check whether WIFI is enabled on the Administrator page./";
        return;
    }elseif($TF==='not_found_data'){
        echo "/" . $code . "::SET::" . $key . "/It is necessary to ensure that the device code is correct./";
        return;
    }

    $width = 800;
    $height = 480;

    // 이미지 생성
    $image = imagecreatetruecolor($width, $height);
    $white = imagecolorallocate($image, 255, 255, 255);
    $black = imagecolorallocate($image, 0, 0, 0);

    // 배경 채우기
    imagefilledrectangle($image, 0, 0, $width, $height, $white);

    // 폰트 설정 (경로는 시스템에 맞게 변경 필요)
    $fontPath = '/var/www/html/fonts/ONE_Mobile_POP.ttf';

    // 텍스트 높이와 y 시작 좌표 계산
    $lineHeight = 120;
    $totalTextHeight = 3 * $lineHeight;
    $startY = ($height - $totalTextHeight) / 2 + $lineHeight - 20;

    // 텍스트 렌더링
    imagettftext($image, 80, 0, calculateTextXPosition($courseName, $fontPath, 80, $width), $startY, $black, $fontPath, $courseName);
    imagettftext($image, 80, 0, calculateTextXPosition("($professorName)", $fontPath, 80, $width), $startY + $lineHeight, $black, $fontPath, "($professorName)");
    imagettftext($image, 80, 0, calculateTextXPosition("$startTime - $endTime", $fontPath, 80, $width), $startY + 2 * $lineHeight, $black, $fontPath, "$startTime - $endTime");

    // 비트맵 데이터 추출
    $bitmap = [];
    for ($y = 0; $y < $height; $y++) {
        for ($x = 0; $x < $width; $x++) {
            $rgb = imagecolorat($image, $x, $y);
            $r = ($rgb >> 16) & 0xFF;
            $g = ($rgb >> 8) & 0xFF;
            $b = $rgb & 0xFF;
            $avg = ($r + $g + $b) / 3;
            $bit = $avg < 128 ? 1 : 0;
            $bitmap[] = $bit;
        }
    }

    // 비트맵 데이터를 16진수 문자열로 변환
    $hexString_1 = "";
    $hexString_2 = "";

    $count=0;
    for ($i = 0; $i < count($bitmap); $i += 8) {
        $byte = 0;
        for ($bit = 0; $bit < 8; $bit++) {
            if ($bitmap[$i + $bit]) {
                $byte |= 1 << (7 - $bit);
            }
        }
        $count++;
        if($count<=24000) $hexString_1 .= "0x" . str_pad(dechex($byte), 2, '0', STR_PAD_LEFT) . "/";
        else $hexString_2 .= "0x" . str_pad(dechex($byte), 2, '0', STR_PAD_LEFT) . "/";
    }

    // 결과 출력 (version에 따라)
    if ($version == 1) {
        echo "/" . $code . "::BW::" . "/" . $hexString_1 . "0x11" . "/";
    } elseif ($version == 2) {
        echo "/" . $code . "::BW::" . "/" . $hexString_2 . "0x11" . "/";
    } elseif ($version == 3) {
        echo "/" . $code . "::SET::" . $timedata_all;
    } else {
        echo "/" . $code . "::SET::" . "/version_error/";
    }
    
    // 이미지 저장 (원하는 경우)
    imagepng($image, 'class_info.png');
    imagedestroy($image);
}

function calculateTextXPosition($text, $fontPath, $fontSize, $width) {
    $bbox = imagettfbbox($fontSize, 0, $fontPath, $text);
    $textWidth = $bbox[2] - $bbox[0];
    return ($width - $textWidth) / 2;
}


$servername = "localhost";
$username = "ser";
$password = "0000";
$dbname = "timetable_system";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$currentHour = intval(date('H'));
$currentMinute = intval(date('i'));
$currentTime = $currentHour * 60 + $currentMinute;//현재시간
$dayOfWeek_TEXT = date('l');
$closestTime = PHP_INT_MAX; // 목표값

function convertDayOfWeekToNumber($dayOfWeek) {
    switch ($dayOfWeek) {
        case 'Monday':
            return 1;
        case 'Tuesday':
            return 2;
        case 'Wednesday':
            return 3;
        case 'Thursday':
            return 4;
        case 'Friday':
            return 5;
        case 'Saturday':
            return 6;
        case 'Sunday':
            return 7;
        default:
            return -1; // Error case or fallback
    }
}
$dayOfWeek = convertDayOfWeekToNumber($dayOfWeek_TEXT);

////////////////////////////////////////////////////////////////////////////////////////////////////
//테스터용 주석을 제거하면 됨
/*
$currentHour = 8;//max=23
$currentMinute = 55;//max=59
$currentTime = $currentHour * 60 + $currentMinute;//현재시간
$dayOfWeek = 1;//1:월, 2:화, 3:수, 4:목, 5:금
*/
////////////////////////////////////////////////////////////////////////////////////////////////////

// 첫 번째 쿼리 실행
$sql_code_load = "SELECT object_code, wifi FROM classroomDB WHERE device_code = '$code'";
$code_load_result = $conn->query($sql_code_load);

// 결과 검증
$TF=false;//데이터가 정상 여부 -> false:실패 -> true:정상
if ($code_load_result->num_rows > 0) {
    // object_code 값을 추출
    $row = $code_load_result->fetch_assoc();
    $object_code = $row['object_code'];
    if($row['wifi']){
        // 두 번째 쿼리 실행
        $sql_maindata_load = "SELECT maindata FROM classlist WHERE object_code = '$object_code'";
        $maindata_result = $conn->query($sql_maindata_load);

        if ($maindata_result->num_rows > 0) {
            // 결과 행에서 데이터 읽어오기
            $row = $maindata_result->fetch_assoc();
            $jsonData = $row["maindata"]; // 'maindata' 열에서 데이터 추출

            // JSON 데이터를 배열로 디코딩
            $data = json_decode($jsonData, true);

            // 배열을 반복하며 key, classname, procfessor, starttime, endtime 값을 추출
            $array = $data[$dayOfWeek-1];
            
            foreach ($array as $obj) {
                $key = $obj['key'] ?? null;
                $classname = $obj['classname'] ?? null;
                $professor = $obj['professor'] ?? null;
                $starttime = $obj['starttime'] ?? null;
                $endtime = $obj['endtime'] ?? null;

                // 값 출력
                //echo "Key: $key, Classname: $classname, Professor: $professor, Starttime: $starttime, Endtime: $endtime\n";

                if($starttime >= $currentTime && $starttime < $closestTime) {
                    $closestTime = $starttime;
                    $result_obj = $obj;
                    $TF=true;
                }
            }
        }
    }else{
        $TF='connect_fail';
    }
}else{
    $TF='not_found_data';
}

$UPsql = "SELECT update_Peroid FROM classroomDB WHERE device_code = '$code' AND (wifi = TRUE OR wifi = 1)";
$UPresult = $conn->query($UPsql);
if ($UPresult->num_rows > 0) {
    // 결과가 있는 경우 첫 번째 행을 가져옴
    $row = $UPresult->fetch_assoc();
    $updatePeroid = $row['update_Peroid'];
} else {
    // 결과가 없는 경우
    $updatePeroid = null; // 또는 적절한 기본값
}

$conn->close();

$key = $result_obj['key'] ?? null;
$classname = $result_obj['classname'] ?? null;
$professor = $result_obj['professor'] ?? null;
$starttime = $result_obj['starttime'] ?? null;
$endtime = $result_obj['endtime'] ?? null;
$startTime_convert = convertMinutesToTime($starttime, ':');
$endTime_convert = convertMinutesToTime($endtime, ':');
$timedata_all = '/' . $updatePeroid . '/' . convertMinutesToTime($starttime, '/') . '/' . convertMinutesToTime($endtime, '/') . '/';

//echo "교실명 : " . $classname . "," . "교수명 : " . $professor . "," . "수업시작 시간 : " . $startTime_convert . "," . "수업 끝나는 시간 : " .$endTime_convert . "," . "버전 : " . $version . "," . "기기코드 : " . $code . "," . "교실key(ID) : " . $key . "\n";
drawClassInfo($classname, $professor, $startTime_convert, $endTime_convert, $version, $code, $key, $TF, $timedata_all, $updatePeroid);


// 예제 데이터
//drawClassInfo('프로그래밍 언어', '장성훈', '09:00', '12:00', $version, $code, $key);

?>
