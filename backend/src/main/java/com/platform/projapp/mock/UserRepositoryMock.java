package com.platform.projapp.mock;

import com.platform.projapp.enumarate.AccessRole;
import lombok.Data;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * @author Yarullin Renat
 */
@Data
@Component
public class UserRepositoryMock {
    private final List<UserMock> usersStorage = Collections.synchronizedList(new ArrayList<>());

    public UserRepositoryMock() {
        save(new UserMock("rinya1608@mail.ru",
                "$2a$12$nDOZeZ4XkjOwHTgTlMMJLe5u6vXIL5Hu3kUenMF0Q/J7R4DTaZCM.",
                 "ren_ren",
                 "интересы",
                 100,
                 Collections.singleton(AccessRole.ROLE_USER)));
    }

    public UserMock findByEmail(String email) {
        return usersStorage.stream()
                .filter(userMock -> userMock.getUsername().equals(email))
                .findFirst()
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));
    }
    public boolean existsByEmail(String email){
        return usersStorage.stream().anyMatch(user -> user.getEmail().equals(email));
    }
    public void save(UserMock userMock){
        usersStorage.add(userMock);
    }
}
