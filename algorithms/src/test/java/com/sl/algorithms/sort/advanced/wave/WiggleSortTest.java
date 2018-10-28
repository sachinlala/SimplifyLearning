package com.sl.algorithms.sort.advanced.wave;

import static com.sl.algorithms.core.utils.ArrayOps.printArray;

import com.sl.algorithms.core.interfaces.sort.SortingEngine;
import com.sl.algorithms.sort.BaseTest;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

@SuppressWarnings("unchecked")
public class WiggleSortTest extends BaseTest {

  private SortingEngine sortingEngine;

  @Before
  public void setup() {
    sortingEngine = new WiggleSort();
  }

  @Test
  public void testWiggleSort() {
    {
      assertBaseCases(sortingEngine);
    }
    {
      Integer[] sampleNumbers = new Integer[]{1, 2, 3, 4, 5};
      sortingEngine.sort(sampleNumbers);
      Assert.assertEquals("[1,3,2,5,4]", printArray(sampleNumbers));
    }
    {
      Integer[] sampleNumbers = new Integer[]{3, 5, 2, 1, 6, 4};
      sortingEngine.sort(sampleNumbers);
      Assert.assertEquals("[3,5,1,6,2,4]", printArray(sampleNumbers));
    }
    {
      String[] sampleData = new String[]{"A", "B", "C", "D", "E"};
      sortingEngine.sort(sampleData);
      Assert.assertEquals("[A,C,B,E,D]", printArray(sampleData));
    }
    {
      Integer[] sampleNumbers = new Integer[]{1, 2, 2, 1, 1};
      sortingEngine.sort(sampleNumbers);
      Assert.assertEquals("[1,2,1,2,1]", printArray(sampleNumbers));
    }
  }
}
