package com.platform.projapp;

import com.platform.projapp.property.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableConfigurationProperties({AppProperties.class})
public class ProjappApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProjappApplication.class, args);
    }
}
