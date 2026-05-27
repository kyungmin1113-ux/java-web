function showLoginError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const msgId = fieldId === 'usernameInput' ? 'usernameMsg' : 'passwordMsg';
    const msg = document.getElementById(msgId);

    field.classList.add('is-invalid');
    if (msg) {
        msg.textContent = message;
        msg.style.display = 'block';
    }
}

function clearLoginErrors() {
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const usernameMsg = document.getElementById('usernameMsg');
    const passwordMsg = document.getElementById('passwordMsg');

    usernameInput.classList.remove('is-invalid');
    passwordInput.classList.remove('is-invalid');
    usernameMsg.textContent = "";
    passwordMsg.textContent = "";
    usernameMsg.style.display = "";
    passwordMsg.style.display = "";
}

// 버튼 클릭 시 실행되는 메인 함수
async function validateAndLogin() {
    
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');

    // 1. 초기화 (이전 에러 메시지 지우기)
    clearLoginErrors();

    // 2. 유효성 검사 (간단한 빈칸 체크)
    let isValid = true;

    if (usernameInput.value.trim() === "") {
        showLoginError('usernameInput', "아이디를 입력해주세요.");
        isValid = false;
    }

    if (passwordInput.value.trim() === "") {
        showLoginError('passwordInput', "비밀번호를 입력해주세요.");
        isValid = false;
    }

    // 빈칸이 있다면 여기서 멈춤 (서버로 전송 안 함)
    if (!isValid) {
        return;
    }

    // 3. 유효성 검사 통과 시 실제 로그인 처리 시작
    await submitLogin(passwordInput.value);
}


// 실제 암호화 및 폼 전송 함수
async function submitLogin(rawPassword) {
    
    try {
        // SHA-256 암호화 대기
        const hashed = await hashPassword(rawPassword);
        
        // 암호화된 값을 숨겨진 input 태그에 삽입
        const hiddenPasswordInput = document.getElementById('password');
        hiddenPasswordInput.value = hashed;

        // 💡 중요: 값이 확실히 들어갔는지 콘솔로 확인
        console.log("암호화 완료, 전송될 해시값:", hashed);

        // 폼 전송
        document.getElementById('loginForm').submit();

    } catch (error) {
        console.error("비밀번호 암호화 중 에러 발생:", error);
        if (typeof showToast === 'function') {
            showToast("로그인 처리 중 오류가 발생했습니다. 다시 시도해 주세요.", "danger");
        }
    }
}

// login.js 하단에 추가
window.addEventListener('load', function () {

    const params = new URLSearchParams(window.location.search);

    const error = params.get('error');

    if (error === '1') {

        // 로그인 실패 메시지 출력
        showLoginError(
            'passwordInput',
            '아이디 또는 패스워드가 올바르지 않습니다.'
        );
    }

});
