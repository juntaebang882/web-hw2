# 실습과제 #2: 영화 데이터를 자바스크립트로

- 이름/학번 : 방준태 / 26
- 사이트 주소 : https://아이디.github.io/web-hw2/
- 사용한 API: TMDB (영화 정보, now_playing 응답), KOBIS 일별 박스오피스 (기준일 2026-06-14)

## 구현 항목 체크
- [o] 1. Part A: data.js에 10칸짜리 배열 4개, app.js에서 A1~A5 콘솔 출력 (`console-a.png`)
- [o] 2. Part B 함수 7개: movies 10건(키 8개), 함수 7개 구현 및 원본 불변, 자가 테스트 통과
- [o] 3. Part C 응답 구조: tmdb.js에 now_playing 응답 저장, getList/averageBy 및 C1~C4·표 출력 (`console-c.png`)
- [o] 4. 출력: 캡처 2장 및 페이지 `<pre id="out">` 요약 3줄 출력
- [o] 5. 코드 품질: 함수별 입출력 주석, const/let 사용, 원본 불변, average의 averageBy 재사용
- [o] 6. 제출 형식: Public 저장소 web-hw2 루트 배치, Pages 활성화, API 키 미포함
- [o] 보너스 1: reduce로 평균 계산
- [o] 보너스 2: formatDate 요일 표시
- [o] 보너스 3: fetch로 tmdb.json 읽기 (`bonus.png`)

## 자가 테스트 표

| 번호 | 호출 | 기대 결과 | 실제 결과 |
|---|---|---|---|
| 1 | `formatNumber("1234567")` | `'1,234,567'` | `'1,234,567'` |
| 2 | `average(movies).toFixed(1)` | `'7.8'` (내 데이터 평균 소수 1자리) | |
| 3 | `best(movies).title` | `'인터스텔라'` (A2와 같은 제목) | |
| 4 | `sortBy(movies, "rating", true)[0].title` | `'인터스텔라'` (3번과 같은 제목) | |
| 5 | `filterByRating(movies, 8).length` | `4` (A3와 같은 개수) | |
| 6 | `search(movies, "인터 ").length` | `1` | |
| 7 | `yearsSince("2014-11-06")` | `12` (2026년 기준) | |
| 8 | 4번 실행 뒤 `movies[0].title` | `'인터스텔라'` (data.js 첫 영화 그대로) | |

## 어려웠던 점 3가지와 해결
1. **원본 배열 불변 유지**: `sort()` 메서드를 원본 배열에 바로 호출하면 이후 계산이 틀어지는 문제가 있어 `[...list].sort(...)` 형태로 얕은 복사 후 정렬하도록 해결했습니다.
2. **문자열과 숫자 정렬 구분**: `sortBy` 함수에서 숫자 필드는 뺄셈 연산을, 제목 등 문자열 필드는 `typeof a[key] === "string"` 조건을 통해 `localeCompare`로 비교하도록 분리해 해결했습니다.
3. **TMDB와 KOBIS의 키 이름 차이**: TMDB 응답의 평점 키가 `vote_average`라서 기존 `average` 함수를 범용적인 `averageBy(list, key)`로 분리하고 재사용하도록 리팩토링했습니다.

## 참고한 자료
- 웹개발기초 교재 8~11장 (변수, 반복문, 함수, 객체, 표준 내장 객체)
- MDN Web Docs: `Array.prototype.sort()`, `Array.prototype.reduce()`, `String.prototype.localeCompare()`, `Number.prototype.toLocaleString()`

## 생성형 AI 사용 내역
- 질문 요지 : 실습과제 #2 안내서(Part A, B, C 및 보너스)의 요구사항과 기존 영화 데이터를 반영한 전체 코드 구조 작성 요청
- 답변 요약 : `index.html`, `data.js`, `tmdb.js`, `app.js`, `README.md`의 전체 코드와 자가 테스트 표 템플릿을 제공받음
- 채택 여부 : 채택 (내 데이터 및 실제 TMDB/KOBIS 응답 데이터를 반영하여 검증 후 적용)
