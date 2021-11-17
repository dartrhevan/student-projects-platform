package com.platform.projapp.model.metamodel;

import com.platform.projapp.model.Participant;
import com.platform.projapp.model.Project;
import com.platform.projapp.model.ProjectRole;
import com.platform.projapp.model.User;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Participant.class)
public abstract class Participant_ {

	public static volatile SingularAttribute<Participant, Boolean> isOwner;
	public static volatile SingularAttribute<Participant, ProjectRole> projectRole;
	public static volatile SingularAttribute<Participant, Project> project;
	public static volatile SingularAttribute<Participant, Long> id;
	public static volatile SingularAttribute<Participant, User> user;

	public static final String IS_OWNER = "isOwner";
	public static final String PROJECT_ROLE = "projectRole";
	public static final String PROJECT = "project";
	public static final String ID = "id";
	public static final String USER = "user";

}

