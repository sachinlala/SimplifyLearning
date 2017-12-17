package com.sl.algorithms.core.linear;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ArrayOps<T> {

    private ArrayOps() {
        /**
         * This is a utility class.<br>
         */
    }

    public static String printArray(int[] a) {
        if (a == null || a.length == 0) {
            return "[]";
        }
        StringBuilder output = new StringBuilder("[");
        for (int i = 0; i < a.length-1; i++) {
            output = output.append(a[i]).append(",");
        }
        output.append(a[a.length-1]).append("]");
        return output.toString();
    }

    // O(n) time and O(1) space
    public static int[] reverse(int[] a, int start, int end) {
        while (start < end) {
            int temp = a[start];
            a[start] = a[end];
            a[end] = temp;
            ++start;
            --end;
        }
        return a;
    }

    public static boolean areEqual(int[] nums1, int[] nums2) {
        if (nums1.length != nums2.length) {
            return false;
        }
        Arrays.sort(nums1);
        Arrays.sort(nums2);
        for (int i=0; i<nums1.length; i++) {
            if (nums1[i] != nums2[i]) {
                return false;
            }
        }
        return true;
    }

    public static boolean areEqualBasedOnList(int[] nums1, int[] nums2) {
        List<Integer> list1 = new ArrayList<>();
        for (int num : nums1) {
            list1.add(num);
        }
        List<Integer> list2 = new ArrayList<>();
        for (int num : nums2) {
            list2.add(num);
        }
        return areEqual(list1, list2);
    }

    public static boolean areEqual(List<?> list1, List<?> list2) {
        List<?> intersection = new ArrayList<>(list1);
        intersection.removeAll(list2);
        if (intersection.size() == 0) {
            intersection = new ArrayList<>(list2);
            intersection.removeAll(list1);
        }
        return (intersection.size() == 0);
    }
}
