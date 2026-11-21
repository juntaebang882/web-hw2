// app.js : 영화 데이터 분석 및 함수 구현 / 방준태(26) / 실습과제 #2

// ===== Part A =====
// Part A 변수 이름 뒤에 A를 붙여 Part B 식별자와 이름 충돌 방지[cite: 14]
let sumA = 0;
let maxA = 0;
let count8A = 0;
let d2020A = 0;
let d2010A = 0;
let d2000A = 0;
let dOldA = 0;
let bigA = "";

for (let i = 0; i < titles.length; i++) {
    // A1: 평점 합계 누적
    sumA += ratings[i];

    // A2: 최고 평점 인덱스 갱신
    if (ratings[i] > ratings[maxA]) {
        maxA = i;
    }

    // A3: 8점 이상 영화 수 집계
    if (ratings[i] >= 8) {
        count8A++;
    }

    // A4: 연도대별 영화 수 집계
    const decade = years[i] - (years[i] % 10);
    switch (decade) {
        case 2020:
            d2020A++;
            break;
        case 2010:
            d2010A++;
            break;
        case 2000:
            d2000A++;
            break;
        default:
            dOldA++;
            break;
    }

    // A5: 누적 관객 100만 이상 영화 제목 연결
    if (audiences[i] >= 1000000) {
        bigA += (bigA === "" ? "" : " ") + titles[i];
    }
}

// 100만 이상 영화가 없을 경우 "없음" 처리
if (bigA === "") {
    bigA = "없음";
}

console.log("A1 평균 평점:", sumA / ratings.length);
console.log("A2 최고 평점:", titles[maxA], ratings[maxA]);
console.log("A3 8점 이상:", count8A + "편");
console.log(`A4 2020년대 ${d2020A}편, 2010년대 ${d2010A}편, 2000년대 ${d2000A}편, 그 이전 ${dOldA}편`);
console.log("A5 관객 100만 이상:", bigA);


// ===== Part B =====

// average : 영화 배열 ⇒ 평균 평점(숫자)
function average(list) {
    // 중복 계산 방지를 위해 averageBy를 호출해 재사용[cite: 17, 21]
    return averageBy(list, "rating");
}

// best : 영화 배열 ⇒ 최고 평점 영화 객체
function best(list) {
    let maxObj = list[0];
    for (const m of list) {
        if (m.rating > maxObj.rating) {
            maxObj = m;
        }
    }
    return maxObj;
}

// filterByRating : 영화 배열, 최소 평점(숫자) ⇒ 해당 평점 이상인 새 배열
function filterByRating(list, min) {
    return list.filter(m => m.rating >= min);
}

// sortBy : 영화 배열, 키 이름, 내림차순 여부(불리언) ⇒ 정렬된 새 배열 (원본 불변)
function sortBy(list, key, desc) {
    const sign = desc ? -1 : 1;
    return [...list].sort((a, b) => {
        if (typeof a[key] === "string") {
            return a[key].localeCompare(b[key]) * sign;
        }
        return (a[key] - b[key]) * sign;
    });
}

// search : 영화 배열, 검색어(문자열) ⇒ 제목 부분 일치 새 배열
function search(list, keyword) {
    const q = keyword.trim().toLowerCase();
    return list.filter(m => m.title.toLowerCase().includes(q));
}

// formatNumber : 숫자나 숫자 문자열 ⇒ 천 단위 구분 문자열
function formatNumber(n) {
    return Number(n).toLocaleString("ko-KR");
}

// yearsSince : 날짜 문자열("YYYY-MM-DD") ⇒ 올해 기준 경과 연수(숫자)
function yearsSince(dateStr) {
    return new Date().getFullYear() - new Date(dateStr).getFullYear();
}

// 페이지 <pre id="out">에 요약 3줄 출력
const bestMovie = best(movies);
const topAudienceMovie = sortBy(movies, "audience", true)[0];

const line1 = `전체 ${movies.length}편, 평균 평점 ${average(movies).toFixed(1)}점`;
const line2 = `최고 평점 ${bestMovie.title} (${bestMovie.rating}점, 개봉한 지 ${yearsSince(bestMovie.date)}년)`;
const line3 = `관객 1위 ${topAudienceMovie.title} (누적 ${formatNumber(topAudienceMovie.audience)}명)`;

document.getElementById("out").textContent = `${line1}\n${line2}\n${line3}`;


// ===== Part C =====

// getList : TMDB 응답 객체 ⇒ 영화 배열
function getList(data) {
    return data.results;
}

// averageBy : 영화 배열, 키 이름 ⇒ 해당 키 값의 평균(숫자, reduce 활용)
function averageBy(list, key) {
    if (list.length === 0) return 0;
    const total = list.reduce((acc, item) => acc + item[key], 0);
    return total / list.length;
}

const nowPlayingList = getList(TMDB);

// C1: 페이지 정보와 현재 응답 영화 수 출력
console.log(`C1 page ${TMDB.page}, total_pages ${TMDB.total_pages}, total_results ${TMDB.total_results}, 이번 응답 ${nowPlayingList.length}편`);

// C2: 상영작 평균 평점 출력
console.log("C2 상영작 평균 평점:", averageBy(nowPlayingList, "vote_average").toFixed(1));

// C3: 평점 상위 5편 표 출력
console.table(
    sortBy(nowPlayingList, "vote_average", true).slice(0, 5),
    ["title", "release_date", "vote_average"]
);

// C4: 제목 일부 검색 결과 개수 출력 (실제 응답에 포함된 제목 단어로 확인)
const searchKeywordC = "인터스텔라";
console.log(`C4 '${searchKeywordC}' 검색:`, search(nowPlayingList, searchKeywordC).length + "편");


// ===== Step 5. 보너스 =====

// formatDate : 날짜 문자열("YYYY-MM-DD") ⇒ "YYYY년 M월 D일 (요일)" 문자열
function formatDate(dateStr) {
    const d = new Date(dateStr);
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    const dayName = days[d.getDay()];
    return `${year}년 ${month}월 ${date}일 (${dayName})`;
}
console.log("보너스 날짜 형식:", formatDate("2014-11-06"));

// loadJson : tmdb.json 비동기 조회 ⇒ 콘솔에 평점 상위 5편 표 출력
async function loadJson() {
    try {
        const res = await fetch("tmdb.json");
        const data = await res.json();
        console.table(sortBy(getList(data), "vote_average", true).slice(0, 5), ["title", "vote_average"]);
    } catch (err) {
        console.warn("tmdb.json 로드 안내 (Live Server 또는 GitHub Pages에서 확인):", err.message);
    }
}
loadJson();
