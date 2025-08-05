package com.sl.algorithms.core.strings.checks;

import com.sl.algorithms.core.interfaces.strings.checks.CharSymmetryChecker;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class LapindromeTest {

  private CharSymmetryChecker charSymmetryChecker = new Lapindrome();

  @Test
  public void assertNull() {
    assertFalse(charSymmetryChecker.isLapindrome(null));
  }

  @Test
  public void assertSingleCharString() {
    assertTrue(charSymmetryChecker.isLapindrome(" "));
    assertTrue(charSymmetryChecker.isLapindrome("x"));
  }

  @Test
  public void assertPositive() {
    assertTrue(charSymmetryChecker.isLapindrome("abcba"));
    assertTrue(charSymmetryChecker.isLapindrome("abcab"));
    assertTrue(charSymmetryChecker.isLapindrome("x"));
    assertTrue(charSymmetryChecker.isLapindrome("abba"));
    assertTrue(charSymmetryChecker.isLapindrome("abab"));
  }

  @Test
  public void assertNegative() {
    assertFalse(charSymmetryChecker.isLapindrome("median"));
  }
}
