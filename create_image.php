<?php
header('Content-Type: text/html; charset=utf-8');
$code = isset($_GET['code']) ? $_GET['code'] : '';
$version = isset($_GET['version']) ? $_GET['version'] : '';

function drawClassInfo($courseName, $professorName, $startTime, $endTime, $version, $code) {
    $width = 800;
    $height = 480;

    // 이미지 생성
    $image = imagecreatetruecolor($width, $height);
    $white = imagecolorallocate($image, 255, 255, 255);
    $black = imagecolorallocate($image, 0, 0, 0);

    // 배경 채우기
    imagefilledrectangle($image, 0, 0, $width, $height, $white);

    // 폰트 설정 (절대 경로 사용)
    $fontPath = '/var/www/html/fonts/arial.ttf';

    // 폰트 파일 존재 확인
    if (!file_exists($fontPath)) {
        die('Error: 폰트 파일을 찾을 수 없습니다. 경로를 확인하세요: ' . $fontPath);
    }

    // 폰트 로드 확인
    if (!isFontLoaded($fontPath, "Test")) {
        die('Error: 폰트를 로드할 수 없습니다. 폰트 파일이 손상되었을 수 있습니다: ' . $fontPath);
    }

    // 텍스트 높이와 y 시작 좌표 계산
    $lineHeight = 100;
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
    $hexString = "";

    $count = 0;
    for ($i = 0; $i < count($bitmap); $i += 8) {
        $byte = 0;
        for ($bit = 0; $bit < 8; $bit++) {
            if ($bitmap[$i + $bit]) {
                $byte |= 1 << (7 - $bit);
            }
        }
        $count++;
        if ($count <= 24000) $hexString_1 .= "0x" . str_pad(dechex($byte), 2, '0', STR_PAD_LEFT) . "/";
        else $hexString_2 .= "0x" . str_pad(dechex($byte), 2, '0', STR_PAD_LEFT) . "/";
        $hexString .= "0x" . str_pad(dechex($byte), 2, '0', STR_PAD_LEFT) . "/";
    }

    // 결과 출력 (version에 따라)
    if ($version == 1) {
        $hexString = $hexString_1;
    } elseif ($version == 2) {
        $hexString = $hexString_2;
    }

    echo "/" . $code . "::BW::/" . $hexString . "/";

    // 이미지 저장 (원하는 경우)
    imagepng($image, 'class_info.png');
    imagedestroy($image);
}

function isFontLoaded($fontPath, $text) {
    $bbox = imagettfbbox(10, 0, $fontPath, $text);
    return $bbox !== false;
}

function calculateTextXPosition($text, $fontPath, $fontSize, $width) {
    $bbox = imagettfbbox($fontSize, 0, $fontPath, $text);
    $textWidth = $bbox[2] - $text[0];
    return ($width - $textWidth) / 2;
}

// 예제 데이터
drawClassInfo('프로그래밍 언어', '소지영', '09:00', '12:00', $version, $code);

?>
