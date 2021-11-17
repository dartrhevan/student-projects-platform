package com.platform.projapp.model.metamodel;

import com.platform.projapp.model.Project;
import com.platform.projapp.model.Workspace;
import com.platform.projapp.model.WorkspaceParticipant;

import java.time.LocalDate;
import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Workspace.class)
public abstract class Workspace_ {

	public static volatile SingularAttribute<Workspace, Integer> sprintCount;
	public static volatile SetAttribute<Workspace, Project> projects;
	public static volatile SingularAttribute<Workspace, String> mentorInvite;
	public static volatile SingularAttribute<Workspace, LocalDate> zeroSprintDate;
	public static volatile SingularAttribute<Workspace, String> userInvite;
	public static volatile SingularAttribute<Workspace, String> name;
	public static volatile SingularAttribute<Workspace, Long> id;
	public static volatile SingularAttribute<Workspace, Integer> frequencyOfSprints;
	public static volatile SetAttribute<Workspace, WorkspaceParticipant> participants;

	public static final String SPRINT_COUNT = "sprintCount";
	public static final String PROJECTS = "projects";
	public static final String MENTOR_INVITE = "mentorInvite";
	public static final String ZERO_SPRINT_DATE = "zeroSprintDate";
	public static final String USER_INVITE = "userInvite";
	public static final String NAME = "name";
	public static final String ID = "id";
	public static final String FREQUENCY_OF_SPRINTS = "frequencyOfSprints";
	public static final String PARTICIPANTS = "participants";

}

