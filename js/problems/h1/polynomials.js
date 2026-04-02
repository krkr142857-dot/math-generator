/**
 * js/problems/h1/polynomials.js
 * 고등학교 1학년 - 다항식 (연산, 나머지정리, 인수분해)
 */

const POLYNOMIAL_GENS = {
    // [Lv1] 다항식의 덧셈과 뺄셈
    1: [
        () => {
            const a = Math.floor(Math.random() * 5) + 2;
            const b = Math.floor(Math.random() * 5) + 1;
            return {
                type: ["객관식", "단답형", "서술형"],
                q: `$A = x^2 + ${a}x, B = 2x^2 - ${b}$일 때, $2A - B$를 구하시오.`,
                ans: `$${2-2}x^2 + ${a*2}x + ${b}$`,
                sa: `${a*2}x+${b}`,
                sol: `$2(x^2 + ${a}x) - (2x^2 - ${b}) = 2x^2 + ${a*2}x - 2x^2 + ${b} = ${a*2}x + ${b}$`,
                hints: ["먼저 2A를 계산한 뒤 B를 빼세요."],
                terms: "다항식의 연산",
                std: "[10공수01-01]"
            };
        }
    ],
    // [Lv2] 곱셈 공식 (기본)
    2: [
        () => {
            const a = Math.floor(Math.random() * 5) + 1;
            return {
                type: ["객관식", "단답형"],
                q: `$(x + ${a})^2$을 전개했을 때, $x$의 계수를 구하시오.`,
                ans: `$${a*2}$`,
                sa: `${a*2}`,
                sol: `$(x + ${a})^2 = x^2 + ${a*2}x + ${a*a}$이므로 $x$의 계수는 ${a*2}입니다.`,
                hints: ["$(a+b)^2 = a^2 + 2ab + b^2$"],
                terms: "곱셈 공식",
                std: "[10공수01-02]"
            };
        }
    ],
    // [Lv3] 나머지 정리 (기초)
    3: [
        () => {
            const a = Math.floor(Math.random() * 3) + 1;
            const r = Math.floor(Math.random() * 10) + 1;
            return {
                type: ["객관식", "단답형", "서술형"],
                q: `$f(x) = x^2 + ax + 1$을 $x - ${a}$로 나누었을 때 나머지가 ${r}이다. 상수 $a$의 값을 구하시오.`,
                ans: `$a = ${(r - 1 - a*a)/a}$`,
                sa: `${(r - 1 - a*a)/a}`,
                sol: `나머지 정리에 의해 $f(${a}) = ${a}^2 + ${a}a + 1 = ${r}$입니다.`,
                hints: ["$f(k)$가 $x-k$로 나눈 나머지입니다."],
                terms: "나머지 정리",
                std: "[10공수01-03]"
            };
        }
    ]
    // Lv4, Lv5 문제들도 이런 식으로 이 파일에만 계속 추가하면 됩니다!
};

// 고1 문제 은행의 '다항식' 칸에 등록
if (!window.RAND_GENS) window.RAND_GENS = {};
if (!window.RAND_GENS["고1"]) window.RAND_GENS["고1"] = {};
window.RAND_GENS["고1"]["다항식"] = POLYNOMIAL_GENS;
