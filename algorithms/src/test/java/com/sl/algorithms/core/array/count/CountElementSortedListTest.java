package com.sl.algorithms.core.array.count;

import org.junit.Assert;
import org.junit.Test;

@SuppressWarnings("unchecked")
public class CountElementSortedListTest extends CountElementSortedList {

  @Test
  public void testCountInLogTime() {
    Assert.assertEquals(countInLogTime(new Integer[]{1, 2, 3, 4, 4}, 4), 2);
    Assert.assertEquals(countInLogTime(new Integer[]{1, 2, 3, 4, 4}, 1), 1);
    Assert.assertEquals(countInLogTime(new Integer[]{1, 2, 3, 4, 4}, -1), 0);
    Assert.assertEquals(countInLogTime(new Integer[]{1, 1, 2, 2, 2, 2, 3}, 1), 2);
    Assert.assertEquals(countInLogTime(new Integer[]{1, 1, 2, 2, 2, 2, 3}, 2), 4);
    Assert.assertEquals(countInLogTime(new Integer[]{1, 1, 2, 2, 2, 2, 3}, 3), 1);
    Assert.assertEquals(countInLogTime(new Integer[]{1, 1, 2, 2, 2, 2, 3}, 4), 0);
  }

  @Test
  public void testCountInLinearTime() {
    Assert.assertEquals(countInLinearTime(new Integer[]{4, 1, 3, 2, 4}, 4), 2);
    Assert.assertEquals(countInLinearTime(new Integer[]{1, 2, 3, 4, 4}, 4), 2);
    Assert.assertEquals(countInLinearTime(new Integer[]{10, 100, 2, 1, 3}, 1), 1);
    Assert.assertEquals(countInLinearTime(new Integer[]{10, 100, 2, 10, 3}, 10), 2);
    Assert.assertEquals(countInLinearTime(new Integer[]{1, 2, 3, 4, 4}, -1), 0);
    Assert.assertEquals(countInLinearTime(new Integer[]{1, 1, 2, 2, 2, 2, 3}, 1), 2);
    Assert.assertEquals(countInLinearTime(new Integer[]{1, 1, 2, 2, 2, 2, 3}, 2), 4);
    Assert.assertEquals(countInLinearTime(new Integer[]{1, 1, 2, 2, 2, 2, 3}, 3), 1);
    Assert.assertEquals(countInLinearTime(new Integer[]{1, 1, 2, 2, 2, 2, 3}, 4), 0);
  }
}
