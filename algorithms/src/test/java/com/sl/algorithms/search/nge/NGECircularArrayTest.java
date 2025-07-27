package com.sl.algorithms.search.nge;

import com.sl.algorithms.core.utils.ArrayOps;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class NGECircularArrayTest extends NGECircularArray {

  @Test
  public void testFindNGEInCircularArray() {
    assertEquals("[2,-1,2]", ArrayOps.printArray(findNGE(new int[]{1, 2, 1})));
    assertEquals("[5,-1,5]", ArrayOps.printArray(findNGE(new int[]{3, 5, 4})));
    assertEquals("[2,3,4,5,-1]", ArrayOps.printArray(findNGE(new int[]{1, 2, 3, 4, 5})));
    assertEquals("[74,75,76,72,72,76,-1,74]",
        ArrayOps.printArray(findNGE(new int[]{73, 74, 75, 71, 69, 72, 76, 73})));
  }
}
