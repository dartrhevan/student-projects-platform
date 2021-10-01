package com.platform.projapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class ProjappApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjappApplication.class, args);
	}

}
