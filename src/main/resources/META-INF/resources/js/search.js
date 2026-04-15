// DOM 로딩 후 실행
document.addEventListener("DOMContentLoaded", function () {

    // 검색 이벤트
    document.getElementById('searchForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const query = document.getElementById('searchInput').value;
        performSearch(query);
    });

});

// ── 챔피언 데이터 ──
const CHAMPIONS = [
    { name: '아트록스', engName: 'Aatrox', role: '전사', lane: '탑', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Aatrox.png', difficulty: '상' },
    { name: '사일러스', engName: 'Sylas', role: '마법사', lane: '정글/미드', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Sylas.png', difficulty: '중' },
    { name: '애니비아', engName: 'Anivia', role: '마법사', lane: '미드', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Anivia.png', difficulty: '상' },
    { name: '브라이어', engName: 'Briar', role: '전사', lane: '정글', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Briar.png', difficulty: '중' },
    { name: '잭스', engName: 'Jax', role: '전사', lane: '탑', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Jax.png', difficulty: '하' },
    { name: '징크스', engName: 'Jinx', role: '원거리딜러', lane: '원딜', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Jinx.png', difficulty: '중' },
];

// ── 뉴스 데이터 ──
const NEWS = [
    { title: '새로운 챔피언 출시', desc: '이벤트 시작', category: '업데이트' }
];

// ── 카테고리 전환 ──
function switchCategory(type, el) {
    document.getElementById('resultChampion').style.display = type === 'champion' ? 'block' : 'none';
    document.getElementById('resultNews').style.display = type === 'news' ? 'block' : 'none';

    document.querySelectorAll('.search-category-item').forEach(i => i.classList.remove('active'));
    if (el) el.classList.add('active');
}

// ── 검색 함수 ──
function performSearch(query) {

    console.log("검색 실행됨:", query); // 

    const q = query.trim().toLowerCase();
    if (!q) return;

    document.getElementById('searchKeywordDisplay').textContent = `"${query}"`;

    const champResults = CHAMPIONS.filter(c =>
        c.name.includes(q) || c.engName.toLowerCase().includes(q)
    );

    const champList = document.getElementById('championResultList');

    if (champResults.length === 0) {
        champList.innerHTML = `<p>결과 없음</p>`;
    } else {
        champList.innerHTML = champResults.map(c => `
            <div>
                <img src="${c.img}" width="50">
                ${c.name}
            </div>
        `).join('');
    }

    document.getElementById('searchResults').style.display = 'block';

    switchCategory('champion', document.querySelector('.search-category-item'));
}