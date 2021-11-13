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

    public Set<Tag> findByTagParam(String tagParam) {
        return findAllByNameIn(parseTagParam(tagParam));
    }

    public List<String> parseTagParam(String tagParam) {
        return Arrays.stream(tagParam.split(",")).collect(Collectors.toList());
    }

    public Set<Tag> findAllByNameIn(List<String> names) {
        return tagRepository.findAllByNameIn(names);
    }

    public Set<Tag> findAllByIdIn(List<Long> ids) {
        return tagRepository.findAllByIdIn(ids);
    }
}
