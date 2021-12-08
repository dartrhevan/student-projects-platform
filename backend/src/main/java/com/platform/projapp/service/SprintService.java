package com.platform.projapp.service;

import com.platform.projapp.model.Sprint;
import com.platform.projapp.repository.SprintRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Yarullin Renat
 */
@Service
@RequiredArgsConstructor
public class SprintService {
    private final SprintRepository sprintRepository;

    public List<Sprint> findAll() {
        return sprintRepository.findAll();
    }
}
