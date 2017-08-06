package com.sl.rest.service;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicLong;

@RestController
public class KinderRESTController {

    private static final String HELLO_STR = "Hello %s!";
    private final AtomicLong counter = new AtomicLong();

    @RequestMapping(method = RequestMethod.GET, path = "/hello")
    public KinderRESTResource sayHello(@RequestParam(value = "name", required = true, defaultValue = "World") String name) {
        return new KinderRESTResource(counter.incrementAndGet(), String.format(HELLO_STR, name));
    }
}