package com.platform.projapp.specification;

import com.platform.projapp.model.Workspace;
import com.platform.projapp.model.WorkspaceParticipant;
import com.platform.projapp.model.metamodel.ProjectRole_;
import com.platform.projapp.model.metamodel.Tags_;
import com.platform.projapp.model.metamodel.User_;
import com.platform.projapp.model.metamodel.WorkspaceParticipant_;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Yarullin Renat
 */

public class WorkspaceParticipantSpecification {

    public static Specification<WorkspaceParticipant> byParams(Workspace workspace,
                                                               String name,
                                                               String surname,
                                                               List<String> skills,
                                                               List<String> roles) {
        var specification = byWorkspace(workspace);
        if (name != null) specification = specification.and(byName(name));
        if (surname != null) specification = specification.and(bySurname(surname));
        if (skills != null) specification = specification.and(bySkills(skills));
        if (roles != null) specification = specification.and(byRoles(roles));
        return specification;
    }

    public static Specification<WorkspaceParticipant> byWorkspace(Workspace workspace) {
        return ((root, query, cb) -> cb.equal(root.get(WorkspaceParticipant_.WORKSPACE), workspace));
    }

    public static Specification<WorkspaceParticipant> byName(String name) {
        return ((root, query, cb) -> cb.like(cb.lower(root.get(WorkspaceParticipant_.USER).get(User_.NAME)),
                "%" + name.toLowerCase() + "%"));
    }

    public static Specification<WorkspaceParticipant> bySurname(String surname) {
        return ((root, query, cb) -> cb.like(cb.lower(root.get(WorkspaceParticipant_.USER).get(User_.SURNAME)),
                "%" + surname.toLowerCase() + "%"));
    }

    public static Specification<WorkspaceParticipant> bySkills(List<String> skills) {
        List<String> finalSkills = skills.stream().map(String::toLowerCase).collect(Collectors.toList());
        return ((root, query, cb) -> cb.lower(root.join(WorkspaceParticipant_.USER).join(User_.SKILLS).get(Tags_.NAME)).in(finalSkills));
    }

    public static Specification<WorkspaceParticipant> byRoles(List<String> roles) {
        List<String> finalSkills = roles.stream().map(String::toLowerCase).collect(Collectors.toList());
        return ((root, query, cb) -> cb.lower(root.join(WorkspaceParticipant_.USER).join(User_.ROLES).get(ProjectRole_.NAME)).in(finalSkills));
    }

}
