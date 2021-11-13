package com.platform.projapp.controller;

import com.platform.projapp.dto.request.CreateTagRequest;
import com.platform.projapp.service.TagsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//@RequestMapping("/api/tags")
@RequiredArgsConstructor
public class TagsController {
    private final TagsService tagsService;

    @PostMapping("/api/tags")
    public ResponseEntity<?> createTag(@RequestBody CreateTagRequest req) {
        var response = tagsService.createTag(req);
        return response.success() ? ResponseEntity.ok(response) : ResponseEntity.status(400).body(response);
    }

    @GetMapping("/api/tags")
    public ResponseEntity<?> getAllTags() {
        var response = tagsService.getAllTags();
        return  ResponseEntity.ok(response);
    }


}
