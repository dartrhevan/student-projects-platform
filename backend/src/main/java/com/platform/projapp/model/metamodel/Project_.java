package com.platform.projapp.model.metamodel;

import com.platform.projapp.enumarate.ProjectStatus;
import com.platform.projapp.model.Participant;
import com.platform.projapp.model.Project;
import com.platform.projapp.model.Tags;
import com.platform.projapp.model.Workspace;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Project.class)
public abstract class Project_ {

	public static volatile SingularAttribute<Project, Integer> maxParticipantsCount;
	public static volatile SingularAttribute<Project, Workspace> workspace;
	public static volatile SingularAttribute<Project, String> trackerLink;
	public static volatile SingularAttribute<Project, String> name;
	public static volatile SingularAttribute<Project, Long> id;
	public static volatile SingularAttribute<Project, String> shortDescription;
	public static volatile SingularAttribute<Project, String> fullDescription;
	public static volatile SingularAttribute<Project, ProjectStatus> status;
	public static volatile SetAttribute<Project, Tags> tags;
	public static volatile SetAttribute<Project, Participant> participants;

	public static final String MAX_PARTICIPANTS_COUNT = "maxParticipantsCount";
	public static final String WORKSPACE = "workspace";
	public static final String TRACKER_LINK = "trackerLink";
	public static final String NAME = "name";
	public static final String ID = "id";
	public static final String SHORT_DESCRIPTION = "shortDescription";
	public static final String FULL_DESCRIPTION = "fullDescription";
	public static final String STATUS = "status";
	public static final String TAGS = "tags";
	public static final String PARTICIPANTS = "participants";

}

