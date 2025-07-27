package com.sl.algorithms.search.select;

import com.sl.algorithms.core.interfaces.select.QuickSelect;
import com.sl.algorithms.core.interfaces.shuffle.ShufflingEngine;
import com.sl.algorithms.search.median.QuickSelectMedianFinder;
import com.sl.algorithms.shuffle.NaiveShuffle;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class QuickSelectTest implements QuickSelect {

  private QuickSelect<Integer> integerQuickSelect;
  private ShufflingEngine<Integer> integerShufflingEngine;

  @BeforeEach
  public void setup() {
    integerQuickSelect = new QuickSelectMedianFinder<>();
    integerShufflingEngine = new NaiveShuffle<>();
  }

  @Test
  public void testKthSmallest() {
    {
      Integer[] sampleDataNegative = new Integer[]{-1, 2, 0};
      assertTrue(integerQuickSelect.findKthSmallest(sampleDataNegative, 2) == 0);
    }
    {
      Integer[] shuffled = new Integer[]{5, 4, 3, 1, 2};
      assertTrue(integerQuickSelect.findKthSmallest(shuffled, 2) == 2);
    }
    {
      Integer[] reversed = new Integer[]{7, 6, 5, 4, 3, 2, 1};
      assertTrue(integerQuickSelect.findKthSmallest(reversed, 2) == 2);
      integerShufflingEngine.shuffle(reversed);
      assertTrue(integerQuickSelect.findKthSmallest(reversed, 7) == 7);
    }
  }

  @Test
  public void testKthLargest() {
    {
      Integer[] sampleDataNegative = new Integer[]{-1, 2, 0};
      assertTrue(integerQuickSelect.findKthLargest(sampleDataNegative, 2) == 0);
    }
    {
      Integer[] shuffled = new Integer[]{5, 4, 3, 1, 2};
      assertTrue(integerQuickSelect.findKthLargest(shuffled, 2) == 4);
    }
    {
      Integer[] reversed = new Integer[]{7, 6, 5, 4, 3, 2, 1};
      assertTrue(integerQuickSelect.findKthLargest(reversed, 2) == 6);
      integerShufflingEngine.shuffle(reversed);
      assertTrue(integerQuickSelect.findKthLargest(reversed, 7) == 1);
    }
  }
}
