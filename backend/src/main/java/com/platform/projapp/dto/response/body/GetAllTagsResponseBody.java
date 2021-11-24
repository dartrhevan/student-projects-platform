package com.platform.projapp.dto.response.body;

import com.platform.projapp.model.Tags;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class GetAllTagsResponseBody {
    List<Tags> tags;
}
