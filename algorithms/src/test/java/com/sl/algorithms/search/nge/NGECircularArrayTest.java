package com.sl.algorithms.search.nge;

import com.sl.algorithms.core.utils.ArrayOps;
import org.junit.Assert;
import org.junit.Test;

public class NGECircularArrayTest extends NGECircularArray {

  @Test
  public void testFindNGEInCircularArray() {
    Assert.assertEquals("[2,-1,2]", ArrayOps.printArray(findNGE(new int[]{1, 2, 1})));
    Assert.assertEquals("[5,-1,5]", ArrayOps.printArray(findNGE(new int[]{3, 5, 4})));
    Assert.assertEquals("[2,3,4,5,-1]", ArrayOps.printArray(findNGE(new int[]{1, 2, 3, 4, 5})));
    Assert.assertEquals("[74,75,76,72,72,76,-1,74]",
        ArrayOps.printArray(findNGE(new int[]{73, 74, 75, 71, 69, 72, 76, 73})));
  }
}
