window.onload = function () {

    // 서버에서 사용자 정보 요청
    fetch('/profile/info')

        // JSON 파싱
        .then(res => res.json())

        .then(data => {
            const profileLink = document.getElementById('profileNavLink');
            if (profileLink) {
                profileLink.setAttribute('data-bs-title', ' ✌️' + data.username);
                new bootstrap.Tooltip(profileLink);
            }

            // 사용자 정보 출력
            document.getElementById('infoUsername').textContent
                = data.username;

            document.getElementById('infoEmail').textContent
                = data.email;

            document.getElementById('infoPhone').textContent
                = data.phone;

            // 프로필 이미지 적용
            if (data.profileImage) {

                document.getElementById('profileImg').src
                    = '/uploads/profile/' + data.profileImage;
            }

        });

};