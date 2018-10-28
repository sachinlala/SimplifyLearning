package com.sl.algorithms.sort.finitegroups.integersorting;

/**
 * <br>O((n+radix)*(log(kMax))) runtime performance integer sort algorithm, where radix=10 for this
 * specific implementation.<br> <br>Depends on {@link CountingSort}<br> <br><a
 * href="https://brilliant.org/wiki/radix-sort/">Reference 1</a> <br><a
 * href="https://www.geeksforgeeks.org/radix-sort/">Reference 2</a>
 */
public class RadixSort<T extends Integer> extends CountingSort<T> {

  @Override
  public void sort(T[] nums) {
    checkArray(nums);
    int n = nums.length;
    if (n == 1) {
      return;
    }
    int kMax = findMax(nums);
    // e : digitPlace
    for (int e = 1; kMax > 0; e *= DECIMAL_RADIX, kMax /= 10) {
      countSort(nums, n, e, kMax);
    }
  }
}
