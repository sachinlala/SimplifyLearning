package com.sl.rest.service.sample;

import com.sl.algorithms.core.interfaces.search.BinarySearch;
import com.sl.algorithms.core.search.binarysearch.BinarySearchGeneric;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.atomic.AtomicLong;

@RestController
public class SampleRESTController {

    private static final String HELLO_STR = "Hello %s!";
    private final AtomicLong counter = new AtomicLong();
    private final BinarySearch<Integer> binarySearch = new BinarySearchGeneric<>();

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
    public BinarySearchResult searchBinary(@PathVariable Integer[] sortedInput,
                            @RequestParam(value = "numberToSearch", required = true) Integer numberToSearch) {
        return new BinarySearchResult(binarySearch.findIndex(sortedInput, numberToSearch), numberToSearch);
    }

    static class BinarySearchResult {
        private final int index;
        private final Integer value;

        public BinarySearchResult(int _index, Integer _value) {
            index = _index;
            value = _value;
        }

        public int getIndex() {
            return index;
        }

        public Integer getValue() {
            return value;
        }
    }
}

