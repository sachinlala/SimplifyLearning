package com.sl.algorithms.core.strings.checks;

import com.sl.algorithms.core.interfaces.strings.checks.CharSymmetryChecker;
import org.junit.Assert;
import org.junit.Test;

public class LapindromeTest {

  private CharSymmetryChecker charSymmetryChecker = new Lapindrome();

  @Test
  public void assertNull() {
    Assert.assertFalse(charSymmetryChecker.isLapindrome(null));
  }

  @Test
  public void assertSingleCharString() {
    Assert.assertTrue(charSymmetryChecker.isLapindrome(" "));
    Assert.assertTrue(charSymmetryChecker.isLapindrome("x"));
  }

  @Test
  public void assertPositive() {
    Assert.assertTrue(charSymmetryChecker.isLapindrome("abcba"));
    Assert.assertTrue(charSymmetryChecker.isLapindrome("abcab"));
    Assert.assertTrue(charSymmetryChecker.isLapindrome("x"));
    Assert.assertTrue(charSymmetryChecker.isLapindrome("abba"));
    Assert.assertTrue(charSymmetryChecker.isLapindrome("abab"));
  }

  @Test
  public void assertNegative() {
    Assert.assertFalse(charSymmetryChecker.isLapindrome("median"));
  }
}
