function validateAndShowModal() {

    let valid = true;

    const username =
        document.getElementById('username').value.trim();

    const password =
        document.getElementById('password').value;

    const passwordConfirm =
        document.getElementById('passwordConfirm').value;

    const email =
        document.getElementById('email').value.trim();

    const phone =
        document.getElementById('phone').value.trim();

    // 아이디 검사
    const usernameRegex = /^[a-zA-Z0-9]{4,20}$/;

    if (!usernameRegex.test(username)) {

        showError(
            'username',
            '아이디는 4~20자 영문/숫자만 가능합니다.'
        );

        valid = false;

    } else {

        clearError('username');
    }

    // 비밀번호 검사
    const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    if (!passwordRegex.test(password)) {

        showError(
            'password',
            '8자 이상, 영문+숫자+특수문자를 포함해야 합니다.'
        );

        valid = false;

    } else {

        clearError('password');
    }

    // 비밀번호 확인
    if (password !== passwordConfirm) {

        showError(
            'passwordConfirm',
            '패스워드가 일치하지 않습니다.'
        );

        valid = false;

    } else {

        clearError('passwordConfirm');
    }

    // 이메일 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

        showError(
            'email',
            '올바른 이메일 형식이 아닙니다.'
        );

        valid = false;

    } else {

        clearError('email');
    }

    // 연락처 검사
    const phoneRegex = /^010-\d{4}-\d{4}$/;

    if (!phoneRegex.test(phone)) {

        showError(
            'phone',
            '010-0000-0000 형식으로 입력해주세요.'
        );

        valid = false;

    } else {

        clearError('phone');
    }

    // 최종 제출
    if (valid) {

        document
            .getElementById('registerForm')
            .submit();
    }
}

// 에러 출력
function showError(fieldId, message) {

    const field =
        document.getElementById(fieldId);

    field.classList.add('is-invalid');
    field.classList.remove('is-valid');

    const msg =
        document.getElementById(fieldId + 'Msg');

    if (msg) {

        msg.textContent = message;
    }
}

// 에러 제거
function clearError(fieldId) {

    const field =
        document.getElementById(fieldId);

    field.classList.remove('is-invalid');
    field.classList.add('is-valid');

    const msg =
        document.getElementById(fieldId + 'Msg');

    if (msg) {

        msg.textContent = '';
    }
}

// URL 에러 처리
window.onload = function () {

    const params =
        new URLSearchParams(window.location.search);

    const error = params.get('error');

    if (error === 'duplicate_username') {

        showError(
            'username',
            '이미 사용 중인 아이디입니다.'
        );
    }

    if (error === 'duplicate_email') {

        showError(
            'email',
            '이미 사용 중인 이메일입니다.'
        );
    }
};