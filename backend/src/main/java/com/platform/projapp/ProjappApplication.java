package com.platform.projapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@ComponentScan(basePackages={"Controllers"})
@ComponentScan(basePackages={"Entity"})
public class ProjappApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjappApplication.class, args);
	}

}
