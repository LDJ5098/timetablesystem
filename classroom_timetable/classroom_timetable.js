
//////////////////////////URL쿼리 매개변수 값 읽어오기////////////////////////
var queryString = window.location.search;
var searchParams = new URLSearchParams(queryString);
// 매개변수 값 추출
var classroom_ID = searchParams.get('classID'); // MIO1O0V2O9
var classroom_name = searchParams.get('classname'); // 104호 (디코딩된 값)
var loginTF = searchParams.get('loginTF'); // 로그인여부
//console.log(classroom_ID, classroom_name);
document.getElementById("title").textContent = classroom_name;


document.querySelector(".table_body").scrollTop = 369;

function select_week_menu(select_week){
    select_week[0].style.backgroundColor = "rgb(255, 60, 60)";
    select_week[0].style.color = "white";

    select_week.forEach(function(element){
        element.addEventListener("click", function(){
            
            select_week.forEach(function(elm){
                elm.style.backgroundColor = "rgb(233, 233, 233)";
                elm.style.color = "black";
            });


            if(element.style.backgroundColor === "rgb(233, 233, 233)"){
                element.style.backgroundColor = "rgb(255, 60, 60)";
                element.style.color = "white";
            }
            else{
                elment.style.backgroundColor = "rgb(233, 233, 233)";
                elment.style.color = "black";
            }
        });
    });
}

var htmlCode = `
    <div class="time_place">
        <div class="select_week">
            <label>월</label>
            <label>화</label>
            <label>수</label>
            <label>목</label>
            <label>금</label>
            <label>토</label>
            <label>일</label>
        </div>
        <p style="margin: 2px; margin-top:10px;">
            <select class="starthour">
                <option value="0">오전 0시</option>
                <option value="1">오전 1시</option>
                <option value="2">오전 2시</option>
                <option value="3">오전 3시</option>
                <option value="4">오전 4시</option>
                <option value="5">오전 5시</option>
                <option value="6">오전 6시</option>
                <option value="7">오전 7시</option>
                <option value="8">오전 8시</option>
                <option value="9" selected="selected">오전 9시</option>
                <option value="10">오전 10시</option>
                <option value="11">오전 11시</option>
                <option value="12">오후 12시</option>
                <option value="13">오후 1시</option>
                <option value="14">오후 2시</option>
                <option value="15">오후 3시</option>
                <option value="16">오후 4시</option>
                <option value="17">오후 5시</option>
                <option value="18">오후 6시</option>
                <option value="19">오후 7시</option>
                <option value="20">오후 8시</option>
                <option value="21">오후 9시</option>
                <option value="22">오후 10시</option>
                <option value="23">오후 11시</option>
            </select>
            <select class="startminute">
                <option value="0" selected="selected">0분</option>
                <option value="5">5분</option>
                <option value="10">10분</option>
                <option value="15">15분</option>
                <option value="20">20분</option>
                <option value="25">25분</option>
                <option value="30">30분</option>
                <option value="35">35분</option>
                <option value="40">40분</option>
                <option value="45">45분</option>
                <option value="50">50분</option>
                <option value="55">55분</option>
            </select>
            <span style="font-size:8px">~</span>
            <select class="endhour">
                <option value="0">오전 0시</option>
                <option value="1">오전 1시</option>
                <option value="2">오전 2시</option>
                <option value="3">오전 3시</option>
                <option value="4">오전 4시</option>
                <option value="5">오전 5시</option>
                <option value="6">오전 6시</option>
                <option value="7">오전 7시</option>
                <option value="8">오전 8시</option>
                <option value="9">오전 9시</option>
                <option value="10" selected="selected">오전 10시</option>
                <option value="11">오전 11시</option>
                <option value="12">오후 12시</option>
                <option value="13">오후 1시</option>
                <option value="14">오후 2시</option>
                <option value="15">오후 3시</option>
                <option value="16">오후 4시</option>
                <option value="17">오후 5시</option>
                <option value="18">오후 6시</option>
                <option value="19">오후 7시</option>
                <option value="20">오후 8시</option>
                <option value="21">오후 9시</option>
                <option value="22">오후 10시</option>
                <option value="23">오후 11시</option>
            </select>
            <select class="endminute">
                <option value="0" selected="selected">0분</option>
                <option value="5">5분</option>
                <option value="10">10분</option>
                <option value="15">15분</option>
                <option value="20">20분</option>
                <option value="25">25분</option>
                <option value="30">30분</option>
                <option value="35">35분</option>
                <option value="40">40분</option>
                <option value="45">45분</option>
                <option value="50">50분</option>
                <option value="55">55분</option>
            </select>
        </p>
    </div>
`;

function select_enable_functionality(){
    var background = document.getElementById('create_background')
    var time_place = document.querySelectorAll('.time_place');
    background.style.height = (background.offsetHeight + time_place[0].offsetHeight) + 'px';

    var element = time_place[time_place.length-1];
    var ele = element.querySelectorAll('.select_week > label');
    select_week_menu(ele); 
}

function more_input(){
    var parentElement = document.getElementById('time_places');
    parentElement.insertAdjacentHTML('beforeend', htmlCode); 
    select_enable_functionality();
}
select_enable_functionality();



function create_new_class(){
    if(loginTF!=="true"){
        loginfail();
        return;
    }

    document.getElementById('create_background').style.display='block';

    var time_place = document.querySelectorAll('.time_place');
    time_place.forEach(function(element){
        element.parentNode.removeChild(element);
    });
    document.getElementById('create_background').style.height='400px';
    more_input();
}

function close_button_click(){
    document.getElementById('create_background').style.display='none';
}

function getRandomPastelColor() {
    // 랜덤으로 R, G, B 값을 생성합니다.
    var r = Math.floor(Math.random() * 106) + 150; // 50에서 255 사이의 값
    var g = Math.floor(Math.random() * 106) + 150; // 50에서 255 사이의 값
    var b = Math.floor(Math.random() * 106) + 150; // 50에서 255 사이의 값

    // 색상을 반환합니다.
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}


var maindata = [[],[],[],[],[],[],[]];
var serial_class_data = [];
//랜덤 키 발급 함수
function generateRandomKey() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    const charactersLength = characters.length;
    
    var TF=true;
    while(TF){
        for (let i = 0; i < 15; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        var forTF=true;
        for (var i = 0; i < maindata.length; i++) {
            for (var j = 0; j < maindata[i].length; j++) {
                if (maindata[i][j].key === result) {
                    forTF=false;
                    break;
                }
            }
            if(forTF==false)break;
        }
        if(forTF)TF=false;
    }
    return result;
}

function serial_class_key() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    const charactersLength = characters.length;
    
    var TF=true;
    while(TF){
        for (let i = 0; i < 15; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        var forTF=true;
        for (var i = 0; i < serial_class_data.length; i++) {
            if(result === serial_class_data[i].serial_code){
                forTF=false;
                break;
            }
        }
        if(forTF) TF=false;
    }
    return result;
}


class_object_code = '';
function refresh_maindata(){
    // AJAX 요청 생성
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "save_data.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    // 콜백 함수
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                //console.log("데이터가 성공적으로 저장되었습니다.");
            } else {
                //console.log("데이터 저장 중 오류가 발생했습니다. " + xhr.statusText);
            }
        }
    };

    // 데이터 전송
    var dataToSend = JSON.stringify({object_code: class_object_code, json_data: maindata});
    xhr.send(dataToSend);
}



function add_new_data(class_name, professor_name, choice_week ,start_time, end_time, background_color_value, serial_class){
    var object = {
        key:generateRandomKey(),
        classname:class_name,
        professor:professor_name,
        starttime:start_time,
        endtime:end_time,

        serial_code:serial_class
    }

    var serial_object = {
        serial_code:serial_class,
        background_color:background_color_value
    }
    maindata[choice_week].push(object);
    serial_class_data.push(serial_object);

    //console.log(maindata);
}

function class_edit(arr_index, object_id ,classname, professor_name, choice_week, start_time, end_time){
    
}

function deleteclass_maindata(classID){
    if(loginTF!=="true"){
        loginfail();
        return;
    }

    var forTF=true;
    for (var i = 0; i < maindata.length; i++) {
        for (var j = 0; j < maindata[i].length; j++) {
            if (maindata[i][j].key === classID) {
                maindata[i].splice(j, 1);
                forTF=false;
                break;
            }
        }
        if(forTF==false)break;
    }
    sendData();
    //console.log(maindata);
}

//중복 체크
function duplication_check(list_index, choice_week, start_time, end_time){
    var TF = false;
    for (var i = 0; i < maindata[choice_week].length; i++) {
        var element = maindata[choice_week][i];
        if ((start_time >= element.starttime && start_time <= element.endtime) ||
            (end_time >= element.starttime && end_time <= element.endtime) ||
            (start_time <= element.starttime && end_time >= element.endtime) ||
            (start_time >= element.starttime && end_time <= element.endtime)) {
            TF = true;
            break;
        }
    }

    var time_element = document.querySelectorAll('.time_place > p');
    
    var cnt = 0;
    time_element.forEach(function(element, listindex){
        var starthour = element.querySelector('.starthour').value;
        var startminute = element.querySelector('.startminute').value;
        var endhour = element.querySelector('.endhour').value;
        var endminute = element.querySelector('.endminute').value;


        var week = element.parentElement.querySelectorAll('.select_week > label');
        var choiceweek = false;
        week.forEach(function(choice, index){
            if(choice.style.backgroundColor === "rgb(255, 60, 60)"){
                choiceweek = index;
                return;
            }
        });

        var starttime = parseInt(starthour) * 60 + parseInt(startminute);
        var endtime = parseInt(endhour) * 60 + parseInt(endminute);

        if(start_time >= starttime && start_time <= endtime && choice_week===choiceweek && list_index!==listindex){
            cnt++;
        }
        if(end_time >= starttime && end_time <= endtime && choice_week===choiceweek && list_index!==listindex){
            cnt++;
        }
    });

    if(cnt > 0){
        TF=true;
    }
    return TF;
}
//////////////////////////////////////////////////////////////////////////
function new_save(){
    if(loginTF!=="true"){
        loginfail();
        return;
    }

    var input=document.querySelectorAll('.info_input > input');

    if(input[0].value===""){
        alert("값이 비어있습니다.");
        input[0].focus();
        return;
    }
    else if(input[1].value===""){
        alert("값이 비어있습니다.");
        input[1].focus();
        return;
    }
    

    var time_element = document.querySelectorAll('.time_place > p');
    var error=false;
    time_element.forEach(function(element, list_index){
        var starthour = element.querySelector('.starthour').value;
        var startminute = element.querySelector('.startminute').value;
        var endhour = element.querySelector('.endhour').value;
        var endminute = element.querySelector('.endminute').value;



        var week = element.parentElement.querySelectorAll('.select_week > label');
        var choice_week = false;
        week.forEach(function(choice, index){
            if(choice.style.backgroundColor === "rgb(255, 60, 60)"){
                choice_week = index;
                return;
            }
        });

        var starttime = parseInt(starthour) * 60 + parseInt(startminute);
        var endtime = parseInt(endhour) * 60 + parseInt(endminute);

        if(starttime > endtime){
            error='수업시작 시간이 끝나는 시간보다 이전입니다.';
        }

        else if(duplication_check(list_index ,choice_week ,starttime, endtime)){
            error='시간이 겹칩니다.';
        }
    });

    if(error!==false){
        alert(error);
        return;
    }
    else{//값이 정상적일 때
        var class_name = document.querySelectorAll('.info_input > input')[0].value;
        var professor = document.querySelectorAll('.info_input > input')[1].value;

        var backgroundcolor = getRandomPastelColor();
        var serial_class = serial_class_key();

        var TF=false;
        for(var i=0; i<maindata.length; i++){
            for(var j=0; j<maindata[i].length; j++){
                if(maindata[i][j].classname===class_name && maindata[i][j].professor===professor){
                    serial_class = maindata[i][j].serial_code;
                    TF=true;
                    console.log("기존의 수업에서 중복된 클래스를 발견했습니다. 해당 클래스로 대체합니다.");
                    break;
                }
            }
            if(TF==true)break;
        }


        time_element.forEach(function(element){
            var starthour = element.querySelector('.starthour').value;
            var startminute = element.querySelector('.startminute').value;
            var endhour = element.querySelector('.endhour').value;
            var endminute = element.querySelector('.endminute').value;



            var week = element.parentElement.querySelectorAll('.select_week > label');
            var choice_week = false;
            week.forEach(function(choice, index){
                if(choice.style.backgroundColor === "rgb(255, 60, 60)"){
                    choice_week = index;
                    return;
                }
            });
    
            var starttime = parseInt(starthour) * 60 + parseInt(startminute);
            var endtime = parseInt(endhour) * 60 + parseInt(endminute);
            
            add_new_data(class_name, professor ,choice_week ,starttime, endtime, backgroundcolor, serial_class);
        });
        //show_data();
        sendData();
        close_button_click();
    }
}
////////////////////////////////////////////////////////////////////////////////////
function deleteclass() {
    document.querySelectorAll('.delete_class').forEach(function(element) {
        if (!element.hasListener) {  // 커스텀 속성으로 이벤트 리스너 중복 방지
            element.addEventListener('click', function() {
                deleteclass_maindata(element.parentElement.parentElement.id);
                //show_data();
            });
            element.hasListener = true;  // 커스텀 속성 추가
        }
    });
}



function search_background_color(code){
    var background;
    for(i=0;i<serial_class_data.length;i++){
        if(serial_class_data[i].serial_code===code){
            background = serial_class_data[i].background_color;
            break;
        }
    }
    return background;
}

var backup_maindata = [[],[],[],[],[],[],[]];

function finddatacode(key){
    for(var i = 0; i < maindata.length; i++){
        for(var j = 0; j < maindata[i].length; j++){
            if(maindata[i][j].key===key){
                return false;
            }
        }
    }
    return true;
}

function finddifferences(key, classname, professor, start_time, end_time, serial_code){
    var found = false;

    for(var i = 0; i < backup_maindata.length; i++){
        for(var j = 0; j < backup_maindata[i].length; j++){
            if(backup_maindata[i][j].key===key){
                found = true;
                var object = backup_maindata[i][j];
                if(object.classname!==classname)return 'different';
                else if(object.professor!==professor)return 'different';
                else if(object.start_time!==start_time)return 'different';
                else if(object.end_time!==end_time)return 'different';
                else if(object.serial_code!==serial_code)return 'different';
            }
        }
    }
    return found ? 'same' : 'not found';
    //different : 데이터가 존재하지만 일부 속성 값이 다른 경우
    //same : 데이터가 존재하고 모든 속성 값이 동일한 경우
    //not found : 해당 키에 해당하는 데이터가 존재하지 않는 경우
}

function show_data(){
    backup_maindata.forEach(function(datas){
        datas.forEach(function(object){
            if(finddatacode(object.key)){
                document.querySelectorAll('.class_info').forEach(function(element){
                    if(element.id===object.key)element.remove();
                });
            }
        });
    });

    maindata.forEach(function(datas, index){
        datas.forEach(function(object){
            var search_mode = finddifferences(object.key, object.classname, object.professor, object.start_time, object.end_time, object.serial_code);
            if(search_mode==='same')return;
            else if(search_mode==='different'){
                document.querySelectorAll('.class_info').forEach(function(element){
                    if(element.id===object.key)element.remove();
                });
            }
            var className = object.classname;
            var professorName = object.professor;
            var background_color = search_background_color(object.serial_code);

            var height = ((100 * (parseFloat(object.endtime-object.starttime)/(60*24))) - parseFloat(0.04)).toFixed(2) + '%';
            var top = ((100 * (parseFloat(object.starttime)/(60*24))) - parseFloat(0.02)).toFixed(2) + '%';

            var class_id = object.key;
            var html = `
                <div class="class_info ${object.serial_code}" style="height:${height}; top:${top}; background-color:${background_color};" id="${class_id}">
                    <div>
                        <label class="classname">${className}</label>
                        ${loginTF === "true" ? '<img src="delete.png" class="delete_class">' : ''}
                    </div>
                    <div>
                        <label class="class_professor">${professorName}</label>
                    </div>
                </div>
            `;

            var target = document.querySelectorAll('.class_cols')[index];
            target.insertAdjacentHTML('beforeend', html);
        });
    });
    deleteclass();
}


function edit_menu(){
}

var object_code=classroom_ID;
function sendData() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'save_classlist.php', false); // false for synchronous request
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
        }
    };

    var data = JSON.stringify({ object_code: object_code, maindata: maindata, serial_class_data: serial_class_data });
    xhr.send(data);
}

function loadData() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'load_classlist.php?object_code=' + object_code, true); // true for asynchronous request
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.maindata || response.serial_class_data) {
                maindata = response.maindata;
                serial_class_data = response.serial_class_data;
                //console.log('성공적으로 데이터를 불러왔습니다. : ', response.maindata, response.serial_class_data);
            } else {
                //console.log('데이터를 불러오는데 실패했습니다.');
            }
        }
    };

    xhr.send();
}

console.log(loginTF);
loadData();
show_data();
backup_maindata=maindata;

///////////////////로그인이 안되어있는 상태에서 접속했을시///////////////////////////////////////////////////
if(loginTF!=="true") document.getElementById('create_new_button').style.display = "none";
else document.getElementById('create_new_button').style.display = "block";
function loginfail(){
    alert('로그인이 안되어있습니다.');
}

/////////////////////////////////////////////////////////////////////////////////


function cycle(){
    loadData();
    show_data();
    backup_maindata=maindata;
    //console.log('출력했습니다.');
}
setInterval(cycle, 16.6);
