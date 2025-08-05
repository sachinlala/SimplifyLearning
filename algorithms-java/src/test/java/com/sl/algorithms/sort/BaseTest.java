package com.sl.algorithms.sort;

import static com.sl.algorithms.core.utils.ArrayOps.printArray;

import com.sl.algorithms.core.interfaces.sort.SortingEngine;
import com.sl.algorithms.core.list.ListNode;
import com.sl.algorithms.sort.generalpurpose.merge.MergeSort;
import com.sl.algorithms.sort.generalpurpose.smalldata.InsertionSort;
import static org.junit.jupiter.api.Assertions.*;

@SuppressWarnings("unchecked")
public class BaseTest {

  public void assertBaseCases(SortingEngine sortingEngine) {
    try {
      sortingEngine.sort(null);
      fail("Exception should've been raised");
    } catch (IllegalArgumentException iae) {
      assertNotNull(iae);
    }
    try {
      sortingEngine.sort(new Integer[]{});
      fail("Exception should've been raised");
    } catch (IllegalArgumentException iae) {
      assertNotNull(iae);
    }
    {
      Integer[] singleElementArray = new Integer[]{1};
      sortingEngine.sort(singleElementArray);
      assertEquals("[1]", printArray(singleElementArray));
    }
    {
      assertListSupport(sortingEngine);
    }
  }

  private void assertListSupport(SortingEngine sortingEngine) {
    Throwable throwable = null;
    ListNode<Integer> expectedOutput = null;
    try {
      expectedOutput = sortingEngine.sortList(new ListNode<>(1));
    } catch (Exception e) {
      throwable = e;
    }
    if (sortingEngine instanceof InsertionSort || sortingEngine instanceof MergeSort) {
      assertNull(throwable);
      assertEquals("[1]", expectedOutput.toString());
    } else {
      assertNull(expectedOutput);
      assertNotNull(throwable);
      assertTrue(throwable instanceof UnsupportedOperationException);
    }
  }
}
