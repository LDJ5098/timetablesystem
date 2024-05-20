//////////////////////////////////////로그인 영역/////////////////////////////////////
function logincheck(){
    var login_button = document.getElementById('loginbutton');
    if(sessionStorage.getItem('loginTF')==="true"){
      document.querySelectorAll('.menu_button').forEach(function(element){
        element.disabled = false;
      });
      login_button.textContent = "로그아웃";
    }
    else {
      document.querySelectorAll('.menu_button').forEach(function(element){
        element.disabled = true;
      });
    }
  
    login_button.addEventListener('click', function(){
      if(login_button.textContent === "로그아웃"){
        sessionStorage.removeItem('loginTF');
        location.reload();
      }
      else window.location.href = 'admin_login.html';
    });
  }
  logincheck();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  
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
        } else { // 요청이 실패한 경우
            console.error('Request failed with status:', request.status);
        }
    } catch (error) {
        console.error('There was a problem with the request:', error);
    }
  }
  
  
  //서버에 데이터를 제거하기
  function deleteDataInPHP(data) {
    var url = "timetable_system_delete.php";
    var request = new XMLHttpRequest();
    request.open("POST", url, false); // 동기적 요청으로 변경 (마지막 파라미터가 false)
    request.setRequestHeader("Content-Type", "application/json");
  
    try {
        var jsonData = JSON.stringify(data);
        request.send(jsonData);
  
        if (request.status === 200) { // 요청이 성공한 경우
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
        } else { // 요청이 실패한 경우
            console.error('Request failed with status:', request.status);
        }
    } catch (error) {
        console.error('There was a problem with the request:', error);
    }
  }
  
  
  /////////////////////////////////
  function MoveDataToPHP(data) {
    var url = "timetable_system_move.php";
    var request = new XMLHttpRequest();
    request.open("POST", url, false); // 동기적 요청으로 변경 (마지막 파라미터가 false)
    request.setRequestHeader("Content-Type", "application/json");
  
    try {
        var jsonData = JSON.stringify(data);
        request.send(jsonData);
  
        if (request.status === 200) { // 요청이 성공한 경우
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
        object_code: objectcode
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
            return JSON.parse(result);
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
      wifi:WIFI.checked
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
      object_code:code
    }
    deleteDataInPHP(object);
    console.log('삭제되었습니다');
  }
  
  
  //교실이 클릭되었을 때 이벤트 처리 함수 true == 같음
  function click_classroom(element) {
      element.addEventListener('click', function() {
        if(activeButton===document.querySelectorAll('.menu_button')[1]){
          searchdata = classroomDB(element.id);
          fix_number.value=searchdata.class_number;
          fix_name.value=searchdata.class_name;
          fix_classroom_device_code.value=searchdata.device_code;
          fix_width.value=searchdata.width;
          fix_height.value=searchdata.height;
          fix_class_detail.value=searchdata.other;
          fix_classroom_WIFI_check.checked=searchdata.wifi;
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
        
        else {}
      });
  }
  
  
  //floor 배경 이미지 변경 함수
  function changeBackground() {
  
      var imagePath = "./floor_section/" + which.value + "/" + floor.value + ".jpg";
  
      document.getElementById("background").style.backgroundImage = "url('" + imagePath + "')";
  
      document.getElementById('floor_info').textContent = which.value + "-" + floor.value;
  
      show_floor();
  }
  
  
  //object_code, which, floor, class_number, class_name, device_code, width, height, other, wifi, top_value, left_value
  function arr_compare(now, past){
    if(now.object_code!==past.object_code||
      now.which!==past.which||
      now.floor!==past.floor||
      now.class_number!==past.class_number||
      now.class_name!==past.class_name||
      now.device_code!==past.device_code||
      now.width!==past.width||
      now.height!==past.height||
      now.other!==past.other||
      now.wifi!==past.wifi||
      now.top_value!==past.top_value||
      now.left_value!==past.left_value
      )return false;
    return true;//같음
  }
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  var change_remember = [];
  //데이터베이스에서 값을 가져와서 화면에 띄워주는 함수
  function show_floor(){
    var preprocessing = load_database_code();
  
    var show_array = [];
    var index = 0;
    preprocessing.forEach(function(arr){
      if(arr.floor===floor.value&&arr.which==which.value){
        show_array[index] = arr;
        index++;
      }
    });
  
    var new_change = [];
    show_array.forEach(function(now){
      for(var i=0; i<change_remember.length; i++){
        if(arr_compare(now,change_remember[i])===true){
          new_change.push(now);//같은 경우의 객체
          break;
        }
      }
    });
  
    document.querySelectorAll('.class_info_panel').forEach(function(element){
      var TF_past = true; 
      for(var i=0;i<new_change.length;i++){
        if(new_change[i].object_code===element.id) TF_past = false;
      }
      if(TF_past){
        element.remove();
      }
    });
  
    var new_array = [];
    show_array.forEach(function(now){
      var TF_now = true; 
      for(var i=0;i<new_change.length;i++){
        if(new_change[i].object_code===now.object_code) TF_now = false;
      }
      if(TF_now){
        new_array.push(now.object_code);
      }
    });
  
    show_array.forEach(function(db){
      for(var new_array_ID of new_array){
        if(db.object_code===new_array_ID){
          var show_classroom = document.createElement("div");
          
          show_classroom.classList.add("class_info_panel");
          show_classroom.id = db.object_code;
          show_classroom.style.width = db.width;
          show_classroom.style.height = db.height;
          show_classroom.style.top = db.top_value;
          show_classroom.style.left = db.left_value;
      
          var in_text = document.createElement('label');
      
          in_text.textContent =  db.class_number;
      
          floor_background.appendChild(show_classroom);
          show_classroom.appendChild(in_text);
      
          click_classroom(show_classroom);
          break;
        }
      }
    });
  
    change_remember = show_array;
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  
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
      document.body.style.overflow = 'auto';
    }
  
    else if(activeButton===document.querySelectorAll('.menu_button')[1]){
      console.log('내용 수정 활성화');
      document.getElementById('create_classroom_background').style.display='none';
      document.getElementById('delete_button').style.display='none';
      cancel_choice();
      document.body.style.overflow = 'auto';
    }
  
    else if(activeButton===document.querySelectorAll('.menu_button')[2]){
      console.log('위치 이동 활성화');
      document.getElementById('create_classroom_background').style.display='none';
      document.getElementById('fix_classroom_background').style.display='none';
      document.getElementById('delete_button').style.display='none';
      cancel_choice();
      move_class();
      mouse_move_class();
      document.body.style.overflow = 'hidden';
    }
  
    else if(activeButton===document.querySelectorAll('.menu_button')[3]){
      console.log('교실 삭제 활성화');
      document.getElementById('create_classroom_background').style.display='none';
      document.getElementById('fix_classroom_background').style.display='none';
      document.getElementById('delete_button').style.display='block';
      cancel_choice();
      document.body.style.overflow = 'auto';
    }
  
    else {
      console.log('비활성화');
      document.getElementById('create_classroom_background').style.display='none';
      document.getElementById('fix_classroom_background').style.display='none';
      document.getElementById('delete_button').style.display='none';
      cancel_choice();
      document.body.style.overflow = 'auto';
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
  }
  
  
  //새 교실 생성 전 검사
  function create_new_classroom(){
    var error_log = "";
  
    var database = load_database_code();
    for (let i = 0; i < database.length; i++) {
      if(database[i].floor===floor.value&&database[i].which===which.value&&database[i].class_number===create_number.value&&recent_choice_code!==database[i].object_code){
        error_log += "같은 건물에는 같은 호수의 교실을 입력할 수 없습니다(중복발생)";
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
  }
  
  //수정하기 전 검사
  function fix_classroom(){
    var error_log = "";
  
    var database = load_database_code();
    for (let i = 0; i < database.length; i++) {
      if(database[i].floor===floor.value&&database[i].which===which.value&&database[i].class_number===fix_number.value&&recent_choice_code!==database[i].object_code){
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
    for(var i=0; i<refresh_remember_class.length; i++) {
      var element = document.getElementById(refresh_remember_class[i]);
      if(element!==null){
        element.classList.add('choice_panel');
      }
    }
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
              //var searchdata = classroomDB(element.id);
              var Left = element.style.left;
              var Top = String(parseFloat(element.style.top) - keyboard_speed)+'px';
  
              element.style.left = Left;
              element.style.top = Top;
  
              //refresh_remember_class.push(element.id);  
              //move_classroomDB(element.id, Left, Top);
          });
      } 
      else if (event.key === "ArrowDown"&&activeButton===document.querySelectorAll('.menu_button')[2]) {
          // 아래쪽 방향키를 눌렀을 때의 동작
          choice_classrooms.forEach(function(element){
              //var searchdata = classroomDB(element.id);
              var Left = element.style.left;
              var Top = String(parseFloat(element.style.top) + keyboard_speed)+'px';
  
              element.style.left = Left;
              element.style.top = Top;
              
              //refresh_remember_class.push(element.id);  
              //move_classroomDB(element.id, Left, Top);  
          });
      }
      else if (event.key === "ArrowLeft"&&activeButton===document.querySelectorAll('.menu_button')[2]) {
          // 왼쪽 방향키를 눌렀을 때의 동작
          choice_classrooms.forEach(function(element){
              //var searchdata = classroomDB(element.id);
              var Left = String(parseFloat(element.style.left) - keyboard_speed)+'px';
              var Top = element.style.top;
  
              element.style.left = Left;
              element.style.top = Top;
  
              //refresh_remember_class.push(element.id);  
              //move_classroomDB(element.id, Left, Top); 
          });
      }
      else if (event.key === "ArrowRight"&&activeButton===document.querySelectorAll('.menu_button')[2]) {
          // 오른쪽 방향키를 눌렀을 때의 동작
          choice_classrooms.forEach(function(element){
              //var searchdata = classroomDB(element.id);
              var Left = String(parseFloat(element.style.left) + keyboard_speed)+'px';
              var Top = element.style.top;
  
              element.style.left = Left;
              element.style.top = Top;
  
              //refresh_remember_class.push(element.id);  
              //move_classroomDB(element.id, Left, Top);
          });
      }
    });
  
  }
  

  //마우스로 이동시키기
  var bX, bY, aX, aY, mouse_info='up';
  //휴대폰 터치로 이동시키기
  var p_bX, p_bY, p_aX, p_aY, touch_info='up';
  
  function mouse_move_class(){
    //마우스 이동
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
  
    let m_Running = false;
    document.addEventListener('mousemove', function(event){
      if(m_Running) return;
      m_Running = true;

      if(activeButton===document.querySelectorAll('.menu_button')[2]&&mouse_info==='down'){
        aX=event.clientX;
        aY=event.clientY;
  
        choice_classrooms.forEach(function(element){
          //var searchdata = classroomDB(element.id);
          var Left = String(parseFloat(element.style.left) + (aX-bX))+'px';
          var Top = String(parseFloat(element.style.top) + (aY-bY))+'px';
          
          element.style.left = Left;
          element.style.top = Top;
        });
        bX=aX;
        bY=aY;
        m_Running=false;
      }
    });
  
    //터치 이동
    document.addEventListener('touchstart', function(event){
      choice_classrooms=document.querySelectorAll('.choice_panel');
      var touch = event.touches[0];
      p_bX = touch.clientX;
      p_bY = touch.clientY;
      touch_info='down';
    });
  
    document.addEventListener('touchend', function(){
      touch_info='up';
    });
  
    document.addEventListener('touchmove', function(event){
      var touch = event.touches[0];
      if(activeButton === document.querySelectorAll('.menu_button')[2] && touch_info === 'down'){
        p_aX = touch.clientX;
        p_aY = touch.clientY;
  
        choice_classrooms.forEach(function(element){
          //var searchdata = classroomDB(element.id);
          var Left = String(parseFloat(element.style.left) + (aX-bX))+'px';
          var Top = String(parseFloat(element.style.top) + (aY-bY))+'px';
  
          element.style.left = Left;
          element.style.top = Top;
          //refresh_remember_class.push(element.id);
          //move_classroomDB(element.id, Left, Top);
        });
  
        p_bX = p_aX;
        p_bY = p_aY;
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
  
  
  function preprocessing(){

    choice_classrooms=document.querySelectorAll('.choice_panel');
    choice_classrooms.forEach(function(element){
      move_classroomDB(element.id, element.style.left, element.style.top);
      refresh_remember_class.push(element.id);
    });
  
    show_floor();
    refresh_class_rember();
    refresh_remember_class = [];
  }
  
  
  
  setInterval(function() {
    preprocessing();
  }, 62.5); // 16fps 16/1000
