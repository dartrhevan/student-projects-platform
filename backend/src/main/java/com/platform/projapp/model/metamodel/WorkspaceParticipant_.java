package com.platform.projapp.model.metamodel;

import com.platform.projapp.enumarate.WorkspaceRole;
import com.platform.projapp.model.User;
import com.platform.projapp.model.Workspace;
import com.platform.projapp.model.WorkspaceParticipant;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(WorkspaceParticipant.class)
public abstract class WorkspaceParticipant_ {

	public static volatile SingularAttribute<WorkspaceParticipant, Workspace> workspace;
	public static volatile SingularAttribute<WorkspaceParticipant, WorkspaceRole> workspaceRole;
	public static volatile SingularAttribute<WorkspaceParticipant, Long> id;
	public static volatile SingularAttribute<WorkspaceParticipant, User> user;

	public static final String WORKSPACE = "workspace";
	public static final String WORKSPACE_ROLE = "workspaceRole";
	public static final String ID = "id";
	public static final String USER = "user";

}

