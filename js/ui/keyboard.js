/**
 * keyboard.js
 * 가상 수식 키보드 설정 및 입력 로직
 */

// 1. 키보드 버튼 구성 (레이아웃)
const MKB = [
    [{l:'q',v:'q'},{l:'w',v:'w'},{l:'e',v:'e'},{l:'r',v:'r'},{l:'t',v:'t'},{l:'y',v:'y'},{l:'u',v:'u'},{l:'i',v:'i'},{l:'o',v:'o'},{l:'p',v:'p'}],
    [{l:'a',v:'a'},{l:'s',v:'s'},{l:'d',v:'d'},{l:'f',v:'f'},{l:'g',v:'g'},{l:'h',v:'h'},{l:'j',v:'j'},{l:'k',v:'k'},{l:'l',v:'l'},{l:'z',v:'z'}],
    [{l:'x',v:'x'},{l:'c',v:'c'},{l:'v',v:'v'},{l:'b',v:'b'},{l:'n',v:'n'},{l:'m',v:'m'},{l:'π',v:'\\pi '},{l:'i',v:'i'},{l:'(',v:'('},{l:')',v:')'}],
    [{l:'7',v:'7'},{l:'8',v:'8'},{l:'9',v:'9'},{l:'+',v:'+'},{l:'−',v:'-'},{l:'x²',v:'^2'},{l:'xⁿ',v:'^{}'},{l:'√',v:'\\sqrt{}'},{l:'|x|',v:'|{}|'},{l:'↵',v:'\n'}],
    [{l:'4',v:'4'},{l:'5',v:'5'},{l:'6',v:'6'},{l:'×',v:'\\times'},{l:'÷',v:'\\div'},{l:'sin',v:'\\sin('},{l:'cos',v:'\\cos('},{l:'tan',v:'\\tan('},{l:'log',v:'\\log('},{l:'ln',v:'\\ln('}],
    [{l:'1',v:'1'},{l:'2',v:'2'},{l:'3',v:'3'},{l:'=',v:'='},{l:',',v:','},{l:'lim',v:'\\lim_{x\\to}'},{l:'Σ',v:'\\sum_{k=1}^{}'},{l:'∫',v:'\\int '},{l:'∞',v:'\\infty'},{l:'⌫',act:'back'}],
    [{l:'0',v:'0'},{l:'.',v:'.'},{l:'[a b]',v:'\\begin{pmatrix} & \\end{pmatrix}'},{l:'CLR',act:'clear'}]
];

// 2. 키보드 화면에 그리기 및 이벤트 연결
(function initKeyboard() {
    const grid = document.getElementById('mkGrid');
    if (!grid) return;

    MKB.forEach(row => row.forEach(btn => {
        const b = document.createElement('button');
        b.className = 'mkb';
        b.textContent = btn.l;
        if (btn.act) b.dataset.act = btn.act;
        else b.dataset.val = btn.v;
        grid.appendChild(b);
    }));

    grid.onclick = (e) => {
        const btn = e.target.closest('.mkb');
        if (!btn) return;
        if (btn.dataset.act === 'back') mkBack();
        else if (btn.dataset.act === 'clear') mkClear();
        else if (btn.dataset.val) mkInsert(btn.dataset.val);
    };

    // 키보드 열기/닫기 토글
    const toggle = document.getElementById('kbToggle');
    const area = document.getElementById('kbArea');
    if (toggle && area) {
        toggle.onclick = () => {
            area.classList.toggle('open');
            toggle.classList.toggle('on');
        };
    }
})();

// 3. 수식 입력 기능들
const mkInputEl = document.getElementById('mkInput');
const mkRenderedEl = document.getElementById('mkRendered');

function mkUpdate() {
    const v = mkInputEl.value;
    if (!v.trim()) { mkRenderedEl.innerHTML = '<span class="mk-ph">수식 미리보기</span>'; return; }
    // 미리보기 화면에 수식 렌더링
    mkRenderedEl.innerHTML = v; 
    if(window.rm) window.rm(mkRenderedEl);
}

function mkInsert(t) {
    const ta = mkInputEl;
    const s = ta.selectionStart, e = ta.selectionEnd;
    ta.value = ta.value.slice(0, s) + t + ta.value.slice(e);
    ta.focus();
    mkUpdate();
}

function mkBack() {
    mkInputEl.value = mkInputEl.value.slice(0, -1);
    mkUpdate();
}

function mkClear() {
    mkInputEl.value = '';
    mkUpdate();
}

if(mkInputEl) mkInputEl.oninput = mkUpdate;
