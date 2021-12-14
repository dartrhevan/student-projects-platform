package com.platform.projapp.controller;

import com.platform.projapp.dto.request.AddOrUpdateSprintRequest;
import com.platform.projapp.dto.response.GeneralResponse;
import com.platform.projapp.error.NotFoundException;
import com.platform.projapp.service.SprintsService;
import com.platform.projapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/sprints")
@RestController
@RequiredArgsConstructor
public class SprintsController {
    private final SprintsService sprintsService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<GeneralResponse<?>> getSprints(@RequestHeader(name = "Authorization") String token, String projectId) {
        try {
            var user = userService.parseAndFindByJwt(token);
            return ResponseEntity.ok(new GeneralResponse<>()
                    .withData(sprintsService.getForProject(user, Long.parseLong(projectId))));
        } catch (NotFoundException e) {
            return ResponseEntity.status(404).body(new GeneralResponse<>().withError("Проект не найден"));
        } catch (NumberFormatException e) {
            return ResponseEntity.status(400).body(new GeneralResponse<>().withError("Некорректный идентификатор проекта"));
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteSprints(String sprintId) {
        try {
            sprintsService.removeSprint(Long.parseLong(sprintId));
            return ResponseEntity.ok().build();
        } catch (NumberFormatException e) {
            return ResponseEntity.status(400).body(new GeneralResponse<>().withError("Некорректный идентификатор спринта"));
        }
    }

    @PostMapping
    public ResponseEntity<GeneralResponse<?>> addSprint(@RequestBody AddOrUpdateSprintRequest addOrUpdateSprintRequest) {
        try {
            return ResponseEntity.ok().body(new GeneralResponse<>().withData(sprintsService.addSprint(addOrUpdateSprintRequest)));
        } catch (NotFoundException e) {
            return ResponseEntity.status(404).body(new GeneralResponse<>().withError("Проект не найден"));
        }
    }

    @PutMapping
    public ResponseEntity<?> editSprint(@RequestBody AddOrUpdateSprintRequest addOrUpdateSprintRequest) {
        try {
            sprintsService.updateSprint(addOrUpdateSprintRequest);
            return ResponseEntity.ok().build();
        } catch (NotFoundException e) {
            return ResponseEntity.status(404).body(new GeneralResponse<>().withError("Спринт не найден"));
        }
    }
}
