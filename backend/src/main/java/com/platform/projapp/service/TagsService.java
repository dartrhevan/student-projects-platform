package com.platform.projapp.service;

import com.platform.projapp.dto.request.CreateTagRequest;
import com.platform.projapp.dto.response.GeneralResponse;
import com.platform.projapp.dto.response.body.GetAllTagsResponseBody;
import com.platform.projapp.dto.response.body.MessageResponseBody;
import com.platform.projapp.error.ErrorConstants;
import com.platform.projapp.error.ErrorInfo;
import com.platform.projapp.repository.TagsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.platform.projapp.model.Tags;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TagsService {
    private final TagsRepository tagsRepository;

    public GeneralResponse<MessageResponseBody> createTag(CreateTagRequest req) {
        GeneralResponse<MessageResponseBody> response = new GeneralResponse<>();
        //List<ErrorInfo> errors = new ArrayList<>();
        if (!tagsRepository.existsByName(req.getTagName())) {
            Tags tag = new Tags(req.getTagName(), req.getColor());
            tagsRepository.save(tag);
            return response.withPayload(new MessageResponseBody("Тэг создан успешно"));
        } else {
            //errors.add(ErrorConstants.TAG_IS_BUSY);
            return response.withErrors(ErrorConstants.TAG_IS_BUSY);
        }
    }

    public GeneralResponse<GetAllTagsResponseBody> getAllTags() {
        GeneralResponse<GetAllTagsResponseBody> response = new GeneralResponse<>();
        List<Tags> tags = tagsRepository.findAll();
        return response.withPayload(new GetAllTagsResponseBody(tags));
    }
}
