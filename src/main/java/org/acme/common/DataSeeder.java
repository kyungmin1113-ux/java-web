package org.acme.common;

import org.acme.champion.Champion;
import org.acme.login.User;

import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class DataSeeder {

    @Transactional
    void onStart(@Observes StartupEvent ev) {
        
        // 1. User 초기 데이터 (users 테이블이 비어있을 때만 guest 생성)
        if (User.count() == 0) {
            User guest = new User();
            guest.username = "guest";
            // 비밀번호 '123123'의 완벽한 SHA-256 소문자 해시값입니다.
            guest.password = "fd6dab9e05e5e2c2cb109645ba72a8f05fe290156e0299267cd685db518c9000";
            guest.persist();
        }

        // 2. 챔피언 데이터가 이미 존재하면 여기서 실행을 중단(return)합니다.
        if (Champion.count() > 0) return;

        // 3. 챔피언 데이터가 없을 때만 아래 데이터들을 추가합니다.
        persist("아트록스", "전사", "탑");
        persist("사일러스", "마법사", "정글/미드");
        persist("애니비아", "마법사", "미드");
        persist("브라이어", "전사", "정글");
        persist("잭스", "전사", "탑");
        persist("징크스", "원거리딜러", "원딜");
        persist("야스오", "전사", "미드/탑");
        persist("리신", "전사", "정글");
        persist("티모", "마법사", "탑");
        persist("케인", "암살자", "정글");
        persist("루시안", "원거리딜러", "원딜/미드");
    }

    private void persist(String name, String role, String line) {
        Champion c = new Champion();
        c.name = name;
        c.role = role;
        c.line = line;
        c.persist();
    }
}