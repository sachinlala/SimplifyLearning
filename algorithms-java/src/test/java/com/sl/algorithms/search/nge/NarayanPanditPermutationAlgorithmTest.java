package com.sl.algorithms.search.nge;

import static com.sl.algorithms.core.utils.NumberOps.convertToArray;
import static com.sl.algorithms.core.utils.NumberOps.convertToNumber;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class NarayanPanditPermutationAlgorithmTest extends NarayanPanditPermutationAlgorithm {

  @Test
  public void testNGNSameDigits10s() {
    assertEquals(-1, findNGNSameDigits10s(10));
    assertEquals(21, findNGNSameDigits10s(12));
    assertEquals(-1, findNGNSameDigits10s(21));
    assertEquals(120, findNGNSameDigits10s(102));
    assertEquals(211, findNGNSameDigits10s(121));
    assertEquals(132, findNGNSameDigits10s(123));
    assertEquals(213, findNGNSameDigits10s(132));
    assertEquals(192, findNGNSameDigits10s(129));
    assertEquals(219, findNGNSameDigits10s(192));
    assertEquals(-1, findNGNSameDigits10s(1999999999));
  }

  @Test
  public void testNGNSameDigits() {
    assertEquals(-1, convertToNumber(findNGE(convertToArray(4321))));
    assertEquals(4132, convertToNumber(findNGE(convertToArray(4123))));
    assertEquals(4213, convertToNumber(findNGE(convertToArray(4132))));
    assertEquals(4231, convertToNumber(findNGE(convertToArray(4213))));
    assertEquals(4321, convertToNumber(findNGE(convertToArray(4312))));
    assertEquals(-1, convertToNumber(findNGE(convertToArray(10))));
    assertEquals(21, convertToNumber(findNGE(convertToArray(12))));
    assertEquals(-1, convertToNumber(findNGE(convertToArray(21))));
    assertEquals(120, convertToNumber(findNGE(convertToArray(102))));
    assertEquals(211, convertToNumber(findNGE(convertToArray(121))));
    assertEquals(132, convertToNumber(findNGE(convertToArray(123))));
    assertEquals(213, convertToNumber(findNGE(convertToArray(132))));
    assertEquals(192, convertToNumber(findNGE(convertToArray(129))));
    assertEquals(219, convertToNumber(findNGE(convertToArray(192))));
    assertEquals(919, convertToNumber(findNGE(convertToArray(199))));
    assertEquals(5746, convertToNumber(findNGE(convertToArray(5674))));
    assertEquals(5764, convertToNumber(findNGE(convertToArray(5746))));
    assertEquals(6457, convertToNumber(findNGE(convertToArray(5764))));
    assertEquals(6475, convertToNumber(findNGE(convertToArray(6457))));
    assertEquals(6547, convertToNumber(findNGE(convertToArray(6475))));
    assertEquals(6574, convertToNumber(findNGE(convertToArray(6547))));
    assertEquals(6745, convertToNumber(findNGE(convertToArray(6574))));
    assertEquals(6754, convertToNumber(findNGE(convertToArray(6745))));
    assertEquals(7456, convertToNumber(findNGE(convertToArray(6754))));
    assertEquals(9199, convertToNumber(findNGE(convertToArray(1999))));
    assertEquals(-1, convertToNumber(findNGE(convertToArray(1999999999))));
  }
}
