package com.sl.algorithms.core.linear.array.transform;

import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.core.utils.ArrayOps.printArray;

@SuppressWarnings("unchecked")
public class ZeroesMoverTest<T extends Comparable> extends ZeroesMover<T> {

    private String resultStrZeroes = "[1,3,12,0,0]";
    private String resultStrNoZeroes = "[1,3,12]";
    private String resultStrNames = "[Knock,Knock,Tring,Tring]";
    private String resultStrNoTring = "[Happy,New,Year]";

    @Test
    public void testMoveZeroes() {
        {
            Integer[] nums1 = {0, 1, 0, 3, 12};
            moveZeroes((T[]) nums1);
            Assert.assertEquals(resultStrZeroes, printArray(nums1));
        }
        {
            Integer[] nums2 = new Integer[]{1, 3, 12};
            moveZeroes((T[]) nums2);
            Assert.assertEquals(resultStrNoZeroes, printArray(nums2));
        }
    }

    @Test
    public void testMoveZeroesNoSwap() {
        {
            Integer[] nums1 = {0, 1, 0, 3, 12};
            moveZeroesNoSwap((T[]) nums1);
            Assert.assertEquals(resultStrZeroes, printArray(nums1));
        }
        {
            Integer[] nums2 = new Integer[]{1, 3, 12};
            moveZeroesNoSwap((T[]) nums2);
            Assert.assertEquals(resultStrNoZeroes, printArray(nums2));
        }
    }

    @Test
    public void testMoveElementString() {
        {
            String[] names1 = new String[]{"Knock", "Tring", "Knock", "Tring"};
            moveElement((T[]) names1, (T) "Tring");
            Assert.assertEquals(resultStrNames, printArray(names1));
        }
        {
            String[] names2 = new String[]{"Happy", "New", "Year"};
            moveElement((T[]) names2, (T) "Diwali");
            Assert.assertEquals(resultStrNoTring, printArray(names2));
        }
    }

}
