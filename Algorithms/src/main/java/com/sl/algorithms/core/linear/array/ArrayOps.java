package com.sl.algorithms.core.linear.array;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ArrayOps<T extends Comparable> {

    ArrayOps() {
        /**
         * This is a utility class.<br>
         */
    }

    public static void swap(Comparable[] objects, int i, int j) {
        Comparable temp = objects[i];
        objects[i] = objects[j];
        objects[j] = temp;
        return;
    }

    //O(n)
    public static <T> String printArray(T[] a) {
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
    public static <T> T[] reverse(T[] a, int start, int end) {
        while (start < end) {
            T temp = a[start];
            a[start] = a[end];
            a[end] = temp;
            ++start;
            --end;
        }
        return a;
    }

    // O(nlog(n))
    public static <T> boolean haveSameData(T[] nums1, T[] nums2) {
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

    public static <T> boolean haveSameDataBasedOnList(T[] nums1, T[] nums2) {
        List<T> list1 = new ArrayList<>();
        for (T num : nums1) {
            list1.add(num);
        }
        List<T> list2 = new ArrayList<>();
        for (T num : nums2) {
            list2.add(num);
        }
        return haveSameData(list1, list2);
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
}
