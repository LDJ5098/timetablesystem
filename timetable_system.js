<!DOCTYPE html>
<html lang="Ko">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="timetable_system.css">
</head>
<body>
    <div id="main">
        <div id="menu">
            <lable id="loginbutton">관리자 로그인</lable>

            <div>
                메뉴 : 
                <button class=menu_button onclick="toggleButton(0)">교실 생성</button>
                <button class=menu_button onclick="toggleButton(1)">내용 수정</button>
                <button class=menu_button onclick="toggleButton(2)">위치 이동</button>
                <button class=menu_button onclick="toggleButton(3)">교실 삭제</button>

                <select id="which">
                    <option value="D3">D3</option>
                    <option value="D4">D4</option>
                </select>

                <select id="floor">
                    <option value="1F">1F</option>
                    <option value="2F">2F</option>
                    <option value="3F">3F</option>
                </select>
            </div>
        </div>

        <div>
            <button onclick="delete_class()" id="delete_button">삭제하기</button>
        </div>

        <div id="background">
            <div class= "info_classroom_background" id="create_classroom_background">
                <div class= "info_classroom_DIV" id="create_classroom_DIV">
                    <h1>새 교실 생성</h1>

                    <div>
                        <label>교실 호수 : </label>
                        <input type="text" placeholder="교실 호수 입력 ex) 113호" class="info_input" id="create_number">
                    </div>

                    <div>
                        <label>교실 명칭 : </label>
                        <input type="text" placeholder="ex)학생회실" class="info_input" id="create_name">
                    </div>

                    <div>
                        <label>기기 코드 : </label>
                        <input type="text" placeholder="연결 디바이스 코드 입력" class="info_input" id="create_device_code">
                    </div>

                    <div>
                        <label>가로 길이 : </label>
                        <input type="text" placeholder="ex) 20px" class="info_input" id="create_width">
                    </div>

                    <div>
                        <label>세로 길이 : </label>
                        <input type="text" placeholder="ex) 10px" class="info_input" id="create_height">
                    </div>

                    <div>
                        <label>교실 설명 : </label>
                        <textarea placeholder="그외 정보 작성" class="class_detail" id="create_class_detail"></textarea>
                    </div>

                    <div>
                        <label>서버 통신 활성 여부</label>
                        <input type="checkbox" value="WIFI활성여부" class="checkbox" id="create_class_WIFI_check" onclick="create_classroom_checkbox()">
                    </div>

                    <button onclick="create_new_classroom()">생성하기</button>
                </div>
            </div>



            <div class= "info_classroom_background" id="fix_classroom_background">
                <div class= "info_classroom_DIV" id="fix_classroom_DIV">
                    <h1>내용 수정</h1>

                    <div>
                        <label>교실 호수 : </label>
                        <input type="text" placeholder="교실 호수 입력 ex) 113호" class="info_input" id="fix_number">
                    </div>

                    <div>
                        <label>교실 명칭 : </label>
                        <input type="text" placeholder="ex)학생회실" class="info_input" id="fix_name">
                    </div>

                    <div>
                        <label>기기 코드 : </label>
                        <input type="text" placeholder="연결 디바이스 코드 입력" class="info_input" id="fix_device_code">
                    </div>

                    <div>
                        <label>가로 길이 : </label>
                        <input type="text" placeholder="ex) 20px" class="info_input" id="fix_width">
                    </div>

                    <div>
                        <label>세로 길이 : </label>
                        <input type="text" placeholder="ex) 10px" class="info_input" id="fix_height">
                    </div>

                    <div>
                        <label>교실 설명 : </label>
                        <textarea placeholder="그외 정보 작성" class="class_detail" id="fix_class_detail"></textarea>
                    </div>

                    <div>
                        <label>서버 통신 활성 여부</label>
                        <input type="checkbox" value="WIFI활성여부" class="checkbox" id="fix_class_WIFI_check" onclick="fix_classroom_checkbox()">
                    </div>

                    <button onclick="fix_classroom()">수정하기</button>
                </div>
            </div>

            <!-- 중앙에 예시로 하나 생성해보기
           <div class="class_info_panel">
                <label></label>
            </div>
            -->


        </div>

        <label id="floor_info"></label>


    </div>
</body>
<script src="timetable_system.js"></script>
</html>
