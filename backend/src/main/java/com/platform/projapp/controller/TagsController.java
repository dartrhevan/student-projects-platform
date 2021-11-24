package com.platform.projapp.controller;

import com.platform.projapp.dto.request.CreateTagRequest;
import com.platform.projapp.service.TagsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequestMapping("/api/tags")
@RequiredArgsConstructor
public class TagsController {
    private final TagsService tagsService;

    @PostMapping("/api/tags")
    public ResponseEntity<?> createTag(@RequestBody CreateTagRequest req) {
        return tagsService.createTag(req);
    }

    @GetMapping("/api/tags")
    public ResponseEntity<?> getAllTags() {
        var response = tagsService.getAllTags();
        return ResponseEntity.ok(response);
    }


}
