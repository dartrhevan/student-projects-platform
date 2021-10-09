package Controllers;

import Entity.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/projects")
public class ProjectsController {

    @GetMapping("/add")
    /*public String AddProject(@RequestParam(required=false) String somestring, @RequestParam(required=false) String somestring1) {
    на будущее
     */
    public String AddProject(){
        return "Тут создаются проекты, пока что метод GET, нужен POST";
    }

    @GetMapping("/addtoworkspace")
    /*public String Registration(@RequestParam(required=false) String somestring,@RequestParam(required=false) String somestring1) {
    на будущее
     */
    public String AddProjectToWorspace(){
        return "Тут добавление проекта в воркспейс, пока что метод GET";
    }

}