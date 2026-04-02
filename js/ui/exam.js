/**
 * exam.js
 * 시험 모드(타이머, 채점) 및 단원 혼합 출제 로직
 */

let examTimer = null;
let examSeconds = 0;
let mixMode = false;
let mixSubs = new Set();

// 1. 시험 모드 토글 (켜기/끄기)
const examBtn = document.getElementById('examBtn');
if (examBtn) {
    examBtn.onclick = () => {
        window.st.examMode = !window.st.examMode;
        examBtn.classList.toggle('on');
        
        if (window.st.examMode) {
            examBtn.textContent = '시험 종료 (제출)';
            startExam();
        } else {
            examBtn.textContent = '시험 모드 (타이머)';
            finishExam();
        }
    };
}

// 2. 시험 시작 (타이머 작동)
function startExam() {
    examSeconds = 0;
    // 기존에 출력된 문제들 초기화 (필요 시)
    // document.getElementById('cp').innerHTML = '';
    
    examTimer = setInterval(() => {
        examSeconds++;
        updateTimerDisplay();
    }, 1000);
}

// 3. 타이머 화면 업데이트
function updateTimerDisplay() {
    const min = Math.floor(examSeconds / 60);
    const sec = examSeconds % 60;
    const timeStr = `${min}:${sec < 10 ? '0' : ''}${sec}`;
    
    // 헤더나 특정 위치에 시간 표시 (index.html에 관련 요소가 있다고 가정)
    const timerEl = document.getElementById('examTimerDisplay');
    if (timerEl) timerEl.textContent = timeStr;
}

// 4. 시험 종료 및 전체 채점
function finishExam() {
    clearInterval(examTimer);
    alert('시험이 종료되었습니다. 전체 결과를 확인합니다.');
    
    // 전체 문제 채점 로직 호출
    window.problems.forEach((p, idx) => {
        // doSubmit(idx) 같은 함수를 호출하여 전체 채점 진행
    });
}

// 5. 단원 혼합 출제 로직
const mixBtn = document.getElementById('mixBtn');
if (mixBtn) {
    mixBtn.onclick = () => {
        mixMode = !mixMode;
        mixBtn.classList.toggle('on');
        mixBtn.textContent = mixMode ? '혼합 모드 해제' : '단원 혼합 출제';
        
        if (mixMode) {
            alert('여러 단원을 동시에 선택할 수 있습니다. 단원을 선택한 후 [문제 생성]을 누르세요.');
        } else {
            mixSubs.clear();
        }
    };
}

// 외부 노출
window.startExam = startExam;
window.finishExam = finishExam;
