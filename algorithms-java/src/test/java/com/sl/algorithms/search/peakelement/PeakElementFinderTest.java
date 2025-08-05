package com.sl.algorithms.search.peakelement;


import com.sl.algorithms.core.interfaces.search.PeakElementFinder;
import static org.junit.jupiter.api.Assertions.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.anyOf;
import static org.hamcrest.Matchers.is;
import org.junit.jupiter.api.Test;

@SuppressWarnings("unchecked")
public class PeakElementFinderTest<T extends Comparable> {

  private PeakElementFinder peakElementFinder;

  @Test
  public void testLinearTimePEFinder() {
    peakElementFinder = new LinearTimePEFinder();
    testFindPeakElement();
  }

  @Test
  public void testLogTimePEFinder() {
    peakElementFinder = new LogTimePEFinder();
    testFindPeakElement();
  }

  private void testFindPeakElement() {
    try {
      peakElementFinder.findPeakElement(null);
      fail("Test should have failed as the array is empty");
    } catch (IllegalArgumentException iea) {
      assertNotNull(iea);
    }
    try {
      peakElementFinder.findPeakElement(new Integer[]{});
      fail("Test should have failed as the array is empty");
    } catch (IllegalArgumentException iea) {
      assertNotNull(iea);
    }
    assertEquals(1, peakElementFinder.findPeakElement(new Integer[]{1}));
    assertEquals(0, peakElementFinder.findPeakElement(new Integer[]{-1, 0}));
    assertEquals(3, peakElementFinder.findPeakElement(new Integer[]{1, 2, 3, 2, 1}));
    assertEquals(3,
        peakElementFinder.findPeakElement(new Integer[]{-15, -10, 0, 1, 2, 3, -1, -10, -15}));
    assertEquals(3, peakElementFinder.findPeakElement(new Integer[]{1, 2, 3, 1}));
    assertEquals(2, peakElementFinder.findPeakElement(new Integer[]{1, 2}));
    assertEquals(3, peakElementFinder.findPeakElement(new Integer[]{1, 3, 2, 1, 2, 3, 1}));
    assertEquals(3, peakElementFinder.findPeakElement(new Integer[]{1, 2, 1, 2, 3, 1}));
    assertEquals(3, peakElementFinder.findPeakElement(new Integer[]{1, 3, 2, 1, 2, 1}));
    assertThat(peakElementFinder.findPeakElement(new Integer[]{1, 3, 1, 2, 2, 1}),
        anyOf(is(2), is(3)));
  }
}
