
// ── 챔피언 데이터 ─────────────────────────
const CHAMPIONS = [
    { name: '아트록스', engName: 'Aatrox', role: '전사', lane: '탑', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Aatrox.png', difficulty: '상' },
    { name: '사일러스', engName: 'Sylas', role: '마법사', lane: '정글/미드', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Sylas.png', difficulty: '중' },
    { name: '애니비아', engName: 'Anivia', role: '마법사', lane: '미드', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Anivia.png', difficulty: '상' },
    { name: '브라이어', engName: 'Briar', role: '전사', lane: '정글', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Briar.png', difficulty: '중' }
];

// ── 뉴스 데이터 ─────────────────────────
const NEWS = [
    { title: '새로운 챔피언 출시', desc: '신규 챔피언 등장!', category: '업데이트' }
];

// ── 검색 함수 ─────────────────────────
function performSearch(query) {
    console.log("검색 실행:", query);

    const q = query.trim().toLowerCase();
    if (!q) return;

    document.getElementById('searchKeywordDisplay').textContent = `"${query}"`;

    // 챔피언 검색
    const champResults = CHAMPIONS.filter(c =>
        c.name.includes(q) ||
        c.engName.toLowerCase().includes(q)
    );

    // 뉴스 검색
    const newsResults = NEWS.filter(n =>
        n.title.toLowerCase().includes(q)
    );

// 개수 표시
document.getElementById('champCount').textContent = `(${champResults.length})`;
document.getElementById('newsCount').textContent = `(${newsResults.length})`;

    // 결과 출력
    const champList = document.getElementById('championResultList');
champList.innerHTML = champResults.map(c => `
    <div style="
        display:flex;
        align-items:center;
        gap:12px;
        padding:12px;
        margin-bottom:10px;
        border:1px solid #ddd;
        border-radius:10px;
        background:#fff;
    ">
        <img src="${c.img}" width="60">

        <div>
            <div style="font-weight:bold;">
                ${c.name} (${c.engName})
            </div>

            <div style="font-size:12px; color:gray;">
                역할: ${c.role} | 라인: ${c.lane} | 난이도: ${c.difficulty}
            </div>
        </div>
    </div>
`).join('');

    const newsList = document.getElementById('newsResultList');
  newsList.innerHTML = newsResults.map(n => `
    <div style="margin-bottom:10px;">
        <strong>${n.title}</strong>
        <div style="font-size:12px; color:gray;">${n.desc}</div>
    </div>
`).join('');

    // 화면 전환
    document.querySelector('.hero')?.classList.add('d-none');
    document.getElementById('searchResults').style.display = 'block';
}

// ── 이벤트 연결 ─────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('searchForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = document.getElementById('searchInput').value;
        performSearch(query);
    });
});
