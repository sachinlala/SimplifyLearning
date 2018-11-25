package com.sl.algorithms.core.utils;

import com.sl.algorithms.core.interfaces.base.Constants;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ArrayOps implements Constants {

  ArrayOps() {
    /*
     * This is a utility class.<br>
     */
  }

  public static <T extends Comparable> void swap(T[] objects, int i, int j) {
    if (i == j) {
      return; // important
    }
    T temp = objects[i];
    objects[i] = objects[j];
    objects[j] = temp;
  }

  public static void swap(int[] nums, int i, int j) {
    if (i == j) {
      return; // important
    }
    int temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  }

  public static <T extends Comparable> void swapInBlocks(T[] a, int i1, int i2, int n) {
    for (int i = 0; i < n; i++) {
      T temp = a[i1 + i];
      a[i1 + i] = a[i2 + i];
      a[i2 + i] = temp;
    }
  }

  public static <T extends Comparable> void reverse(T[] objects) {
    // O(n) time and O(1) space
    reverse(objects, 0, objects.length - 1);
  }

  public static <T extends Comparable> void reverse(T[] objects, int start, int end) {
    while (start < end) {
      swap(objects, start++, end--);
    }
  }

  public static void reverse(int[] nums) {
    reverse(nums, 0, nums.length - 1);
  }

  public static void reverse(int[] nums, int start, int end) {
    while (start < end) {
      swap(nums, start++, end--);
    }
  }

  //O(n)
  public static <T> String printArray(T[] objects) {
    if (objects == null || objects.length == 0) {
      return "[]";
    }
    int l = objects.length;
    StringBuilder output = new StringBuilder("[");
    for (int i = 0; i < l - 1; i++) {
      output = output.append(objects[i]).append(DELIMITER_COMMA);
    }
    output.append(objects[l - 1]).append("]");
    return output.toString();
  }

  public static String printArray(int[] nums) {
    if (nums == null || nums.length == 0) {
      return "[]";
    }
    int l = nums.length;
    StringBuilder output = new StringBuilder("[");
    for (int i = 0; i < l - 1; i++) {
      output = output.append(nums[i]).append(DELIMITER_COMMA);
    }
    output.append(nums[l - 1]).append("]");
    return output.toString();
  }

  // O(nlog(n))
  public static <T> boolean haveSameData(T[] nums1, T[] nums2) {
    if (nums1.length != nums2.length) {
      return false;
    }
    Arrays.sort(nums1);
    Arrays.sort(nums2);
    for (int i = 0; i < nums1.length; i++) {
      if (nums1[i] != nums2[i]) {
        return false;
      }
    }
    return true;
  }

  public static <T> boolean haveSameDataBasedOnList(T[] nums1, T[] nums2) {
    return haveSameData(new ArrayList<>(Arrays.asList(nums1)),
        new ArrayList<>(Arrays.asList(nums2)));
  }

  public static <T> boolean haveSameData(List<T> list1, List<T> list2) {
    List<T> intersection = new ArrayList<>(list1);
    intersection.removeAll(list2);
    if (intersection.size() == 0) {
      intersection = new ArrayList<>(list2);
      intersection.removeAll(list1);
    }
    return (intersection.size() == 0);
  }

  public static boolean isMountain(int[] nums) {
    if (nums == null) {
      return false;
    }
    int n = nums.length;
    if (n < 3) {
      return false;
    }
    //search for peak
    int p = -1;
    for (int i = 1; i < (n - 1); i++) {
      if (nums[i - 1] < nums[i] && nums[i] > nums[i + 1]) {
        p = i;
      }
    }
    if (p == -1) {
      return false;
    }
    //assert ascent
    for (int i = 0; i < p; i++) {
      if (nums[i] >= nums[i + 1]) {
        return false;
      }
    }
    //assert descent
    for (int i = p; i < (n - 1); i++) {
      if (nums[i] <= nums[i + 1]) {
        return false;
      }
    }
    return true;
  }
}
