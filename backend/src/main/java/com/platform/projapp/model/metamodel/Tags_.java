package com.platform.projapp.model.metamodel;

import com.platform.projapp.model.Tags;
import com.platform.projapp.model.User;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Tags.class)
public abstract class Tags_ {

	public static volatile SingularAttribute<Tags, Integer> color;
	public static volatile SingularAttribute<Tags, String> name;
	public static volatile SingularAttribute<Tags, Long> id;
	public static volatile SetAttribute<Tags, User> users;

	public static final String COLOR = "color";
	public static final String NAME = "name";
	public static final String ID = "id";
	public static final String USERS = "users";

}

