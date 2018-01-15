package com.sl.algorithms.core.sorting.finitegroups;

import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.core.utils.ArrayOps.printArray;

public class ZeroesMoverTest {

    @Test
    public void testMoveZeroesRight() {
        ZeroesMover<Integer> zeroesMover = new ZeroesMover<>();
        Integer zero = 0;
        {
            Integer[] nums1 = {0, 1, 0, 3, 12};
            zeroesMover.consolidate(nums1, zero, true);
            Assert.assertEquals("[1,3,12,0,0]", printArray(nums1));
        }
        {
            Integer[] nums2 = new Integer[]{1, 3, 12};
            zeroesMover.consolidate(nums2, zero, true);
            Assert.assertEquals("[1,3,12]", printArray(nums2));
        }
        ZeroesMover<String> stringMover = new ZeroesMover<>();
        {
            String[] names1 = new String[]{"Knock", "Tring", "Knock", "Tring"};
            stringMover.consolidate(names1, "Tring", true);
            Assert.assertEquals("[Knock,Knock,Tring,Tring]", printArray(names1));
        }
        {
            String[] names2 = new String[]{"Happy", "New", "Year"};
            stringMover.consolidate(names2, "Diwali", true);
            Assert.assertEquals("[Happy,New,Year]", printArray(names2));
        }
    }

    @Test
    public void testMoveZeroesLeft() {
        ZeroesMover<Integer> zeroesMover = new ZeroesMover<>();
        Integer zero = 0;
        {
            Integer[] nums1 = {0, 1, 0, 3, 12};
            zeroesMover.consolidate(nums1, zero, false);
            Assert.assertEquals("[0,0,1,3,12]", printArray(nums1));
        }
        {
            Integer[] nums2 = new Integer[]{1, 3, 12};
            zeroesMover.consolidate(nums2, zero, false);
            Assert.assertEquals("[1,3,12]", printArray(nums2));
        }
        ZeroesMover<String> stringMover = new ZeroesMover<>();
        {
            String[] names1 = new String[]{"Knock", "Tring", "Knock", "Tring"};
            stringMover.consolidate(names1, "Tring", false);
            Assert.assertEquals("[Tring,Tring,Knock,Knock]", printArray(names1));
        }
        {
            String[] names2 = new String[]{"Happy", "New", "Year"};
            stringMover.consolidate(names2, "Diwali", false);
            Assert.assertEquals("[Happy,New,Year]", printArray(names2));
        }
    }
}
