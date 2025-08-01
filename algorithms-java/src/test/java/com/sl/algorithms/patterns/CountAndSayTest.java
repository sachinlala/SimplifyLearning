package com.sl.algorithms.patterns;

import static com.sl.algorithms.patterns.CountAndSay.compute;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class CountAndSayTest {

  @Test
  public void assertBaseCases() {
    assertEquals("1", compute(1, 0));
  }

  @Test
  public void assertNegativeCases() {
    assertTrue(assertExceptionThrown(-1, 0));
    assertTrue(assertExceptionThrown(0, 0));
    assertTrue(assertExceptionThrown(1, -99999));
    assertTrue(assertExceptionThrown(1, Integer.MAX_VALUE));
  }

  private boolean assertExceptionThrown(final int n, final int rowNumber) {
    try {
      compute(n, rowNumber);
    } catch (final Exception e) {
      return true;
    }
    return false;
  }

}
