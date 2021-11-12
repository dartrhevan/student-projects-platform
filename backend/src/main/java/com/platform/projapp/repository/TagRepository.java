package com.platform.projapp.repository;

import com.platform.projapp.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Set;

/**
 * @author Yarullin Renat
 */
@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    Set<Tag> findAllByIdIn(Collection<Long> ids);

    Set<Tag> findAllByNameIn(Collection<String> name);
}
