package com.sl.algorithms.core;

import org.junit.Assert;
import org.junit.Test;

public class BinarySearchTest extends BinarySearch {

    @Test
    public void testFindIndexRecursively() {
        Assert.assertEquals(3, findIndex(new int[]{1, 2, 3, 4, 5, 6}, 4));
        Assert.assertEquals(NUMBER_NOT_FOUND, findIndex(new int[]{1, 2, 3, 4, 5, 6}, 10));
        Assert.assertEquals(0, findIndex(new int[]{1, 2, 3, 4, 5, 6}, 1));
        Assert.assertEquals(5, findIndex(new int[]{1, 2, 3, 4, 5, 6}, 6));
    }

    @Test
    public void testFindIndexIteratively() {
        Assert.assertEquals(3, findIndexIteratively(new int[]{1, 2, 3, 4, 5, 6}, 4));
        Assert.assertEquals(NUMBER_NOT_FOUND, findIndexIteratively(new int[]{1, 2, 3, 4, 5, 6}, 10));
        Assert.assertEquals(0, findIndexIteratively(new int[]{1, 2, 3, 4, 5, 6}, 1));
        Assert.assertEquals(5, findIndexIteratively(new int[]{1, 2, 3, 4, 5, 6}, 6));
    }

    @Test
    public void largeSizeTest() {
        int size = Integer.MAX_VALUE / 64;
        int[] numArray = new int[size];
        for (int i = 0; i < size; i++) {
            numArray[i] = i;
        }
        int numberToSearch = 6;
        Assert.assertEquals(6, findIndex(numArray, numberToSearch));
    }
}
