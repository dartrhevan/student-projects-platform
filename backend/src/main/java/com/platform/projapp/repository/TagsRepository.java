package com.platform.projapp.repository;

import com.platform.projapp.model.Tags;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@Repository
public interface TagsRepository extends JpaRepository<Tags, Long> {
    Boolean existsByName(String name);
    Set<Tags> findAllByIdIn(Collection<Long> ids);
    Set<Tags> findAllByNameIn(Collection<String> name);

}
