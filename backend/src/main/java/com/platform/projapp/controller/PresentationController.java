package com.platform.projapp.controller;

import com.platform.projapp.dto.request.WorkspaceRequest;
import com.platform.projapp.model.Presentation;
import com.platform.projapp.repository.PresentationRepository;
import com.platform.projapp.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Base64;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/presentation")
public class PresentationController {
    private final PresentationRepository presentationRepository;

    @GetMapping("/{presentationId}")
    public ResponseEntity<?> getPresentation(@PathVariable("presentationId") Long presentationId) throws IOException {
        Presentation presentation = presentationRepository.getById(presentationId);
        //1 способ
        FileOutputStream fos = new FileOutputStream(String.format("Презентация %d.pptx",presentation.getId()));
        fos.write(presentation.getPresentation());
        //2 способ
        InputStream inputStream = new ByteArrayInputStream(presentation.getPresentation());
        File file = new File(String.format("Презентация %d.pptx",presentation.getId()));
        Files.copy(inputStream, file.toPath(), StandardCopyOption.REPLACE_EXISTING);
        return ResponseEntity.ok(fos);
    }
}