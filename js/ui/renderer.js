/**
 * renderer.js
 * 화면 그리기 (사이드바, 문제 카드, 결과창 등)
 */

// 1. 사이드바 학년/과목별 단원 리스트 생성
function buildSubList(grade) {
    const subjects = window.GRADE_UNITS[grade];
    const subjCont = document.getElementById('subjG');
    if(!subjCont) return;

    subjCont.innerHTML = '';
    subjects.forEach((subj, si) => {
        const sb = document.createElement('button');
        sb.className = 'grade-tab' + (si === 0 ? ' on' : '');
        sb.textContent = subj.subject;
        sb.dataset.si = si;
        sb.onclick = () => {
            document.querySelectorAll('#subjG .grade-tab').forEach(x => x.classList.remove('on'));
            sb.classList.add('on');
            buildUnitButtons(grade, si);
        };
        subjCont.appendChild(sb);
    });
    buildUnitButtons(grade, 0);
}

// 2. 단원 선택 버튼들 생성
function buildUnitButtons(grade, subjIdx) {
    const subj = window.GRADE_UNITS[grade][subjIdx];
    const cont = document.getElementById('subG');
    if(!cont) return;

    cont.innerHTML = '';
    subj.units.forEach((u, i) => {
        const b = document.createElement('button');
        b.className = 'sub-btn' + (i === 0 ? ' on' : '');
        b.dataset.v = u.v;
        b.innerHTML = `${u.v}<div class="sd">${u.d}</div>`;
        b.onclick = () => {
            document.querySelectorAll('#subG .sub-btn').forEach(x => x.classList.remove('on'));
            b.classList.add('on');
            window.st.sub = u.v; // 현재 선택된 단어 상태 업데이트
        };
        cont.appendChild(b);
    });
    window.st.sub = subj.units[0].v;
}

// 3. 문제 카드 하나를 화면에 그리기
function renderCard(idx) {
    const p = window.problems[idx];
    const card = document.createElement('div');
    card.className = 'pcard';
    card.innerHTML = `
        <div class="cnum">PROBLEM ${idx + 1}</div>
        <div class="card-q">${p.question}</div>
        <div class="choices" id="cho-${idx}"></div>
    `;
    
    // 객관식 선택지 생성
    if (p.choices && p.choices.length > 0) {
        const cCont = card.querySelector('.choices');
        p.choices.forEach((c, ci) => {
            const btn = document.createElement('div');
            btn.className = 'cho';
            btn.innerHTML = `<span class="cn">${ci + 1}</span> ${c}`;
            btn.onclick = () => selectChoice(idx, ci);
            cCont.appendChild(btn);
        });
    }
    
    document.getElementById('cp').appendChild(card);
    // 수식 렌더링 (KaTeX 적용)
    if(window.rm) window.rm(card);
}

// 초기 호출 (고1 기본 설정)
document.addEventListener('DOMContentLoaded', () => {
    if(window.GRADE_UNITS) buildSubList('고1');
});
