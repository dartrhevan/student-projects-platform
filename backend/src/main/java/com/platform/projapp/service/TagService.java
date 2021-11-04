package com.platform.projapp.service;

import com.platform.projapp.model.Tag;
import com.platform.projapp.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author Yarullin Renat
 */
@Service
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;

    public Set<Tag> parseTagParam(String tagParam) {
        List<String> names = Arrays.stream(tagParam.split(",")).collect(Collectors.toList());
        return findByNameIn(names);
    }

    public Set<Tag> findByNameIn(List<String> names) {
        return tagRepository.findByNameIn(names);
    }
}
