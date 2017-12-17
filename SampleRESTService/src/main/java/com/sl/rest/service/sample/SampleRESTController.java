package com.sl.rest.service.sample;

import com.sl.algorithms.core.BinarySearch;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.atomic.AtomicLong;

@RestController
public class SampleRESTController {

    private static final String HELLO_STR = "Hello %s!";
    private final AtomicLong counter = new AtomicLong();

    /**
     * For a given input 'name', output the JSON form of "Hello 'name'".
     */
    @RequestMapping(method = RequestMethod.GET, path = "/hello")
    public SampleRESTResource sayHello(@RequestParam(value = "name", required = true, defaultValue = "World") String name) {
        return new SampleRESTResource(counter.incrementAndGet(), String.format(HELLO_STR, name));
    }

    /**
     * Apply Binary Search to find the position of a number in a sorted linear.
     */
    @RequestMapping(method = RequestMethod.GET, path = "/binarySearch/[{sortedInput}]")
    public BinarySearchResult searchBinary(@PathVariable int[] sortedInput,
                            @RequestParam(value = "numberToSearch", required = true) int numberToSearch) {
        return new BinarySearchResult(BinarySearch.findIndex(sortedInput, numberToSearch), numberToSearch);
    }
}

class BinarySearchResult {
    private final int index;
    private final int value;

    public BinarySearchResult(int _index, int _value) {
        index = _index;
        value = _value;
    }

    public int getIndex() {
        return index;
    }

    public int getValue() {
        return value;
    }
}