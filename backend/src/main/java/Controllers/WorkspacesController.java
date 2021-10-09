package Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/workspaces")
public class WorkspacesController {

    @GetMapping("/show")
    public String getAllPublicWorkspaces(){
        return "Тут выводятся все ворспейсы";
    }

    @GetMapping("/users")
    public String getUsersWorkspaces(){
        return "Не понял для чего функция, пока что метод GET";
    }

    @GetMapping("/add")
    /*public String Registration(@RequestParam(required=false) String somestring,@RequestParam(required=false) String somestring1) {
    на будущее
     */
    public String addNewWorkspace(){
        return "Тут добавление воркспейсов, пока что метод GET, нужен будет POST";
    }

}
