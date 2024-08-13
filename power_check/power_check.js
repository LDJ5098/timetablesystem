var urlParams = new URLSearchParams(window.location.search);

var device_code = urlParams.get('code');

if(device_code === null){
    document.getElementById('device_code').textContent = "디바이스 코드 값이 존재하지 않습니다.(null)";
}
else if(device_code === inspect_code()){
    document.getElementById('device_code').textContent = "해당 디바이스 기기는 등록되지 않은 기기입니다.";
}
else document.getElementById('device_code').textContent = "기기 코드 : " + device_code;

function inspect_code(){//기기 코드가 DB에 존재하는지 확인하는 함수
    return true;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const now = new Date();
// 2주 전 시간 계산
const twoWeeksAgo = new Date();
twoWeeksAgo.setDate(now.getDate() - 14);

// 날짜 및 시간 형식을 YYYY-MM-DDTHH:MM으로 변환
function formatDateTime(date, defaultTimeToMidnight = false) {
    const padZero = (num) => String(num).padStart(2, '0');

    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1); // 월은 0부터 시작하므로 1을 더함
    const day = padZero(date.getDate());

    var hours = padZero(date.getHours());
    var minutes = padZero(date.getMinutes());

    if (defaultTimeToMidnight) {
        hours = '00';
        minutes = '00';
    }

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// 요소 가져오기
const startInput = document.getElementById('start');
const endInput = document.getElementById('end');

// 최소 및 최대 값 설정
startInput.min = formatDateTime(twoWeeksAgo);
startInput.max = formatDateTime(now);
endInput.min = formatDateTime(twoWeeksAgo);
endInput.max = formatDateTime(now);

// 기본 값 설정 (예: 최대 값으로 설정)
startInput.value = formatDateTime(twoWeeksAgo, true);
endInput.value = formatDateTime(now);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
    const chartYT = document.getElementById('chartYT');
    const chartYMD = document.getElementById('chartYMD');
    
    const checkboxYT = document.querySelectorAll('.checkbox input[type="checkbox"]')[0];
    const checkboxYMD = document.querySelectorAll('.checkbox input[type="checkbox"]')[1];

    // 처음 로드될 때 체크 상태에 따라 chart를 숨기거나 표시
    toggleCharts();

    // 체크박스 상태가 변경될 때마다 chart를 숨기거나 표시
    checkboxYT.addEventListener('change', toggleCharts);
    checkboxYMD.addEventListener('change', toggleCharts);

    function toggleCharts() {
        if (checkboxYT.checked) {
            chartYT.style.display = 'block';
        } else {
            chartYT.style.display = 'none';
        }

        if (checkboxYMD.checked) {
            chartYMD.style.display = 'block';
        } else {
            chartYMD.style.display = 'none';
        }
    }
});



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var powerData;
function data_load(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'power_data_load.php?code=' + device_code, false); // 동기 요청
  xhr.onload = function() {
    if (xhr.status === 200) {
      // 응답 데이터가 성공적으로 도착한 경우
      var data = JSON.parse(xhr.responseText);
      
      powerData = data;

      // 콘솔에 데이터를 출력 (디버깅용)
      console.log('Fetched Data:', powerData);
      
    } else {
      alert('Failed to fetch data. Status: ' + xhr.status);
    }
  };
  xhr.send();
}

function create_chart(){
    var chartYT = echarts.init(document.getElementById('chartYT'));
    var chartYMD = echarts.init(document.getElementById('chartYMD'));

    if (chartYT) chartYT.dispose();
    if (chartYMD) chartYMD.dispose();
    
    chartYT = echarts.init(document.getElementById('chartYT'));
    chartYMD = echarts.init(document.getElementById('chartYMD'));

    chartYT.setOption(optionYT);
    chartYMD.setOption(optionYMD);

    var creation_time = document.getElementById('creation_time'); 
    creation_time.textContent = "생성시점 : " + formatDateTime(new Date());

    data_load();
}

optionYT = {
    title: {
        text: '범위 내에 사용한 전력 소비량'
    },
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
      name: 'Y/T',
      type: 'category',
      data: [
             '(24.08.29 00)',
             '(24.08.29 01)',
             '(24.08.29 02)',
             '(24.08.29 03)',
             '(24.08.29 04)',
             '(24.08.29 05)',
             '(24.08.29 06)',
             '(24.08.29 07)',
             '(24.08.29 08)',
             '(24.08.29 09)',
             '(24.08.29 10)',
             '(24.08.29 11)',
             '(24.08.29 12)',
             '(24.08.29 13)',
             '(24.08.29 14)',
             '(24.08.29 15)',
             '(24.08.29 16)',
             '(24.08.29 17)',
             '(24.08.29 18)',
             '(24.08.29 19)',
             '(24.08.29 20)',
             '(24.08.29 21)',
             '(24.08.29 22)',
             '(24.08.29 23)', 
            ]
    },
    yAxis: {
      name: 'W',
      nameLocation: 'end',
      type: 'value'
    },
    series: [
      {
        data: [150, 140, 180, 200, 210, 200, 205, 180, 180, 160, 150, 130, 130, 150, 150, 155, 160, 150, 140, 180, 50, 0, 0, 0, 0],
        type: 'line'
      }
    ]
  };

optionYMD = {
    title: {
        text: '2주 동안 사용한 총 전력 소비량'
    },
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
      name: 'Y/T',
      type: 'category',
      data: [
             '(24.07.29)',
             '(24.07.30)',
             '(24.07.31)',
             '(24.08.01)',
             '(24.08.03)',
             '(24.08.04)',
             '(24.08.05)',
             '(24.08.06)',
             '(24.08.07)',
             '(24.08.08)',
             '(24.08.09)',
             '(24.08.10)',
             '(24.08.11)',
             '(24.08.12)',
            ]
    },
    yAxis: {
      name: 'W',
      nameLocation: 'end',
      type: 'value'
    },
    series: [
      {
        data: [700, 750, 720, 763, 720, 600, 300, 300, 720, 750, 780, 730, 743, 745],
        type: 'line'
      }
    ]
  };
