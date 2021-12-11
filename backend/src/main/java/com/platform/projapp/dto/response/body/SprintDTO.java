package com.platform.projapp.dto.response.body;

import com.platform.projapp.model.Presentation;
import com.platform.projapp.model.Sprint;
import com.platform.projapp.repository.PresentationRepository;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.SneakyThrows;
import org.apache.tomcat.util.http.fileupload.FileUtils;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class SprintDTO {
    @SneakyThrows
    public SprintDTO(Sprint sprint) {
        this.id = sprint.getId();
        this.orderNumber = sprint.getOrderNumber();
        this.goals = sprint.getGoals();
        this.startDate = sprint.getStartDate();
        this.endDate = sprint.getEndDate();
        if (sprint.getPresentation()!= null) {
            //FileOutputStream fos = new FileOutputStream(String.format("Презентация %d.pptx",sprint.getId()));
            //fos.write(sprint.getPresentation().getPresentation());
            String.format("/api/presentation/%d", sprint.getPresentation().getId());
            InputStream inputStream = new ByteArrayInputStream(sprint.getPresentation().getPresentation());
            File file = new File(String.format("Презентация %d.pptx",sprint.getId()));
            Files.copy(inputStream, file.toPath(), StandardCopyOption.REPLACE_EXISTING);
            //this.presentation = file;
            this.presentation =String.format("/api/presentation/%d", sprint.getPresentation().getId());
        }
        this.comments = sprint.getScores().stream().map(s -> new CommentDTO(s.getUser().getFullName(), s.getComment()))
                .collect(Collectors.toSet());
    }

    private long id;
    private int orderNumber;
    private String goals;
    private LocalDate startDate;
    private LocalDate endDate;
    private String presentation;
    private Set<CommentDTO> comments;
}
