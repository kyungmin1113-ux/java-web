// SHA-256 해시 함수
// 브라우저 내장 Web Crypto API 사용

async function hashPassword(password) {

    const encoder = new TextEncoder();

    const data = encoder.encode(password);

    const hashBuffer =
        await crypto.subtle.digest('SHA-256', data);

    const hashArray =
        Array.from(new Uint8Array(hashBuffer));

    return hashArray
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}


// 확인 모달 출력 + 해시 생성
async function showConfirmModal() {

    const username =
        document.getElementById('username').value.trim();

    const email =
        document.getElementById('email').value.trim();

    const phone =
        document.getElementById('phone').value.trim();

    const password =
        document.getElementById('password').value;


    // 모달에 입력 정보 표시
    document.getElementById('confirmUsername').textContent =
        username;

    document.getElementById('confirmEmail').textContent =
        email;

    document.getElementById('confirmPhone').textContent =
        phone;


    // SHA-256 해시 생성
    const hashed = await hashPassword(password);


    // hidden input 에 저장
    document.getElementById('hashedPassword').value =
        hashed;


    // 콘솔 출력
    console.log('해시된 패스워드 :', hashed);


    // Bootstrap 모달 출력
    const modal = new bootstrap.Modal(
        document.getElementById('confirmModal')
    );

    modal.show();
}


// 가입하기 버튼 클릭 시 실행
function submitRegister() {

    // 모달 닫기
    bootstrap.Modal.getInstance(
        document.getElementById('confirmModal')
    ).hide();


    // form submit
    document.getElementById('registerForm').submit();
}