/**
 * 1. 전체 시스템 구축 메인 함수
 * 이 함수를 실행하면 '질문관리'와 '응답결과(데이터 50행 포함)' 시트가 한 번에 생성됩니다.
 */
function setupFullSurveySystem() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // --- [Step 1] 질문관리 시트 세팅 ---
  var sheet1 = ss.getSheetByName('질문관리') || ss.insertSheet('질문관리');
  sheet1.clear(); // 기존 내용 초기화
  
  var headers1 = ['문항번호', '질문내용', '질문유형', '선택지'];
  sheet1.appendRow(headers1);

  var questions = [
    [1, '귀하의 연령대는 어떻게 되십니까?', 'radio', '10대, 20대, 30대, 40대, 50대 이상'],
    [2, '귀하의 성별은 무엇입니까?', 'radio', '여성, 남성, 선택하지 않음'],
    [3, '현재 가장 신경 쓰이는 피부 고민은 무엇입니까? (다중 선택)', 'checkbox', '여드름 및 트러블, 모공 및 피지, 건조함 및 속당김, 주름 및 탄력 저하, 색소 침착, 피부 톤 및 결 개선'],
    [4, '평소 피부과나 에스테틱을 얼마나 자주 방문하시나요?', 'radio', '전혀 방문하지 않음, 1년에 1~2회, 2~3개월에 1회, 한 달에 1회, 한 달에 2회 이상'],
    [5, '홈케어를 선호하거나 병행하시는 주된 이유는 무엇인가요?', 'radio', '비용 부담, 시간 부족, 홈케어 만족, 영업 부담, 스스로 관리 편함, 해당 없음'],
    [6, '사용 중인 스킨케어/뷰티 디바이스 브랜드가 있다면 적어주세요.', 'text', ''],
    [7, '가장 집중적으로 관리받고 싶은 부위는 어디인가요?', 'checkbox', '얼굴 전체, 국소 부위, 목, 바디 트러블, 두피 및 헤어라인'],
    [8, '이상적인 에스테틱 방문 횟수는?', 'radio', '한 달에 1회, 한 달에 2회 (격주), 한 달에 4회 (매주), 기타'],
    [9, '한 달 피부 관리 최대 지출 비용은?', 'radio', '5만 원 미만, 5~10만 원, 10~20만 원, 20~30만 원, 30만 원 이상'],
    [10, '적절하다고 생각하는 1회당 관리 비용은?', 'radio', '3만 원 미만, 3~5만 원, 5~8만 원, 8~12만 원, 12만 원 이상'],
    [11, '에스테틱 선택 시 가장 중요한 요소는?', 'radio', '합리적 가격, 접근성, 고객 후기, 관리사 전문성, 맞춤 상담 및 시설'],
    [12, '기타 건의사항이나 어려운 점을 적어주세요.', 'text', '']
  ];
  sheet1.getRange(2, 1, questions.length, 4).setValues(questions);
  sheet1.getRange('A1:D1').setBackground('#E2EFDA').setFontWeight('bold').setHorizontalAlignment('center');

  // --- [Step 2] 응답결과 시트 세팅 및 데이터 생성 ---
  var sheet2 = ss.getSheetByName('응답결과') || ss.insertSheet('응답결과');
  sheet2.clear();
  
  var headers2 = ['식별자(연락처)'];
  for (var i = 1; i <= 12; i++) { headers2.push(i + '번 응답'); }
  sheet2.appendRow(headers2);
  sheet2.getRange(1, 1, 1, 13).setBackground('#DDEBF7').setFontWeight('bold').setHorizontalAlignment('center');

  // 가상 데이터 50행 생성 로직
  var sampleData = [];
  var options = {
    q1: ['10대', '20대', '30대', '40대', '50대 이상'],
    q2: ['여성', '남성', '선택하지 않음'],
    q3: ['여드름 및 트러블', '모공 및 피지', '건조함 및 속당김', '주름 및 탄력 저하', '색소 침착', '피부 톤 및 결 개선'],
    q4: ['전혀 방문하지 않음', '1년에 1~2회', '2~3개월에 1회', '한 달에 1회', '한 달에 2회 이상'],
    q5: ['비용 부담', '시간 부족', '홈케어 만족', '영업 부담', '스스로 관리 편함', '해당 없음'],
    q7: ['얼굴 전체', '국소 부위', '목', '바디 트러블', '두피'],
    q8: ['한 달에 1회', '한 달에 2회 (격주)', '한 달에 4회 (매주)', '기타'],
    q9: ['5만 원 미만', '5~10만 원', '10~20만 원', '20~30만 원', '30만 원 이상'],
    q10: ['3만 원 미만', '3~5만 원', '5~8만 원', '8~12만 원', '12만 원 이상'],
    q11: ['합리적 가격', '접근성', '고객 후기', '관리사 전문성', '맞춤 상담 및 시설']
  };

  for (var j = 0; j < 500; j++) {
    var row = [
      '010-' + (Math.floor(Math.random() * 9000) + 1000) + '-' + (Math.floor(Math.random() * 9000) + 1000), // 식별자
      getRandom(options.q1), getRandom(options.q2), getRandomMulti(options.q3, 2),
      getRandom(options.q4), getRandom(options.q5), '브랜드_' + (j % 5),
      getRandomMulti(options.q7, 1), getRandom(options.q8), getRandom(options.q9),
      getRandom(options.q10), getRandom(options.q11), '피부 관리 의견_' + j
    ];
    sampleData.push(row);
  }
  sheet2.getRange(2, 1, 500, 13).setValues(sampleData);
  
  // 틀 고정 및 눈금선 정리
  sheet1.setFrozenRows(1);
  sheet2.setFrozenRows(1);
  
  Logger.log('✅ 시트 구축 및 샘플 데이터 50행 생성 완료!');
}

// 헬퍼 함수: 랜덤 단일 선택
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 헬퍼 함수: 랜덤 다중 선택 (쉼표 구분)
function getRandomMulti(arr, count) {
  var shuffled = arr.slice().sort(function() { return 0.5 - Math.random() });
  return shuffled.slice(0, count).join(', ');
}