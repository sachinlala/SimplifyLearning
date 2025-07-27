package com.sl.sample.rest.service;

import static org.hamcrest.Matchers.equalTo;

import io.restassured.module.mockmvc.RestAssuredMockMvc;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest(classes = SampleRESTApplication.class, webEnvironment = SpringBootTest.WebEnvironment.MOCK)
public class SampleRESTServiceTest {

  @Autowired
  private WebApplicationContext webApplicationContext;

  private MockMvc mockMvc;

  @BeforeEach
  public void setup() {
    this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();
    RestAssuredMockMvc.mockMvc(this.mockMvc);
  }

  @Test
  public void testSayHello() {
    RestAssuredMockMvc.given().
        when().
        get("/hello").
        then().
        statusCode(HttpServletResponse.SC_OK).
        body("id", equalTo(1)).
        body("name", equalTo("Hello World!"));
  }

  @Test
  public void testSayHelloWithParam() {
    RestAssuredMockMvc.given().
        param("name", "RestAssured").
        when().
        get("/hello").
        then().
        statusCode(HttpServletResponse.SC_OK).
        body("id", equalTo(2)).
        body("name", equalTo("Hello RestAssured!"));
  }

  @Test
  public void testSayHelloPostNotSupported() {
    RestAssuredMockMvc.given().
        when().
        post("/hello").
        then().
        statusCode(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
  }

  @Test
  public void testSearchBinary() {
    //http://localhost:8080/binarySearch/[1,2,3,4,5]?numberToSearch=2
    //=>1
    RestAssuredMockMvc.given().
        param("numberToSearch", 2).
        when().
        get("/binarySearch/[1,2,3,4,5]").
        then().
        statusCode(HttpServletResponse.SC_OK).
        body("index", equalTo(1)).
        body("value", equalTo(2));
  }
}
