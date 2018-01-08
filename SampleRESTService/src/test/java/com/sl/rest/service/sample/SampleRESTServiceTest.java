package com.sl.rest.service.sample;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.http.HttpServletResponse;

import static io.restassured.module.mockmvc.RestAssuredMockMvc.given;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.mockMvc;
import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration("classpath:test-sample-rest-service.xml")
public class SampleRESTServiceTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Before
    public void setup() {
        this.mockMvc = webAppContextSetup(this.webApplicationContext).build();
        mockMvc(this.mockMvc);
    }

    @Test
    public void testSayHello() {
        given().
                when().
                get("/hello").
                then().
                statusCode(HttpServletResponse.SC_OK).
                body("id", equalTo(1)).
                body("name", equalTo("Hello World!"));
    }

    @Test
    public void testSayHelloWithParam() {
        given().
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
        given().
                when().
                post("/hello").
                then().
                statusCode(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    }

    @Test
    public void testSearchBinary() {
        //http://localhost:8080/binarySearch/[1,2,3,4,5]?numberToSearch=2
        //=>1
        given().
                param("numberToSearch", 2).
                when().
                get("/binarySearch/[1,2,3,4,5]").
                then().
                statusCode(HttpServletResponse.SC_OK).
                body("index", equalTo(1)).
                body("value", equalTo(2));
    }
}
