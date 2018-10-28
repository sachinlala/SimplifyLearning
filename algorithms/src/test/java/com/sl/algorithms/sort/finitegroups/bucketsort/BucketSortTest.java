package com.sl.algorithms.sort.finitegroups.bucketsort;

import static com.sl.algorithms.core.utils.ArrayOps.printArray;

import com.sl.algorithms.sort.BaseTest;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;

@SuppressWarnings("unchecked")
public class BucketSortTest extends BaseTest {

  private BucketSort<Double> bucketSort;

  @Test
  public void testFPBucketSort() {
    bucketSort = new FPBucketSort();
    assertBaseCases(bucketSort);
    { // all positive
      Double[] fpSeries = new Double[]{0.6, 0.4, 0.9};
      bucketSort.sort(fpSeries);
      Assert.assertEquals("[0.4,0.6,0.9]", printArray(fpSeries));
    }
    { // all positive
      Double[] fpSeries = new Double[]{0.9, 0.1, 0.2, 0.4, 0.9};
      bucketSort.sort(fpSeries);
      Assert.assertEquals("[0.1,0.2,0.4,0.9,0.9]", printArray(fpSeries));
    }
  }

  @Ignore //https://github.com/sachinlala/SimplifyLearning/issues/26
  @Test
  public void testFPBucketSortNegativeNumbers() {
    { // has negatives also
      Double[] fpSeries = new Double[]{-0.897, 0.565, 0.656, -0.1234, 0.0, 0.3434};
      bucketSort.sort(fpSeries);
      Assert.assertEquals("[-0.897,-0.1234,0.3434,0.565,0.656]", printArray(fpSeries));
    }
  }
}
