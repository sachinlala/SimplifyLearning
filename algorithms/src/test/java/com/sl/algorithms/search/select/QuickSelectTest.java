package com.sl.algorithms.search.select;

import com.sl.algorithms.core.interfaces.select.QuickSelect;
import com.sl.algorithms.core.interfaces.shuffle.ShufflingEngine;
import com.sl.algorithms.search.median.QuickSelectMedianFinder;
import com.sl.algorithms.shuffle.NaiveShuffle;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class QuickSelectTest implements QuickSelect {

  private QuickSelect<Integer> integerQuickSelect;
  private ShufflingEngine<Integer> integerShufflingEngine;

  @Before
  public void setup() {
    integerQuickSelect = new QuickSelectMedianFinder<>();
    integerShufflingEngine = new NaiveShuffle<>();
  }

  @Test
  public void testKthSmallest() {
    {
      Integer[] sampleDataNegative = new Integer[]{-1, 2, 0};
      Assert.assertTrue(integerQuickSelect.findKthSmallest(sampleDataNegative, 2) == 0);
    }
    {
      Integer[] shuffled = new Integer[]{5, 4, 3, 1, 2};
      Assert.assertTrue(integerQuickSelect.findKthSmallest(shuffled, 2) == 2);
    }
    {
      Integer[] reversed = new Integer[]{7, 6, 5, 4, 3, 2, 1};
      Assert.assertTrue(integerQuickSelect.findKthSmallest(reversed, 2) == 2);
      integerShufflingEngine.shuffle(reversed);
      Assert.assertTrue(integerQuickSelect.findKthSmallest(reversed, 7) == 7);
    }
  }

  @Test
  public void testKthLargest() {
    {
      Integer[] sampleDataNegative = new Integer[]{-1, 2, 0};
      Assert.assertTrue(integerQuickSelect.findKthLargest(sampleDataNegative, 2) == 0);
    }
    {
      Integer[] shuffled = new Integer[]{5, 4, 3, 1, 2};
      Assert.assertTrue(integerQuickSelect.findKthLargest(shuffled, 2) == 4);
    }
    {
      Integer[] reversed = new Integer[]{7, 6, 5, 4, 3, 2, 1};
      Assert.assertTrue(integerQuickSelect.findKthLargest(reversed, 2) == 6);
      integerShufflingEngine.shuffle(reversed);
      Assert.assertTrue(integerQuickSelect.findKthLargest(reversed, 7) == 1);
    }
  }
}
