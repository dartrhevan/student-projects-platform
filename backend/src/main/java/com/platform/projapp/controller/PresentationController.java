package com.platform.projapp.controller;

import com.platform.projapp.model.Presentation;
import com.platform.projapp.repository.PresentationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/presentation")
public class PresentationController {
    private final PresentationRepository presentationRepository;

    @GetMapping("/{presentationId}")
    public ResponseEntity<?> getPresentation(@PathVariable("presentationId") Long presentationId) {
        Presentation presentation = presentationRepository.getById(presentationId);
        return ResponseEntity.ok( presentation.getPresentation());
    }
}