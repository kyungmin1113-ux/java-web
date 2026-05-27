// 1. 유효성 검사 및 모달창 띄우기
function validateAndShowModal() {
    let valid = true;

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // 아이디 검사
    const usernameRegex = /^[a-zA-Z0-9]{4,20}$/;
    if (!usernameRegex.test(username)) {
        showError('username', '아이디는 4~20자 영문/숫자만 가능합니다.');
        valid = false;
    } else {
        clearError('username');
    }

    // 비밀번호 검사
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
        showError('password', '8자 이상, 영문+숫자+특수문자를 포함해야 합니다.');
        valid = false;
    } else {
        clearError('password');
    }

    // 비밀번호 확인
    if (password !== passwordConfirm) {
        showError('passwordConfirm', '패스워드가 일치하지 않습니다.');
        valid = false;
    } else {
        clearError('passwordConfirm');
    }

    // 이메일 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('email', '올바른 이메일 형식이 아닙니다.');
        valid = false;
    } else {
        clearError('email');
    }

    // 연락처 검사
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
        showError('phone', '010-0000-0000 형식으로 입력해주세요.');
        valid = false;
    } else {
        clearError('phone');
    }

    // 모든 유효성 검사 통과 시 모달 띄우기
    if (valid) {
        // 모달에 값 넣기
        document.getElementById("confirmUsername").innerText = username;
        document.getElementById("confirmEmail").innerText = email;
        document.getElementById("confirmPhone").innerText = phone;

        // 모달 열기
        const modal = new bootstrap.Modal(document.getElementById("confirmModal"));
        modal.show();
    }
}


// 2. 가입하기 버튼 클릭 시 해시 변환 후 제출 (CryptoJS 라이브러리 사용 🚀)
function submitRegister() {
    try {
        // 1. 입력된 평문 비밀번호 가져오기
        const rawPassword = document.getElementById('password').value;

        // 2. 외부 라이브러리를 사용해 무조건 성공하는 1줄 암호화!
        const hashedPassword = CryptoJS.SHA256(rawPassword).toString();

        // 3. 폼(Form) 가져오기
        const form = document.getElementById('registerForm');

        // 4. 기존 폼 안에 있는 'name="password"' 속성 전부 박탈 (빈칸 방지)
        const badInputs = form.querySelectorAll('[name="password"]');
        badInputs.forEach(input => input.removeAttribute('name'));

        // 5. 완벽하게 해시값이 들어간 새 숨겨진 input 강제 생성
        const forceInput = document.createElement('input');
        forceInput.type = 'hidden';
        forceInput.name = 'password';  // 자바 서버로 날아갈 이름
        forceInput.value = hashedPassword; 
        form.appendChild(forceInput);

        // 🔥 콘솔창 확인용 (이 로그가 뜨면 10,000% 성공입니다)
        console.log("🔥 전송될 해시값:", forceInput.value);

        // 6. 강제 제출!
        form.submit();

    } catch (error) {
        // 이제 여기로 빠질 일은 거의 없습니다.
        console.error("암호화 에러:", error);
        if (typeof showToast === 'function') {
            showToast("회원가입 처리 중 오류가 발생했습니다.", "danger");
        }
    }
}


// 에러 출력 
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');

    const msg = document.getElementById(fieldId + 'Msg');
    if (msg) {
        msg.textContent = message;
    }
}

// 에러 제거 
function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');

    const msg = document.getElementById(fieldId + 'Msg');
    if (msg) {
        msg.textContent = '';
    }
}

// URL 에러 처리 
window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');

    if (error === 'duplicate_username') {
        showError('username', '이미 사용 중인 아이디입니다.');
    }

    if (error === 'duplicate_email') {
        showError('email', '이미 사용 중인 이메일입니다.');
    }
};
