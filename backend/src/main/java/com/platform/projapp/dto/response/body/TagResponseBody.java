package com.platform.projapp.dto.response.body;

import com.platform.projapp.model.Tag;
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

    public static TagResponseBody fromTag(Tag tag) {
        return new TagResponseBody(tag.getId(), tag.getName(), tag.getColor());
    }
}
