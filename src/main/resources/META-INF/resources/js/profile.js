document.addEventListener('DOMContentLoaded', function () {
    fetch('/profile/info')
        .then(res => {
            if (!res.ok) {
                return null;
            }
            return res.json();
        })
        .then(data => {
            if (!data) {
                return;
            }

            const profileLink = document.getElementById('profileNavLink');
            if (profileLink) {
                profileLink.setAttribute('data-bs-title', '사용자: ' + data.username);
                new bootstrap.Tooltip(profileLink);
            }

            setText('infoUsername', data.username);
            setText('infoEmail', data.email);
            setText('infoPhone', data.phone);

            const profileImg = document.getElementById('profileImg');
            if (profileImg && data.profileImage) {
                profileImg.src = '/uploads/profile/' + data.profileImage;
            }

            setValue('updateEmail', data.email);
            setValue('updatePhone', data.phone);
        });

    handleProfileMessages();
});

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = value || '';
    }
}

function setValue(id, value) {
    const el = document.getElementById(id);
    if (el) {
        el.value = value || '';
    }
}

function handleProfileMessages() {
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    const success = params.get('success');

    const updateMsg = document.getElementById('updateMsg');
    if (success === 'updated' && updateMsg) {
        updateMsg.className = 'alert alert-success mb-3';
        updateMsg.textContent = '개인정보가 수정되었습니다.';
    } else if (error === 'duplicate_email' && updateMsg) {
        updateMsg.className = 'alert alert-danger mb-3';
        updateMsg.textContent = '이미 사용 중인 이메일입니다.';
    }

    if (error === 'wrong_password') {
        showPageToast('현재 비밀번호가 일치하지 않습니다.', 'danger');

        const pwMsg = document.getElementById('pwMsg');
        if (pwMsg) {
            pwMsg.className = 'alert alert-danger mb-3';
            pwMsg.textContent = '현재 비밀번호가 일치하지 않습니다.';
        }
    }

    if (success === 'password_changed') {
        showPageToast('비밀번호가 변경 완료, 로그인 페이지로 이동합니다.', 'success');

        setTimeout(function () {
            window.location.href = '/logout?next=login';
        }, 3500);
    }

    const uploadMessages = {
        invalid_type: 'jpg, png, gif, webp 파일만 가능합니다.',
        too_large: '파일 크기는 5MB 이하여야 합니다.',
        upload_fail: '업로드 실패. 다시 시도해주세요.'
    };

    const uploadErrorMsg = document.getElementById('uploadErrorMsg');
    if (uploadMessages[error] && uploadErrorMsg) {
        uploadErrorMsg.textContent = uploadMessages[error];
        uploadErrorMsg.classList.remove('d-none');
    }
}

function validateAndUpdate() {
    let valid = true;
    const email = document.getElementById('updateEmail').value.trim();
    const phone = document.getElementById('updatePhone').value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFieldError(
            'updateEmail',
            'updateEmailMsg',
            '올바른 이메일 형식이 아닙니다.'
        );
        valid = false;
    } else {
        clearFieldError('updateEmail', 'updateEmailMsg');
    }

    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
        showFieldError(
            'updatePhone',
            'updatePhoneMsg',
            '010-0000-0000 형식으로 입력해주세요.'
        );
        valid = false;
    } else {
        clearFieldError('updatePhone', 'updatePhoneMsg');
    }

    if (valid) {
        document.getElementById('updateForm').submit();
    }
}

async function validateAndChangePassword() {
    let valid = true;
    const currentPw = document.getElementById('currentPwInput').value;
    const newPw = document.getElementById('newPwInput').value;
    const newPwConfirm = document.getElementById('newPwConfirm').value;

    if (!currentPw) {
        showFieldError(
            'currentPwInput',
            'currentPwMsg',
            '현재 비밀번호를 입력해주세요.'
        );
        valid = false;
    } else {
        clearFieldError('currentPwInput', 'currentPwMsg');
    }

    const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!pwRegex.test(newPw)) {
        showFieldError(
            'newPwInput',
            'newPwMsg',
            '8자 이상, 영문+숫자+특수문자를 포함해야 합니다.'
        );
        valid = false;
    } else {
        clearFieldError('newPwInput', 'newPwMsg');
    }

    if (newPw !== newPwConfirm) {
        showFieldError(
            'newPwConfirm',
            'newPwConfirmMsg',
            '새 비밀번호가 일치하지 않습니다.'
        );
        valid = false;
    } else {
        clearFieldError('newPwConfirm', 'newPwConfirmMsg');
    }

    if (!valid) {
        return;
    }

    const hashedCurrent = await hashPassword(currentPw);
    const hashedNew = await hashPassword(newPw);

    document.getElementById('currentPassword').value = hashedCurrent;
    document.getElementById('newPassword').value = hashedNew;
    document.getElementById('pwForm').submit();
}

function showFieldError(fieldId, msgId, message) {
    const field = document.getElementById(fieldId);
    const msg = document.getElementById(msgId);

    if (field) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
    }

    if (msg) {
        msg.textContent = message;
    }
}

function clearFieldError(fieldId, msgId) {
    const field = document.getElementById(fieldId);
    const msg = document.getElementById(msgId);

    if (field) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
    }

    if (msg) {
        msg.textContent = '';
    }
}

function showPageToast(message, type) {
    if (typeof showToast === 'function') {
        showToast(message, type);
    }
}
