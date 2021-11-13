package com.platform.projapp.dto.response.body;

import com.platform.projapp.model.Tags;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor
public class TagResponseBody implements ResponseBody {
    private Long id;
    private String name;
    private Integer color;

    public static TagResponseBody fromTag(Tags tag) {
        return new TagResponseBody(tag.getId(), tag.getName(), tag.getColor());
    }
}
