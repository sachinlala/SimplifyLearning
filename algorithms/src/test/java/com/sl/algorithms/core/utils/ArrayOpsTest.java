package com.sl.algorithms.core.utils;

import java.util.ArrayList;
import java.util.List;
import org.junit.Assert;
import org.junit.Test;

public class ArrayOpsTest extends ArrayOps {

  @Test
  public void testReverse() {
    int[] a = {1, 2, 3, 4, 5, 6};
    {
      reverse(a);
      Assert.assertEquals("[6,5,4,3,2,1]", printArray(a));
    }
    {
      reverse(a);
      Assert.assertEquals("[1,2,3,4,5,6]", printArray(a));
    }
  }

  @Test
  public void testReverseObj() {
    Integer[] a = {1, 2, 3, 4, 5, 6};
    {
      reverse(a);
      Assert.assertEquals("[6,5,4,3,2,1]", printArray(a));
    }
    {
      reverse(a);
      Assert.assertEquals("[1,2,3,4,5,6]", printArray(a));
    }
  }

  @Test
  public void testReverseInRange() {
    Integer[] a = {1, 2, 3, 4, 5, 6};
    {
      reverse(a, 0, 2);
      Assert.assertEquals("[3,2,1,4,5,6]", printArray(a));
    }
    {
      reverse(a, 3, 5);
      Assert.assertEquals("[3,2,1,6,5,4]", printArray(a));
    }
    {
      reverse(a, 0, 5);
      Assert.assertEquals("[4,5,6,1,2,3]", printArray(a));
    }
  }

  @Test
  public void testHaveSameData() {
    Integer[] nums1 = {4, 2, 5};
    Integer[] nums2 = {1, 3, 4};
    Assert.assertFalse(haveSameData(nums1, nums2));

    nums1 = new Integer[]{1, 2, 3, 0};
    nums2 = new Integer[]{0, 1, 2, 3};
    Assert.assertTrue(haveSameData(nums1, nums2));

    nums1 = new Integer[]{1, 2, 3, 0, 0};
    nums2 = new Integer[]{0, 1, 2, 3};
    Assert.assertFalse(haveSameData(nums1, nums2));

    nums1 = new Integer[]{1, 2, 3};
    nums2 = new Integer[]{1, 2, 3};
    Assert.assertTrue(haveSameData(nums1, nums2));
    Assert.assertTrue(haveSameDataBasedOnList(nums1, nums2));

    List<Integer> list1 = new ArrayList<>();
    for (int num : nums1) {
      list1.add(num);
    }
    List<Integer> list2 = new ArrayList<>();
    for (int num : nums2) {
      list2.add(num);
    }
    Assert.assertTrue(haveSameData(list1, list2));
  }

  @Test
  public void testHaveSameDataNegative() {
    Integer[] nums1 = {1, 2, 3, 4, 5};
    Integer[] nums2 = {1, 2, 3, 4, 5, 6};
    Assert.assertFalse(haveSameData(nums1, nums2));
    Assert.assertFalse(haveSameDataBasedOnList(nums1, nums2));

    List<Integer> list1 = new ArrayList<>();
    for (int num : nums1) {
      list1.add(num);
    }
    List<Integer> list2 = new ArrayList<>();
    for (int num : nums2) {
      list2.add(num);
    }
    Assert.assertFalse(haveSameData(list1, list2));
  }

  @Test
  public void testIsMountain() {
    Assert.assertFalse(isMountain(null));
    Assert.assertFalse(isMountain(new int[]{1}));
    Assert.assertFalse(isMountain(new int[]{1, 2}));
    Assert.assertFalse(isMountain(new int[]{1, 2, 3}));
    Assert.assertTrue(isMountain(new int[]{1, 3, 2}));
    Assert.assertFalse(isMountain(new int[]{2, 1}));
    Assert.assertTrue(isMountain(new int[]{1, 2, 1}));
    Assert.assertTrue(isMountain(new int[]{1, 3, 4, 5, 2, 0}));
    Assert.assertFalse(isMountain(new int[]{1, 4, 3, 5, 2, 0}));
    Assert.assertFalse(isMountain(new int[]{3, 5, 5}));
    Assert.assertFalse(isMountain(
        new int[]{14, 82, 89, 84, 79, 70, 70, 68, 67, 66, 63, 60, 58, 54, 44, 43, 32, 28, 26, 25,
            22, 15, 13, 12, 10, 8, 7, 5, 4, 3}));
    Assert.assertTrue(isMountain(new int[]{0, 3, 2, 1}));
  }
}
