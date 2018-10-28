package com.sl.sample.rest.service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
@ComponentScan
public class SampleRESTApplication {

  public static void main(String[] args) {
    SpringApplication.run(SampleRESTApplication.class, args);
  }
}
