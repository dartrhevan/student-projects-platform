package com.platform.projapp.model.metamodel;

import com.platform.projapp.model.RefreshToken;
import com.platform.projapp.model.User;

import java.time.Instant;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(RefreshToken.class)
public abstract class RefreshToken_ {

	public static volatile SingularAttribute<RefreshToken, Instant> expiryDate;
	public static volatile SingularAttribute<RefreshToken, Long> id;
	public static volatile SingularAttribute<RefreshToken, User> user;
	public static volatile SingularAttribute<RefreshToken, String> token;

	public static final String EXPIRY_DATE = "expiryDate";
	public static final String ID = "id";
	public static final String USER = "user";
	public static final String TOKEN = "token";

}

