/**
 * state.js
 * 프로그램의 현재 상태 (변수) 관리
 */

// 1. 현재 설정 상태 (학년, 단원, 난이도, 문제 수 등)
const st = {
    grade: "고1",
    sub: "다항식",
    lv: 2,
    lvL: "기본",
    type: "OX형",
    cnt: 3
};

// 2. 문제 및 점수 관련 변수들
let problems = [];   // 생성된 문제들이 담기는 리스트
let pst = [];        // 정답 여부 등 문제 상태 정보
let selIdx = -1;     // 현재 클릭해서 보고 있는 문제 번호
let apiKey = "";     // AI 채점용 API 키

// 3. 테마(다크/라이트 모드) 관리 로직
const themeBtn = document.getElementById('themeBtn');
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const doc = document.documentElement;
        const isDark = doc.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        
        doc.setAttribute('data-theme', newTheme);
        themeBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        
        // 브라우저에 테마 설정 저장
        localStorage.setItem('math_theme', newTheme);
    });
}

// 저장된 테마 불러오기
const savedTheme = localStorage.getItem('math_theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if(themeBtn) themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

// 다른 파일에서 접근 가능하도록 외부에 노출
window.st = st;
window.problems = problems;
window.pst = pst;
