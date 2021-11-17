package com.platform.projapp.service;

import com.platform.projapp.dto.request.CreateTagRequest;
import com.platform.projapp.dto.response.GeneralResponse;
import com.platform.projapp.dto.response.body.GetAllTagsResponseBody;
import com.platform.projapp.dto.response.body.MessageResponseBody;
import com.platform.projapp.error.ErrorConstants;
import com.platform.projapp.error.ErrorInfo;
import com.platform.projapp.model.Tags;
import com.platform.projapp.repository.TagsRepository;
import com.platform.projapp.utils.StrUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagsService {
    private final TagsRepository tagsRepository;

    public ResponseEntity<?> createTag(CreateTagRequest req) {
        GeneralResponse<MessageResponseBody> response = new GeneralResponse<>();
        List<ErrorInfo> errors = new ArrayList<>();
        if (!tagsRepository.existsByName(req.getTagName())) {
            Tags tag = new Tags(req.getTagName(), req.getColor());
            tagsRepository.save(tag);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            errors.add(ErrorConstants.TAG_IS_BUSY);
            return ResponseEntity.badRequest().body(response.withErrors(errors));
        }
    }

    public GeneralResponse<GetAllTagsResponseBody> getAllTags() {
        GeneralResponse<GetAllTagsResponseBody> response = new GeneralResponse<>();
        List<Tags> tags = tagsRepository.findAll();
        return response.withData(new GetAllTagsResponseBody(tags));
    }

    public Set<Tags> findByTagParam(String tagParam) {
        return findAllByIdIn(StrUtils.parseStrByComma(tagParam).stream().map(s -> {
            try {
                return Long.parseLong(s);
            } catch (Throwable t) {
                return null;
            }
        }).filter(Objects::nonNull).collect(Collectors.toList()));
    }

    public Set<Tags> findAllByNameIn(List<String> names) {
        return tagsRepository.findAllByNameIn(names);
    }

    public Set<Tags> findAllByIdIn(List<Long> ids) {
        return tagsRepository.findAllByIdIn(ids);
    }
}
