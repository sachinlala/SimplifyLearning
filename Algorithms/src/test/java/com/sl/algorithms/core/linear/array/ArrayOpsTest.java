package com.sl.algorithms.core.linear.array;

import org.junit.Assert;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

public class ArrayOpsTest extends ArrayOps<Integer> {
    @Test
    public void testReverse() {
        int[] a = {1, 2, 3, 4, 5, 6};
        Assert.assertEquals("[3,2,1,4,5,6]", printArray(reverse(a, 0, 2)));
        Assert.assertEquals("[3,2,1,6,5,4]", printArray(reverse(a, 3, 5)));
        Assert.assertEquals("[4,5,6,1,2,3]", printArray(reverse(a, 0, 5)));
    }

    @Test
    public void testAreEqual() {
        int[] nums1 = {4, 2, 5};
        int[] nums2 = {1, 3, 4};
        Assert.assertFalse(areEqual(nums1, nums2));

        nums1 = new int[]{1, 2, 3, 0};
        nums2 = new int[]{0, 1, 2, 3};
        Assert.assertFalse(areEqual(nums1, nums2));

        nums1 = new int[]{1, 2, 3, 0, 0};
        nums2 = new int[]{0, 1, 2, 3};
        Assert.assertFalse(areEqual(nums1, nums2));

        nums1 = new int[]{1, 2, 3};
        nums2 = new int[]{1, 2, 3};
        Assert.assertTrue(areEqual(nums1, nums2));
    }

    @Test
    public void testHaveSameData() {
        int[] nums1 = {4, 2, 5};
        int[] nums2 = {1, 3, 4};
        Assert.assertFalse(haveSameData(nums1, nums2));

        nums1 = new int[]{1, 2, 3, 0};
        nums2 = new int[]{0, 1, 2, 3};
        Assert.assertTrue(haveSameData(nums1, nums2));

        nums1 = new int[]{1, 2, 3, 0, 0};
        nums2 = new int[]{0, 1, 2, 3};
        Assert.assertFalse(haveSameData(nums1, nums2));

        nums1 = new int[]{1, 2, 3};
        nums2 = new int[]{1, 2, 3};
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
        int[] nums1 = {1, 2, 3, 4, 5};
        int[] nums2 = {1, 2, 3, 4, 5, 6};
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
}