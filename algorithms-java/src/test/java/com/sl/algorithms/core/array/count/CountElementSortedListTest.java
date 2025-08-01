package com.sl.algorithms.core.array.count;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

@SuppressWarnings("unchecked")
public class CountElementSortedListTest extends CountElementSortedList {

  @Test
  public void testCountInLogTime() {
    assertEquals(countInLogTime(new Integer[]{1, 2, 3, 4, 4}, 4), 2);
    assertEquals(countInLogTime(new Integer[]{1, 2, 3, 4, 4}, 1), 1);
    assertEquals(countInLogTime(new Integer[]{1, 2, 3, 4, 4}, -1), 0);
    assertEquals(countInLogTime(new Integer[]{1, 1, 2, 2, 2, 2, 3}, 1), 2);
    assertEquals(countInLogTime(new Integer[]{1, 1, 2, 2, 2, 2, 3}, 2), 4);
    assertEquals(countInLogTime(new Integer[]{1, 1, 2, 2, 2, 2, 3}, 3), 1);
    assertEquals(countInLogTime(new Integer[]{1, 1, 2, 2, 2, 2, 3}, 4), 0);
  }

  @Test
  public void testCountInLinearTime() {
    assertEquals(countInLinearTime(new Integer[]{4, 1, 3, 2, 4}, 4), 2);
    assertEquals(countInLinearTime(new Integer[]{1, 2, 3, 4, 4}, 4), 2);
    assertEquals(countInLinearTime(new Integer[]{10, 100, 2, 1, 3}, 1), 1);
    assertEquals(countInLinearTime(new Integer[]{10, 100, 2, 10, 3}, 10), 2);
    assertEquals(countInLinearTime(new Integer[]{1, 2, 3, 4, 4}, -1), 0);
    assertEquals(countInLinearTime(new Integer[]{1, 1, 2, 2, 2, 2, 3}, 1), 2);
    assertEquals(countInLinearTime(new Integer[]{1, 1, 2, 2, 2, 2, 3}, 2), 4);
    assertEquals(countInLinearTime(new Integer[]{1, 1, 2, 2, 2, 2, 3}, 3), 1);
    assertEquals(countInLinearTime(new Integer[]{1, 1, 2, 2, 2, 2, 3}, 4), 0);
  }
}
