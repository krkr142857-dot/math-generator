/**
 * utils.js
 * 수학 수식 보정, 렌더링 지원, 채점 로직 등 공통 도구
 */

// 1. 수식 표시용 오타 보정 함수
function normalizeKaTeXDisplayText(s) {
    if (s === null || s === undefined) return '';
    let r = String(s);
    r = r.replace(/;\s*<-\s*/g, '');
    r = r.replace(/(^|[^\\])dfrac\s*\{/g, (m, p1) => p1 + '\\dfrac{');
    r = r.replace(/(^|[^\\])int\s*<-\s*/g, (m, p1) => p1 + '\\int ');
    r = r.replace(/(^|[^\\])\*\s*/g, (m, p1) => p1 + '\\cdot ');
    r = r.replace(/x\^(\d+|\{[^}]+\})x(?!\^)/g, 'x^$1\\cdot x');
    r = r.replace(/(^|[^\\])cdot\b/g, (m, p1) => p1 + '\\cdot ');
    return r;
}

// 2. 단답형 채점을 위한 문자열 정규화 (공백 제거, 대소문자 통일 등)
function norm(s) {
    return (s || '')
        .replace(/;\s*<-\s*/g, '')
        .replace(/\$/g, '')
        .replace(/\s+/g, '')
        .replace(/\\cdot|\\times|×|\*/g, '')
        .replace(/\\sqrt\{([^}]+)\}/g, 'sqrt($1)')
        .replace(/\\dfrac\{([^}]*)\}\{([^}]*)\}/g, '($1)/($2)')
        .replace(/\^{(\w+)}/g, '^$1')
        .toLowerCase();
}

// 3. 단답형 유사도 채점 (분수, 소수 등 유연한 판정)
function fuzzyMatch(userAns, correctSa) {
    if (!userAns || !correctSa) return false;
    const n1 = norm(userAns), n2 = norm(correctSa);
    if (n1 === n2) return true;
    
    const toNum = s => {
        s = String(s).replace(/[()]/g, '');
        const frac = s.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
        if (frac) return parseFloat(frac[1]) / parseFloat(frac[2]);
        const v = parseFloat(s.replace(/[^0-9.\-]/g, ''));
        return isNaN(v) ? NaN : v;
    };

    const v1 = toNum(n1), v2 = toNum(n2);
    if (!isNaN(v1) && !isNaN(v2) && Math.abs(v1 - v2) < 0.01) return true;
    return false;
}

// 4. KaTeX 수식 자동 렌더링 함수
function rm(el) {
    if (typeof renderMathInElement === 'function') {
        renderMathInElement(el, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false }
            ],
            throwOnError: false
        });
    }
}

// 외부 노출
window.normalizeKaTeXDisplayText = normalizeKaTeXDisplayText;
window.fuzzyMatch = fuzzyMatch;
window.rm = rm;
