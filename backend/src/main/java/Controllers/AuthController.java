package Controllers;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import Entity.User;

@RestController
@RequestMapping("/user")
public class AuthController {
    User TestUser=new User(0,"bufferLogin","bufferPassword");

    //не понял для чего эта функция
    @GetMapping("/1")
    public String GetCurrentUserName() {
        return TestUser.getLogin();
    }

    @PostMapping("/login")
    public String login(@RequestParam(required=false) String login,@RequestParam(required=false) String password) {
        //проверка пользователя в БД, пока все рандомно, логики нет
        if (TestUser.getId()>5000)
            return String.format("Такой пользователь есть в истеме, его Id - %s",TestUser.getId());
        else
            return String.format("Такого пользователя нет в системе, Id - %s",TestUser.getId());
    }

    @GetMapping("/logout")
    public String logout() {
        return "хз как это работает";
    }

    @PostMapping("/register")
    public String Registration(@RequestParam(required=false) String login,@RequestParam(required=false) String password) {
        TestUser.setLogin(login);
        TestUser.setPassword(password);
        int y=1+(int) (Math.random()*10000);
        TestUser.setId(y);
        return String.format("Пользователь зарегестрирован\nID-%s \nLogin-%s \nPassword-%s",TestUser.getId(),TestUser.getLogin(),TestUser.getPassword());
    }

}
