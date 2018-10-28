package com.sl.algorithms.sort.advanced.wave;

import static com.sl.algorithms.core.utils.ArrayOps.printArray;

import com.sl.algorithms.core.interfaces.sort.SortingEngine;
import com.sl.algorithms.sort.BaseTest;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

@SuppressWarnings("unchecked")
public class WiggleSortIITest extends BaseTest {

  private SortingEngine sortingEngine;

  @Before
  public void setup() {
    sortingEngine = new WiggleSortII();
  }

  @Test
  public void assertWaveForSortedList() {
    assertBaseCases(sortingEngine);
    {
      Integer[] sampleNumbers = new Integer[]{1, 2, 3, 4, 5};
      sortingEngine.sort(sampleNumbers);
      Assert.assertEquals("[3,5,1,4,2]", printArray(sampleNumbers));
    }
    {
      String[] sampleData = new String[]{"A", "B", "C", "D", "E"};
      sortingEngine.sort(sampleData);
      Assert.assertEquals("[C,E,A,D,B]", printArray(sampleData));
    }
  }

  @Test
  public void assertSmallSets() {
    {
      Integer[] sampleData = new Integer[]{1};
      sortingEngine.sort(sampleData);
      Assert.assertEquals("[1]", printArray(sampleData));
    }
    {
      Integer[] sampleData = new Integer[]{2, 1};
      sortingEngine.sort(sampleData);
      Assert.assertEquals("[1,2]", printArray(sampleData));
    }
  }

  @Test
  public void assertWaveForListWithDupes() {
    Integer[] sampleData = new Integer[]{2, 2, 2, 1, 1, 1};
    sortingEngine.sort(sampleData);
    Assert.assertEquals("[1,2,1,2,1,2]", printArray(sampleData));
  }

  @Test
  public void assertWaveForUnsortedList() {
    {
      Integer[] sampleNumbers = new Integer[]{3, 5, 2, 1, 6, 4};
      sortingEngine.sort(sampleNumbers);
      Assert.assertEquals("[3,6,2,4,1,5]", printArray(sampleNumbers));
    }
    {
      String[] sampleData = new String[]{"E", "A", "B", "D", "C"};
      sortingEngine.sort(sampleData);
      Assert.assertEquals("[C,E,A,D,B]", printArray(sampleData));
    }
  }
}
