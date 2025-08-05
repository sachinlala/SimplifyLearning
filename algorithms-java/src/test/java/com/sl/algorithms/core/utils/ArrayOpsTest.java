package com.sl.algorithms.core.utils;

import java.util.ArrayList;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class ArrayOpsTest extends ArrayOps {

  @Test
  public void testReverse() {
    int[] a = {1, 2, 3, 4, 5, 6};
    {
      reverse(a);
      assertEquals("[6,5,4,3,2,1]", printArray(a));
    }
    {
      reverse(a);
      assertEquals("[1,2,3,4,5,6]", printArray(a));
    }
  }

  @Test
  public void testReverseObj() {
    Integer[] a = {1, 2, 3, 4, 5, 6};
    {
      reverse(a);
      assertEquals("[6,5,4,3,2,1]", printArray(a));
    }
    {
      reverse(a);
      assertEquals("[1,2,3,4,5,6]", printArray(a));
    }
  }

  @Test
  public void testReverseInRange() {
    Integer[] a = {1, 2, 3, 4, 5, 6};
    {
      reverse(a, 0, 2);
      assertEquals("[3,2,1,4,5,6]", printArray(a));
    }
    {
      reverse(a, 3, 5);
      assertEquals("[3,2,1,6,5,4]", printArray(a));
    }
    {
      reverse(a, 0, 5);
      assertEquals("[4,5,6,1,2,3]", printArray(a));
    }
  }

  @Test
  public void testHaveSameData() {
    Integer[] nums1 = {4, 2, 5};
    Integer[] nums2 = {1, 3, 4};
    assertFalse(haveSameData(nums1, nums2));

    nums1 = new Integer[]{1, 2, 3, 0};
    nums2 = new Integer[]{0, 1, 2, 3};
    assertTrue(haveSameData(nums1, nums2));

    nums1 = new Integer[]{1, 2, 3, 0, 0};
    nums2 = new Integer[]{0, 1, 2, 3};
    assertFalse(haveSameData(nums1, nums2));

    nums1 = new Integer[]{1, 2, 3};
    nums2 = new Integer[]{1, 2, 3};
    assertTrue(haveSameData(nums1, nums2));
    assertTrue(haveSameDataBasedOnList(nums1, nums2));

    List<Integer> list1 = new ArrayList<>();
    for (int num : nums1) {
      list1.add(num);
    }
    List<Integer> list2 = new ArrayList<>();
    for (int num : nums2) {
      list2.add(num);
    }
    assertTrue(haveSameData(list1, list2));
  }

  @Test
  public void testHaveSameDataNegative() {
    Integer[] nums1 = {1, 2, 3, 4, 5};
    Integer[] nums2 = {1, 2, 3, 4, 5, 6};
    assertFalse(haveSameData(nums1, nums2));
    assertFalse(haveSameDataBasedOnList(nums1, nums2));

    List<Integer> list1 = new ArrayList<>();
    for (int num : nums1) {
      list1.add(num);
    }
    List<Integer> list2 = new ArrayList<>();
    for (int num : nums2) {
      list2.add(num);
    }
    assertFalse(haveSameData(list1, list2));
  }

  @Test
  public void testIsMountain() {
    assertFalse(isMountain(null));
    assertFalse(isMountain(new int[]{1}));
    assertFalse(isMountain(new int[]{1, 2}));
    assertFalse(isMountain(new int[]{1, 2, 3}));
    assertTrue(isMountain(new int[]{1, 3, 2}));
    assertFalse(isMountain(new int[]{2, 1}));
    assertTrue(isMountain(new int[]{1, 2, 1}));
    assertTrue(isMountain(new int[]{1, 3, 4, 5, 2, 0}));
    assertFalse(isMountain(new int[]{1, 4, 3, 5, 2, 0}));
    assertFalse(isMountain(new int[]{3, 5, 5}));
    assertFalse(isMountain(
        new int[]{14, 82, 89, 84, 79, 70, 70, 68, 67, 66, 63, 60, 58, 54, 44, 43, 32, 28, 26, 25,
            22, 15, 13, 12, 10, 8, 7, 5, 4, 3}));
    assertTrue(isMountain(new int[]{0, 3, 2, 1}));
  }
}
