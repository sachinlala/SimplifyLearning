package com.sl.algorithms.core;

import org.junit.Assert;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static com.sl.algorithms.core.ArrayOps.*;

public class ArrayOpsTest {
    @Test
    public void testReverse() {
        int[] a = {1, 2, 3, 4, 5, 6};
        Assert.assertEquals("[3,2,1,4,5,6]", printArray(reverse(a, 0, 2)));
        Assert.assertEquals("[3,2,1,6,5,4]", printArray(reverse(a, 3, 5)));
        Assert.assertEquals("[4,5,6,1,2,3]", printArray(reverse(a, 0, 5)));
    }

    @Test
    public void testAreEqual() {
        int[] nums1 = {1, 2, 3, 4, 5};
        int[] nums2 = {1, 2, 3, 4, 5};
        Assert.assertTrue(areEqual(nums1, nums2));

        List<Integer> list1 = new ArrayList<>();
        for (int num : nums1) {
            list1.add(num);
        }
        List<Integer> list2 = new ArrayList<>();
        for (int num : nums2) {
            list2.add(num);
        }
        Assert.assertTrue(areEqual(list1, list2));
    }

    @Test
    public void testAreEqualNegative() {
        int[] nums1 = {1, 2, 3, 4, 5};
        int[] nums2 = {1, 2, 3, 4, 5, 6};
        Assert.assertFalse(areEqual(nums1, nums2));

        List<Integer> list1 = new ArrayList<>();
        for (int num : nums1) {
            list1.add(num);
        }
        List<Integer> list2 = new ArrayList<>();
        for (int num : nums2) {
            list2.add(num);
        }
        Assert.assertFalse(areEqual(list1, list2));
    }
}