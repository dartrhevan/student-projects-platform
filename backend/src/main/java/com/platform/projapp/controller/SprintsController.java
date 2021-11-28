package com.platform.projapp.controller;

import com.platform.projapp.dto.request.AddOrUpdateSprintRequest;
import com.platform.projapp.dto.response.GeneralResponse;
import com.platform.projapp.error.NotFoundException;
import com.platform.projapp.service.SprintsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/sprints")
@RestController()
@RequiredArgsConstructor
public class SprintsController {
    private final SprintsService sprintsService;

    @GetMapping
    public ResponseEntity<GeneralResponse<?>> getSprints(String projectId) {
        try {
            return ResponseEntity.ok(new GeneralResponse<>()
                    .withData(sprintsService.getForProject(Long.parseLong(projectId))));
        } catch (NotFoundException e) {
            return ResponseEntity.status(404).body(new GeneralResponse<>().withError("Проект не найден"));
        } catch (NumberFormatException e) {
            return ResponseEntity.status(400).body(new GeneralResponse<>().withError("Некорректный идентификатор проекта"));
        }
    }

    @PostMapping
    public ResponseEntity<?> addSprint(@RequestBody AddOrUpdateSprintRequest addOrUpdateSprintRequest) {
        try {
            sprintsService.addSprint(addOrUpdateSprintRequest);
            return ResponseEntity.ok().build();
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
