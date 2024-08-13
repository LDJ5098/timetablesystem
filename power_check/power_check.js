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

var now = new Date();
// 2주 전 시간 계산
var twoWeeksAgo = new Date();
twoWeeksAgo.setDate(now.getDate() - 14);

// 날짜 및 시간 형식을 YYYY-MM-DDTHH:MM으로 변환
function formatDateTime(date, defaultTimeToMidnight = false) {
    var padZero = (num) => String(num).padStart(2, '0');

    var year = date.getFullYear();
    var month = padZero(date.getMonth() + 1); // 월은 0부터 시작하므로 1을 더함
    var day = padZero(date.getDate());

    var hours = padZero(date.getHours());
    var minutes = padZero(date.getMinutes());

    if (defaultTimeToMidnight) {
        hours = '00';
        minutes = '00';
    }

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// 요소 가져오기
/**범위 시작 값*/
var startInput = document.getElementById('start');
/**범위 끝 값*/
var endInput = document.getElementById('end');

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
    var chartYT = document.getElementById('chartYT');
    var chartYMD = document.getElementById('chartYMD');
    
    var checkboxYT = document.querySelectorAll('.checkbox input[type="checkbox"]')[0];
    var checkboxYMD = document.querySelectorAll('.checkbox input[type="checkbox"]')[1];

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
    
    data_load();
    array_porcessing();

    chartYT = echarts.init(document.getElementById('chartYT'));
    chartYMD = echarts.init(document.getElementById('chartYMD'));

    chartYT.setOption(optionYT);
    chartYMD.setOption(optionYMD);

    var creation_time = document.getElementById('creation_time'); 
    creation_time.textContent = "생성시점 : " + formatDateTime(new Date());

    console.log('Fetched Data:', powerData);
}

/////////////////////////////////////////////////////////////////////////////////////////////
/**범위 1시간 간격 배열 생성 함수 */
function generateHourlyTimeArray(startTime, endTime) {
  // 시작 시간과 끝나는 시간을 Date 객체로 변환
  let start = new Date(startTime); 
  const end = new Date(endTime);   
  const timeArray = [];

  // 시작 시간이 끝나는 시간보다 작거나 같은 동안 반복
  while (start <= end) {
      // 배열에 현재 시간을 한국 시간대로 추가
      timeArray.push(
          new Date(start.getTime() + 9 * 60 * 60 * 1000) // 한국 시간대로 변환
              .toISOString()
              .slice(0, 16)
              .replace('T', ' ')
      );
      // 시간을 1시간씩 증가시킴
      start.setHours(start.getHours() + 1);
  }

  return timeArray;
}
/////////////////////////////////////////////////////////////////////////////////////////////
var optionYT_xAxis_Data = [];
var optionYT_series_Data = [];
var chart_start_index, chart_end_index;
function array_porcessing(){
  optionYT_xAxis_Data = generateHourlyTimeArray(startInput.value, endInput.value);
  optionYT_xAxis_Data.forEach(function(time, index){
    var result = null;
    for(var i=0; i<powerData.length; i++){
      if(time===(powerData[i].date + " " + powerData[i].time)){
        result = parseFloat(powerData[i].power);
        break;
      }
    }
    optionYT_series_Data[index] = result;
  });

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
      data: optionYT_xAxis_Data
    },
    yAxis: {
      name: 'W',
      nameLocation: 'end',
      type: 'value'
    },
    series: [
      {
        data: optionYT_series_Data,
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

}
