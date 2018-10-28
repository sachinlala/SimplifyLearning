package com.sl.sample.rest.service;

import com.sl.algorithms.core.interfaces.search.Search;
import com.sl.algorithms.search.binarysearch.GenericBinarySearch;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SampleRESTController {

  private static final String HELLO_STR = "Hello %s!";
  private final AtomicLong counter = new AtomicLong();
  private final Search<Integer> binarySearch = new GenericBinarySearch<>();

  /**
   * For a given input 'name', output the JSON form of "Hello 'name'".
   *
   * @param name input
   * @return SampleRESTResource
   */
  @RequestMapping(method = RequestMethod.GET, path = "/hello")
  public SampleRESTResource sayHello(
      @RequestParam(value = "name", required = true, defaultValue = "World") String name) {
    return new SampleRESTResource(counter.incrementAndGet(), String.format(HELLO_STR, name));
  }

  /**
   * Apply Binary Search to find the position of a number in a sorted linear.
   *
   * @param sortedInput input array e.g. [1,2,3,4,5]
   * @param numberToSearch integer to search
   * @return BinarySearchResult
   */
  @RequestMapping(method = RequestMethod.GET, path = "/binarySearch/[{sortedInput}]")
  public BinarySearchResult searchBinary(@PathVariable Integer[] sortedInput,
      @RequestParam(value = "numberToSearch", required = true) Integer numberToSearch) {
    return new BinarySearchResult(binarySearch.findIndex(sortedInput, numberToSearch),
        numberToSearch);
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

