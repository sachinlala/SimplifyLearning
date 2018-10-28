package com.sl.algorithms.search.nge;

import static com.sl.algorithms.core.utils.NumberOps.convertToArray;
import static com.sl.algorithms.core.utils.NumberOps.convertToNumber;

import org.junit.Assert;
import org.junit.Test;

public class NarayanPanditPermutationAlgorithmTest extends NarayanPanditPermutationAlgorithm {

  @Test
  public void testNGNSameDigits10s() {
    Assert.assertEquals(-1, findNGNSameDigits10s(10));
    Assert.assertEquals(21, findNGNSameDigits10s(12));
    Assert.assertEquals(-1, findNGNSameDigits10s(21));
    Assert.assertEquals(120, findNGNSameDigits10s(102));
    Assert.assertEquals(211, findNGNSameDigits10s(121));
    Assert.assertEquals(132, findNGNSameDigits10s(123));
    Assert.assertEquals(213, findNGNSameDigits10s(132));
    Assert.assertEquals(192, findNGNSameDigits10s(129));
    Assert.assertEquals(219, findNGNSameDigits10s(192));
    Assert.assertEquals(-1, findNGNSameDigits10s(1999999999));
  }

  @Test
  public void testNGNSameDigits() {
    Assert.assertEquals(-1, convertToNumber(findNGE(convertToArray(4321))));
    Assert.assertEquals(4132, convertToNumber(findNGE(convertToArray(4123))));
    Assert.assertEquals(4213, convertToNumber(findNGE(convertToArray(4132))));
    Assert.assertEquals(4231, convertToNumber(findNGE(convertToArray(4213))));
    Assert.assertEquals(4321, convertToNumber(findNGE(convertToArray(4312))));
    Assert.assertEquals(-1, convertToNumber(findNGE(convertToArray(10))));
    Assert.assertEquals(21, convertToNumber(findNGE(convertToArray(12))));
    Assert.assertEquals(-1, convertToNumber(findNGE(convertToArray(21))));
    Assert.assertEquals(120, convertToNumber(findNGE(convertToArray(102))));
    Assert.assertEquals(211, convertToNumber(findNGE(convertToArray(121))));
    Assert.assertEquals(132, convertToNumber(findNGE(convertToArray(123))));
    Assert.assertEquals(213, convertToNumber(findNGE(convertToArray(132))));
    Assert.assertEquals(192, convertToNumber(findNGE(convertToArray(129))));
    Assert.assertEquals(219, convertToNumber(findNGE(convertToArray(192))));
    Assert.assertEquals(919, convertToNumber(findNGE(convertToArray(199))));
    Assert.assertEquals(5746, convertToNumber(findNGE(convertToArray(5674))));
    Assert.assertEquals(5764, convertToNumber(findNGE(convertToArray(5746))));
    Assert.assertEquals(6457, convertToNumber(findNGE(convertToArray(5764))));
    Assert.assertEquals(6475, convertToNumber(findNGE(convertToArray(6457))));
    Assert.assertEquals(6547, convertToNumber(findNGE(convertToArray(6475))));
    Assert.assertEquals(6574, convertToNumber(findNGE(convertToArray(6547))));
    Assert.assertEquals(6745, convertToNumber(findNGE(convertToArray(6574))));
    Assert.assertEquals(6754, convertToNumber(findNGE(convertToArray(6745))));
    Assert.assertEquals(7456, convertToNumber(findNGE(convertToArray(6754))));
    Assert.assertEquals(9199, convertToNumber(findNGE(convertToArray(1999))));
    Assert.assertEquals(-1, convertToNumber(findNGE(convertToArray(1999999999))));
  }
}
