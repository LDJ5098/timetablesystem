//새 생성 입력값들
var create_number = document.getElementById('create_number');
var create_name = document.getElementById('create_name');
var create_classroom_device_code = document.getElementById('create_device_code');
var create_width = document.getElementById('create_width');
var create_height = document.getElementById('create_height');
var create_class_detail = document.getElementById('create_class_detail');
var create_classroom_WIFI_check = document.getElementById('create_class_WIFI_check');

//수정하기 입력값들
var fix_number = document.getElementById('fix_number');
var fix_name = document.getElementById('fix_name');
var fix_classroom_device_code = document.getElementById('fix_device_code');
var fix_width = document.getElementById('fix_width');
var fix_height = document.getElementById('fix_height');
var fix_class_detail = document.getElementById('fix_class_detail');
var fix_classroom_WIFI_check = document.getElementById('fix_class_WIFI_check');

//삭제하기에서 선택된 변수들
var choice_classrooms=document.querySelectorAll('.choice_panel');

//그외 변수들
var floor_background = document.getElementById('background');

var which = document.getElementById("which");
var floor = document.getElementById("floor");
var background_DIV = document.getElementById("background");

var activeButton = null;
var recent_choice_code = null;


//classroomDB


function randomCODE(){
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var code = '';
  while(1){
    for (var i = 0; i < 10; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    

    var error = 0;
    var data=load_database_code();
    for(var i = 0; i < data.length; i++){
      if(code===data[i].object_code){
        error = 1;
        console.log('중복된 코드 생성 오류 발생');
        break;
      }
    }

    if(error === 0)break;
  }
  console.log('코드 정상 생성 완료');
  return code;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////서버 영역/////////////////////////////////////////////////////////////////////////
//서버에 변경된 데이터를 전송하기
function sendDataToPHP(data) {
  var url = "timetable_system_add.php";
  var request = new XMLHttpRequest();
  request.open("POST", url, false); // 동기적 요청으로 변경 (마지막 파라미터가 false)
  request.setRequestHeader("Content-Type", "application/json");

  try {
      var jsonData = JSON.stringify(data);
      request.send(jsonData);

      if (request.status === 200) { // 요청이 성공한 경우
          console.log(request.responseText); // 서버로부터 받은 응답 출력
      } else { // 요청이 실패한 경우
          console.error('Request failed with status:', request.status);
      }
  } catch (error) {
      console.error('There was a problem with the request:', error);
  }
}


//서버에 데이터를 제거하기
function deleteDataInPHP(randomCODE) {
  var url = "timetable_system_delete.php";
  var request = new XMLHttpRequest();
  request.open("POST", url, false); // 동기적 요청으로 변경 (마지막 파라미터가 false)
  request.setRequestHeader("Content-Type", "application/json");

  try {
      var jsonData = JSON.stringify({ randomCODE: randomCODE });
      request.send(jsonData);

      if (request.status === 200) { // 요청이 성공한 경우
          console.log(request.responseText); // 서버로부터 받은 응답 출력
      } else { // 요청이 실패한 경우
          console.error('Request failed with status:', request.status);
      }
  } catch (error) {
      console.error('There was a problem with the request:', error);
  }
}



function EditDataToPHP(data) {
  var url = "timetable_system_edit.php";
  var request = new XMLHttpRequest();
  request.open("POST", url, false); // 동기적 요청으로 변경 (마지막 파라미터가 false)
  request.setRequestHeader("Content-Type", "application/json");

  try {
      var jsonData = JSON.stringify(data);
      request.send(jsonData);

      if (request.status === 200) { // 요청이 성공한 경우
          console.log(jsonData);
          console.log(request.responseText); // 서버로부터 받은 응답 출력
      } else { // 요청이 실패한 경우
          console.error('Request failed with status:', request.status);
      }
  } catch (error) {
      console.error('There was a problem with the request:', error);
  }
}



function MoveDataToPHP(data) {
  var url = "timetable_system_move.php";
  var request = new XMLHttpRequest();
  request.open("POST", url, false); // 동기적 요청으로 변경 (마지막 파라미터가 false)
  request.setRequestHeader("Content-Type", "application/json");

  try {
      var jsonData = JSON.stringify(data);
      request.send(jsonData);

      if (request.status === 200) { // 요청이 성공한 경우
          console.log(jsonData);
          console.log(request.responseText); // 서버로부터 받은 응답 출력
      } else { // 요청이 실패한 경우
          console.error('Request failed with status:', request.status);
      }
  } catch (error) {
      console.error('There was a problem with the request:', error);
  }
}

//서버에서 모든 데이터 다 가져오기
function load_database_code() {
  var url = 'timetable_system_load.php';
  var request = new XMLHttpRequest();
  request.open('GET', url, false); // 동기적 요청으로 변경 (마지막 파라미터가 false)
  request.send();

  if (request.status === 200) { // 요청이 성공한 경우
      try {
          var data = JSON.parse(request.responseText);
          // 데이터 처리 로직 추가
          return data;
      } catch (error) {
          console.error('Error parsing JSON data:', error);
          return null;
      }
  } else { // 요청이 실패한 경우
      console.error('Request failed with status:', request.status);
      return null;
  }
}

//서버에서 특정 데이터만 가져오기
function classroomDB(objectcode) {
  var data = {
      object_code: objectcode,
  }

  var jsonData = JSON.stringify(data);

  // PHP 파일 경로 설정
  var url = 'timetable_system_select_load.php';
  var request = new XMLHttpRequest();
  request.open("POST", url, false); // 동기적 요청으로 변경 (마지막 파라미터가 false)
  request.setRequestHeader("Content-Type", "application/json");

  try {
      request.send(jsonData);

      if (request.status === 200) { // 요청이 성공한 경우
          var result = request.responseText;
          console.log(result); // 서버로부터 받은 응답 출력
          return result;
      } else { // 요청이 실패한 경우
          console.error('Request failed with status:', request.status);
          return null;
      }
  } catch (error) {
      console.error('There was a problem with the request:', error);
      return null;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//객체 정보 추가 함수
function push_classroomDB(Which_, floor_, number, name, code, width, height, other, WIFI, Top, Left){
  var object = {
    object_code:randomCODE(),

    which_select:Which_.value,
    floor_select:floor_.value,

    class_number:number.value,
    class_name:name.value,
    device_code:code.value,
    width:width.value,
    height:height.value,
    other:other.value,
    wifi:WIFI.checked,
    top:Top,
    left:Left
  }
  sendDataToPHP(object);
}


//객체 정보 수정 함수
function fix_classroomDB(objectcode ,Which_, floor_, number, name, code, width, height, other, WIFI){
  var object = {
    object_code:objectcode,

    which_select:Which_.value,
    floor_select:floor_.value,

    class_number:number.value,
    class_name:name.value,
    device_code:code.value,
    width:width.value,
    height:height.value,
    other:other.value,
    wifi:WIFI.checked,
  }
  EditDataToPHP(object);
}

function move_classroomDB(objectcode, Left, Top){
  var object = {
    object_code:objectcode,
    top:Top,
    left:Left
  }

  MoveDataToPHP(object);
}

//객체 정보 삭제 함수
function remove_classroomDB(code){
  var object = {
    object_code:code,
  }
  deleteDataInPHP(object);
  console.log('삭제되었습니다');
}

//교실이 클릭되었을 때 이벤트 처리 함수
function click_classroom() {
  var elements = document.querySelectorAll('.class_info_panel');
  elements.forEach(function(element) {
    element.addEventListener('click', function() {
      if(activeButton===document.querySelectorAll('.menu_button')[1]){
        fix_number.value=classroomDB(this.id).class_number;
        fix_name.value=classroomDB(this.id).class_name;
        fix_classroom_device_code.value=classroomDB(this.id).device_code;
        fix_width.value=classroomDB(this.id).width;
        fix_height.value=classroomDB(this.id).height;
        fix_class_detail.value=classroomDB(this.id).other;
        fix_classroom_WIFI_check.checked=classroomDB(this.id).wifi;
        document.getElementById('fix_classroom_background').style.display='flex';
        recent_choice_code = element.id;
      }

      else if(activeButton===document.querySelectorAll('.menu_button')[2]){
        if (element.classList.contains("choice_panel")) {
          element.classList.remove("choice_panel");
        } else {
          element.classList.add("choice_panel");
        }
      }

      else if(activeButton===document.querySelectorAll('.menu_button')[3]){
        if (element.classList.contains("choice_panel")) {
          element.classList.remove("choice_panel");
        } else {
          element.classList.add("choice_panel");
        }
      }
    });
  });
}

//mainDB에 들어있는 값을 화면에 나타내주는 함수
function show_floor(){
    document.querySelectorAll('.class_info_panel').forEach(function(element){
      element.remove();
    });
    var show_arry = load_database_code();
    show_arry.forEach(function(db, index){
      if(db.which_select===which.value&&db.floor_select===floor.value){
        var show_classroom = document.createElement("div");
      
        show_classroom.classList.add("class_info_panel");
        show_classroom.id = classroomDB[index].object_code;
        show_classroom.style.width = db.width;
        show_classroom.style.height = db.height;
        show_classroom.style.top = db.top;
        show_classroom.style.left = db.left;

        var in_text = document.createElement('label');

        in_text.textContent =  db.class_number;

        floor_background.appendChild(show_classroom);
        show_classroom.appendChild(in_text);
      }
    });

    click_classroom();
}


//floor 배경 이미지 변경 함수
function changeBackground() {

    var imagePath = "./floor_section/" + which.value + "/" + floor.value + ".jpg";

    document.getElementById("background").style.backgroundImage = "url('" + imagePath + "')";

    document.getElementById('floor_info').textContent = which.value + "-" + floor.value;

    
    show_floor();
}


// which 또는 floor 값이 변경될 때마다 배경 이미지 변경
which.addEventListener("change", changeBackground);
floor.addEventListener("change", changeBackground);



//class_info_panel중에서 choice_panel 제거 함수
function cancel_choice(){
  choice_classrooms=document.querySelectorAll('.choice_panel');
  choice_classrooms.forEach(function(element){
    element.classList.remove("choice_panel");
  });
}
///////////////////////버튼이 눌렸을 때 바로 작동되어야 하는 것들 모아놓은 함수///////////////////////////////

function Menu_Operation(){
  if(activeButton===document.querySelectorAll('.menu_button')[0]){
    console.log('새 교실 생성 활성화');
    document.getElementById('create_classroom_background').style.display='flex';
    document.getElementById('fix_classroom_background').style.display='none';
    document.getElementById('delete_button').style.display='none';
    cancel_choice();
  }

  else if(activeButton===document.querySelectorAll('.menu_button')[1]){
    console.log('내용 수정 활성화');
    document.getElementById('create_classroom_background').style.display='none';
    document.getElementById('delete_button').style.display='none';
    cancel_choice();
  }

  else if(activeButton===document.querySelectorAll('.menu_button')[2]){
    console.log('위치 이동 활성화');
    document.getElementById('create_classroom_background').style.display='none';
    document.getElementById('fix_classroom_background').style.display='none';
    document.getElementById('delete_button').style.display='none';
    cancel_choice();
    move_class();
    mouse_move_class();
  }

  else if(activeButton===document.querySelectorAll('.menu_button')[3]){
    console.log('교실 삭제 활성화');
    document.getElementById('create_classroom_background').style.display='none';
    document.getElementById('fix_classroom_background').style.display='none';
    document.getElementById('delete_button').style.display='block';
    cancel_choice();
  }

  else {
    console.log('비활성화');
    document.getElementById('create_classroom_background').style.display='none';
    document.getElementById('fix_classroom_background').style.display='none';
    document.getElementById('delete_button').style.display='none';
    cancel_choice();
  }
}






//버튼 토글방식
function toggleButton(index) {
  var button = document.querySelectorAll('.menu_button')[index];

  if (button === activeButton) {
    // 이미 눌린 버튼을 다시 누르면 상태를 풀어줍니다.
    button.classList.remove('active');
    activeButton = null;
  } else {
    // 새로운 버튼을 누르면 이전에 눌린 버튼의 상태를 변경하고 새로 누른 버튼을 활성화합니다.
    if (activeButton !== null) {
      activeButton.classList.remove('active');
    }
    button.classList.add('active');
    activeButton = button;
  }
  Menu_Operation();
}

//create 새 생성 checkbox 체크 여부
function create_classroom_checkbox(){
  if (create_classroom_WIFI_check.checked) {
    create_classroom_device_code.disabled = false;
  } else {
    create_classroom_device_code.disabled = true;
  }
}

//fix 새 생성 checkbox 체크 여부
function fix_classroom_checkbox(){
  if (fix_classroom_WIFI_check.checked) {
    fix_classroom_device_code.disabled = false;
  } else {
    fix_classroom_device_code.disabled = true;
  }
}



//새 교실 데이터 전송
function creating_classroom(){
  push_classroomDB(which, floor, create_number, create_name, create_classroom_device_code, create_width, create_height, create_class_detail, create_classroom_WIFI_check, String(563/2) + "px", "500px");
  show_floor();
  console.log(classroomDB);
}


//새 교실 생성 전 검사
function create_new_classroom(){
  var error_log = "";

  for (let i = 0; i < classroomDB.length; i++) {
    if (classroomDB[i].which_select === which.value && classroomDB[i].floor_select === floor.value && classroomDB[i].class_number === create_number.value) {
        error_log += '같은 건물에 같은 호수는 존재할 수 없습니다.(중복발생)\n';
        break;
    }
  }

  var length_pattern = /\d\b/;
  if(length_pattern.test(create_width.value))create_width.value += "px";
  if(length_pattern.test(create_height.value))create_height.value += "px";
  
  length_pattern = /\d+px/;

  if(!length_pattern.test(create_width.value)) error_log += '가로길이를 제대로 입력하세요.\n';
  if(!length_pattern.test(create_height.value)) error_log += '세로길이를 제대로 입력하세요.\n';


  if(error_log!==""){
    window.alert(error_log);
    return;
  }

  toggleButton(0);
  creating_classroom();
}

//수정하는 데이터 전송
function fixing_classroom(){
  fix_classroomDB(recent_choice_code ,which, floor, fix_number, fix_name, fix_classroom_device_code, fix_width, fix_height, fix_class_detail, fix_classroom_WIFI_check);
  show_floor();
}

//수정하기 전 검사
function fix_classroom(){
  var error_log = "";

  document.querySelectorAll(".class_info_panel")

  for (let i = 0; i < load_database_code()[i].length; i++) {
    if(load_database_code()[i].floor_select===floor.value&&load_database_code()[i].which_select===which.value&&load_database_code()[i].class_number===fix_number&&recent_choice_code!==load_database_code()[i].object_code){
      error_log += "같은 건물에는 같은 호수의 교실을 입력할 수 없습니다(중복발생)";
      break;
    }
  }

  var length_pattern = /\d\b/;
  if(length_pattern.test(fix_width.value))fix_width.value += "px";
  if(length_pattern.test(fix_height.value))fix_height.value += "px";
  
  length_pattern = /\d+px/;

  if(!length_pattern.test(fix_width.value)) error_log += '가로길이를 제대로 입력하세요.\n';
  if(!length_pattern.test(fix_height.value)) error_log += '세로길이를 제대로 입력하세요.\n';


  if(error_log!==""){
    window.alert(error_log);
    return;
  }

  document.getElementById('fix_classroom_background').style.display='none';
  fixing_classroom();
}


//교실 위치 이동 기억 했다가 새로고침 때 다시 테두리 추가 해주는 함수
var refresh_remember_class = [];
function refresh_class_rember(){
  var refresh_class = document.querySelectorAll(".class_info_panel");
  refresh_class.forEach(function(val){
    for(var i=0; i<refresh_remember_class.length;i++){
      if(val.id===refresh_remember_class[i])val.classList.add('choice_panel');
      break;
    }
  });
}


//키보드로 위치 조작할 때 컨트롤 키를 누르면 스피드가 조절됨
var keyboard_speed = 5;
var isCtrlPressed = false;
document.addEventListener("keydown", function(event) {
    if (event.key === "Control") {
        isCtrlPressed = true;
    }    
    if (isCtrlPressed && event.key !== "Control") {
      keyboard_speed = 1;
    }
});

document.addEventListener("keyup", function(event) {
    if (event.key === "Control") {
      isCtrlPressed = false;
      keyboard_speed = 5;
    }
});


//교실 위치 이동
function move_class(){
  document.addEventListener("keydown", function(event){
    choice_classrooms=document.querySelectorAll('.choice_panel');
    if (event.key === "ArrowUp"&&activeButton===document.querySelectorAll('.menu_button')[2]) {
        // 위쪽 방향키를 눌렀을 때의 동작
        choice_classrooms.forEach(function(element){
            var Left = classroomDB(element.id).left;
            var Top = String(parseFloat(classroomDB(element.id).top) - keyboard_speed)+'px';
            refresh_remember_class.push(element.id);  
            move_classroomDB(element.id, Left, Top);
        });
        show_floor();
        refresh_class_rember();
        refresh_remember_class = [];
    } 
    else if (event.key === "ArrowDown"&&activeButton===document.querySelectorAll('.menu_button')[2]) {
        // 아래쪽 방향키를 눌렀을 때의 동작
        choice_classrooms.forEach(function(element){
            var Left = classroomDB(element.id).left;
            var Top = String(parseFloat(classroomDB(element.id).top) + keyboard_speed)+'px';
            refresh_remember_class.push(element.id);  
            move_classroomDB(element.id, Left, Top);  
        });
        show_floor();
        refresh_class_rember();
        refresh_remember_class = [];
    }
    else if (event.key === "ArrowLeft"&&activeButton===document.querySelectorAll('.menu_button')[2]) {
        // 왼쪽 방향키를 눌렀을 때의 동작
        choice_classrooms.forEach(function(element){
            var Left = String(parseFloat(classroomDB(element.id).left) - keyboard_speed)-'px';
            var Top = classroomDB(element.id).Top;
            refresh_remember_class.push(element.id);  
            move_classroomDB(element.id, Left, Top); 
        });
        show_floor();
        refresh_class_rember();
        refresh_remember_class = [];
    }
    else if (event.key === "ArrowRight"&&activeButton===document.querySelectorAll('.menu_button')[2]) {
        // 오른쪽 방향키를 눌렀을 때의 동작
        choice_classrooms.forEach(function(element){
            var Left = String(parseFloat(classroomDB(element.id).left) - keyboard_speed)-'px';
            var Top = classroomDB(element.id).Top;
            refresh_remember_class.push(element.id);  
            move_classroomDB(element.id, Left, Top);
        });
        show_floor();
        refresh_class_rember();
        refresh_remember_class = [];
    }
  });

}

//마우스로 이동시키기
var bX, bY, aX, aY, mouse_info='up';
function mouse_move_class(){
  document.addEventListener('mousedown', function(event){
      choice_classrooms=document.querySelectorAll('.choice_panel');
      bX=event.clientX;
      bY=event.clientY;
      mouse_info='down';
  });

            // 드래그 종료 지점을 기록하고 이벤트 리스너를 제거합니다.
  document.addEventListener('mouseup', function(){
      mouse_info='up';

  });

  document.addEventListener('mousemove', function(event){
    if(activeButton===document.querySelectorAll('.menu_button')[2]&&mouse_info==='down'){
      aX=event.clientX;
      aY=event.clientY;

      choice_classrooms.forEach(function(element){
        var Left = String(parseFloat(classroomDB(element.id).left) + (aX-bX))+'px';
        var Top = String(parseFloat(classroomDB(element.id).top) + (aY-bY))+'px';
        move_classroomDB(element.id, Left, Top);
        refresh_remember_class.push(element.id);
      });
      bX=aX;
      bY=aY;

      show_floor();
      refresh_class_rember();
      refresh_remember_class = [];
    }
  });
}


//교실 삭제
function delete_class(){
  choice_classrooms=document.querySelectorAll('.choice_panel');
  var choice = confirm(which.value+"-"+floor.value+"에서"+choice_classrooms.length+"개의 교실을 제거하시겠습니까? \n 삭제된 데이터는 복구할 수 없습니다.");
  
  if(choice){
    choice_classrooms.forEach(function(element){
      remove_classroomDB(element.id);
    });
    show_floor();
  }
}

// 페이지가 로드될 때 실행할 함수들
show_floor();
move_class();
Menu_Operation();//메뉴 버튼들 실행 판단
changeBackground();//배경 변경 함수
create_classroom_checkbox();//새 교실 추가 WIFI체크함수
fix_classroom_checkbox();//수정하기 WIFI체크함수
mouse_move_class();
