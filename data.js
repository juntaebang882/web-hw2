// data.js : 영화 배열 및 객체 데이터 / 방준태(26) / 실습과제 #2

// ===== Part A : 10칸짜리 배열 4개 (내 영화 5편 + 박스오피스 5편) =====
const titles = [
    "인터스텔라", "신세계", "크로우즈제로", "크로우즈제로2", "하이앤로우",
    "박스오피스 1위 영화", "박스오피스 2위 영화", "박스오피스 3위 영화", "박스오피스 4위 영화", "박스오피스 5위 영화"
];

const ratings = [
    8.4, 7.9, 7.4, 7.3, 8.4,
    7.8, 8.1, 6.9, 7.5, 8.0
];

const years = [
    2014, 2013, 2007, 2009, 2016,
    2026, 2026, 2026, 2026, 2026
];

// 누적 관객 수 (내 영화 5편은 0, KOBIS 관객 수는 따옴표 없이 숫자로 입력)
const audiences = [
    0, 0, 0, 0, 0,
    2345678, 1540000, 890000, 450000, 210000
];

// ===== Part B : 영화 객체 10건 (Part A와 같은 순서, 키 8개) =====
const movies = [
    {
        title: "인터스텔라",
        year: 2014,
        date: "2014-11-06",
        rating: 8.4,
        audience: 0,
        poster: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        type: "mine",
        rank: null
    },
    {
        title: "신세계",
        year: 2013,
        date: "2013-02-21",
        rating: 7.9,
        audience: 0,
        poster: "/pvgTrpTHremKUjadVbvtQM73Vi8.jpg",
        type: "mine",
        rank: null
    },
    {
        title: "크로우즈제로",
        year: 2007,
        date: "2007-10-27",
        rating: 7.4,
        audience: 0,
        poster: "/v9vzQvfoWYwPexviVEzFvQx8Uto.jpg",
        type: "mine",
        rank: null
    },
    {
        title: "크로우즈제로2",
        year: 2009,
        date: "2009-04-11",
        rating: 7.3,
        audience: 0,
        poster: "/8Y8bZRspysP4LBQ7yxrRy2ijkdt.jpg",
        type: "mine",
        rank: null
    },
    {
        title: "하이앤로우",
        year: 2016,
        date: "2016-07-16",
        rating: 8.4,
        audience: 0,
        poster: "/xXEMnx0uhHT2wbATl7Gdjb0URJq.jpg",
        type: "mine",
        rank: null
    },
    {
        title: "박스오피스 1위 영화",
        year: 2026,
        date: "2026-05-20",
        rating: 7.8,
        audience: 2345678,
        poster: "/hDPGsJxo8xX0OyqcMB8xI3RdaF3.jpg",
        type: "boxoffice",
        rank: 1
    },
    {
        title: "박스오피스 2위 영화",
        year: 2026,
        date: "2026-05-27",
        rating: 8.1,
        audience: 1540000,
        poster: null,
        type: "boxoffice",
        rank: 2
    },
    {
        title: "박스오피스 3위 영화",
        year: 2026,
        date: "2026-06-03",
        rating: 6.9,
        audience: 890000,
        poster: null,
        type: "boxoffice",
        rank: 3
    },
    {
        title: "박스오피스 4위 영화",
        year: 2026,
        date: "2026-06-05",
        rating: 7.5,
        audience: 450000,
        poster: null,
        type: "boxoffice",
        rank: 4
    },
    {
        title: "박스오피스 5위 영화",
        year: 2026,
        date: "2026-06-10",
        rating: 8.0,
        audience: 210000,
        poster: null,
        type: "boxoffice",
        rank: 5
    }
];
