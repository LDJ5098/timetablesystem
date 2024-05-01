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

var activeButton = null;
var recent_choice_index = null;

//classroomDB
var classroomDB = [];

//객체 정보 추가 함수
function push_classroomDB(Which_, floor_, number, name, code, width, height, other, WIFI, Top, Left){
  var object = {
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
  classroomDB.push(object);
}


//객체 정보 수정 함수
function fix_classroomDB(i, Which_, floor_, number, name, code, width, height, other, WIFI){
  classroomDB[i].which_select = Which_.value;
  classroomDB[i].floor_select = floor_.value;
  classroomDB[i].class_number = number.value;
  classroomDB[i].class_name = name.value;
  classroomDB[i].device_code = code.value;
  classroomDB[i].width = width.value;
  classroomDB[i].height = height.value;
  classroomDB[i].other = other.value;
  classroomDB[i].wifi = WIFI.checked;
}

//객체 정보 삭제 함수
function remove_classroomDB(index){
  classroomDB.splice(index, 1);
  console.log('삭제되었습니다');
}

//교실이 클릭되었을 때 이벤트 처리 함수
function click_classroom() {
  var elements = document.querySelectorAll('.class_info_panel');
  elements.forEach(function(element) {
    element.addEventListener('click', function() {
      var label = element.querySelector('label');
      if(activeButton===document.querySelectorAll('.menu_button')[1]){
        for(var i=0; i<classroomDB.length; i++){
          if(classroomDB[i].class_number===label.textContent){
            fix_number.value=classroomDB[i].class_number;
            fix_name.value=classroomDB[i].class_name;
            fix_classroom_device_code.value=classroomDB[i].device_code;
            fix_width.value=classroomDB[i].width;
            fix_height.value=classroomDB[i].height;
            fix_class_detail.value=classroomDB[i].other;
            fix_classroom_WIFI_check.checked=classroomDB[i].wifi;
            document.getElementById('fix_classroom_background').style.display='flex';
            recent_choice_index=i;
          }
        }
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

  classroomDB.forEach(function(db){
    if(db.which_select===which.value&&db.floor_select===floor.value){
      var show_classroom = document.createElement("div");
    
      show_classroom.classList.add("class_info_panel");
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

  console.log(classroomDB);
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
  fix_classroomDB(recent_choice_index ,which, floor, fix_number, fix_name, fix_classroom_device_code, fix_width, fix_height, fix_class_detail, fix_classroom_WIFI_check);
  show_floor();
  console.log(classroomDB);
}

//수정하기 전 검사
function fix_classroom(){
  var error_log = "";

  for (let i = 0; i < classroomDB.length; i++) {
    if (classroomDB[i].which_select === which.value && classroomDB[i].floor_select === floor.value && classroomDB[i].class_number === fix_number.value && recent_choice_index!==i) {
        error_log += '같은 건물에 같은 호수는 존재할 수 없습니다.(중복발생)\n';
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
  refresh_remember_class.forEach(function(val){
    for(var i=0; i < refresh_class.length; i++){
      if(val===refresh_class[i].querySelector('label').textContent) refresh_class[i].classList.add("choice_panel");
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
          for(var i=0;i<classroomDB.length;i++){
            if(element.querySelector('label').textContent === classroomDB[i].class_number){
              classroomDB[i].top = String(parseFloat(classroomDB[i].top) - keyboard_speed)+'px';
              refresh_remember_class.push(classroomDB[i].class_number);   
              break;
            }
          }
        });
        show_floor();
        refresh_class_rember();
        refresh_remember_class = [];
    } 
    else if (event.key === "ArrowDown"&&activeButton===document.querySelectorAll('.menu_button')[2]) {
        // 아래쪽 방향키를 눌렀을 때의 동작
        choice_classrooms.forEach(function(element){
          for(var i=0;i<classroomDB.length;i++){
            if(element.querySelector('label').textContent === classroomDB[i].class_number){
              classroomDB[i].top = String(parseFloat(classroomDB[i].top) + keyboard_speed)+'px';
              refresh_remember_class.push(classroomDB[i].class_number);   
              break;
            }
          }
        });
        show_floor();
        refresh_class_rember();
        refresh_remember_class = [];
    }
    else if (event.key === "ArrowLeft"&&activeButton===document.querySelectorAll('.menu_button')[2]) {
        // 왼쪽 방향키를 눌렀을 때의 동작
        choice_classrooms.forEach(function(element){
          for(var i=0;i<classroomDB.length;i++){
            if(element.querySelector('label').textContent === classroomDB[i].class_number){
              classroomDB[i].left = String(parseFloat(classroomDB[i].left) - keyboard_speed)+'px';
              refresh_remember_class.push(classroomDB[i].class_number);   
              break;
            }
          }
        });
        show_floor();
        refresh_class_rember();
        refresh_remember_class = [];
    }
    else if (event.key === "ArrowRight"&&activeButton===document.querySelectorAll('.menu_button')[2]) {
        // 오른쪽 방향키를 눌렀을 때의 동작
        choice_classrooms.forEach(function(element){
          for(var i=0;i<classroomDB.length;i++){
            if(element.querySelector('label').textContent === classroomDB[i].class_number){
              classroomDB[i].left = String(parseFloat(classroomDB[i].left) + keyboard_speed)+'px';
              refresh_remember_class.push(classroomDB[i].class_number);   
              break;
            }
          }
        });
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
      var label = element.querySelector('label');
      for(var i=0; i<classroomDB.length; i++){
        if(label.textContent===classroomDB[i].class_number){
          console.log(classroomDB[i].class_number);
          remove_classroomDB(i);
          break;
        }
      }
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