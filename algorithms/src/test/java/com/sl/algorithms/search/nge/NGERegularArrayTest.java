package com.sl.algorithms.search.nge;

import com.sl.algorithms.core.utils.ArrayOps;
import org.junit.Assert;
import org.junit.Test;

public class NGERegularArrayTest extends NGERegularArray {

  @Test
  public void testFindDaysToWarmthBruteForce() {
    Assert.assertEquals("[1,1,1,1,0]",
        ArrayOps.printArray(findDaysToWarmthBruteForce(new int[]{1, 2, 3, 4, 5})));
    Assert.assertEquals("[1,1,4,2,1,1,0,0]",
        ArrayOps.printArray(findDaysToWarmthBruteForce(new int[]{73, 74, 75, 71, 69, 72, 76, 73})));
  }

  @Test
  public void testFindDaysToWarmth() {
    Assert.assertEquals("[1,1,1,1,0]", ArrayOps.printArray(findNGE(new int[]{1, 2, 3, 4, 5})));
    Assert.assertEquals("[1,1,4,2,1,1,0,0]",
        ArrayOps.printArray(findNGE(new int[]{73, 74, 75, 71, 69, 72, 76, 73})));
  }
}
