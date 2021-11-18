package com.platform.projapp.model.metamodel;

import com.platform.projapp.enumarate.AccessRole;
import com.platform.projapp.model.ProjectRole;
import com.platform.projapp.model.Tags;
import com.platform.projapp.model.User;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(User.class)
public abstract class User_ {

	public static volatile SetAttribute<User, AccessRole> accessRoles;
	public static volatile SetAttribute<User, ProjectRole> roles;
	public static volatile SingularAttribute<User, Integer> reputation;
	public static volatile SingularAttribute<User, String> login;
	public static volatile SingularAttribute<User, String> groupp;
	public static volatile SingularAttribute<User, String> passwordHash;
	public static volatile SetAttribute<User, Tags> skills;
	public static volatile SingularAttribute<User, String> messenger;
	public static volatile SingularAttribute<User, String> surname;
	public static volatile SingularAttribute<User, String> name;
	public static volatile SingularAttribute<User, String> middleName;
	public static volatile SingularAttribute<User, Long> id;
	public static volatile SingularAttribute<User, String> interests;
	public static volatile SingularAttribute<User, String> email;

	public static final String ACCESS_ROLES = "accessRoles";
	public static final String ROLES = "roles";
	public static final String REPUTATION = "reputation";
	public static final String LOGIN = "login";
	public static final String GROUPP = "groupp";
	public static final String PASSWORD_HASH = "passwordHash";
	public static final String SKILLS = "skills";
	public static final String MESSENGER = "messenger";
	public static final String SURNAME = "surname";
	public static final String NAME = "name";
	public static final String MIDDLE_NAME = "middleName";
	public static final String ID = "id";
	public static final String INTERESTS = "interests";
	public static final String EMAIL = "email";

}

