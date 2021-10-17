package com.platform.projapp;

import com.platform.projapp.property.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({AppProperties.class})
public class ProjappApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjappApplication.class, args);
    }

}
