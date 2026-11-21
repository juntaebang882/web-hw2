// app.js : 영화 데이터 분석 및 함수 구현 / 방준태(26) / 실습과제 #2

let sumA = 0;
let maxA = 0;
let count8A = 0;
let d2020A = 0;
let d2010A = 0;
let d2000A = 0;
let dOldA = 0;
let bigA = "";

for (let i = 0; i < titles.length; i++) {
    sumA += ratings[i];

    if (ratings[i] > ratings[maxA]) {
        maxA = i;
    }

    if (ratings[i] >= 8) {
        count8A++;
    }

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

    if (audiences[i] >= 1000000) {
        bigA += (bigA === "" ? "" : " ") + titles[i];
    }
}

if (bigA === "") {
    bigA = "없음";
}

console.log("A1 평균 평점:", sumA / ratings.length);
console.log("A2 최고 평점:", titles[maxA], ratings[maxA]);
console.log("A3 8점 이상:", count8A + "편");
console.log(`A4 2020년대 ${d2020A}편, 2010년대 ${d2010A}편, 2000년대 ${d2000A}편, 그 이전 ${dOldA}편`);
console.log("A5 관객 100만 이상:", bigA);

function average(list) {
    return averageBy(list, "rating");
}

function best(list) {
    let maxObj = list[0];
    for (const m of list) {
        if (m.rating > maxObj.rating) {
            maxObj = m;
        }
    }
    return maxObj;
}

function filterByRating(list, min) {
    return list.filter(m => m.rating >= min);
}

function sortBy(list, key, desc) {
    const sign = desc ? -1 : 1;
    return [...list].sort((a, b) => {
        if (typeof a[key] === "string") {
            return a[key].localeCompare(b[key]) * sign;
        }
        return (a[key] - b[key]) * sign;
    });
}

function search(list, keyword) {
    const q = keyword.trim().toLowerCase();
    return list.filter(m => m.title.toLowerCase().includes(q));
}

function formatNumber(n) {
    return Number(n).toLocaleString("ko-KR");
}

function yearsSince(dateStr) {
    return new Date().getFullYear() - new Date(dateStr).getFullYear();
}

const bestMovie = best(movies);
const topAudienceMovie = sortBy(movies, "audience", true)[0];

const line1 = `전체 ${movies.length}편, 평균 평점 ${average(movies).toFixed(1)}점`;
const line2 = `최고 평점 ${bestMovie.title} (${bestMovie.rating}점, 개봉한 지 ${yearsSince(bestMovie.date)}년)`;
const line3 = `관객 1위 ${topAudienceMovie.title} (누적 ${formatNumber(topAudienceMovie.audience)}명)`;

document.getElementById("out").textContent = `${line1}\n${line2}\n${line3}`;

function getList(data) {
    return data.results;
}

function averageBy(list, key) {
    if (list.length === 0) return 0;
    const total = list.reduce((acc, item) => acc + item[key], 0);
    return total / list.length;
}

const nowPlayingList = getList(TMDB);

console.log(`C1 page ${TMDB.page}, total_pages ${TMDB.total_pages}, total_results ${TMDB.total_results}, 이번 응답 ${nowPlayingList.length}편`);
console.log("C2 상영작 평균 평점:", averageBy(nowPlayingList, "vote_average").toFixed(1));
console.table(
    sortBy(nowPlayingList, "vote_average", true).slice(0, 5),
    ["title", "release_date", "vote_average"]
);

const searchKeywordC = "인터스텔라";
console.log(`C4 '${searchKeywordC}' 검색:`, search(nowPlayingList, searchKeywordC).length + "편");

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

async function loadJson() {
    try {
        const res = await fetch("tmdb.json");
        const data = await res.json();
        console.table(sortBy(getList(data), "vote_average", true).slice(0, 5), ["title", "vote_average"]);
    } catch (err) {
        console.warn("tmdb.json 로드 안내:", err.message);
    }
}

loadJson();
