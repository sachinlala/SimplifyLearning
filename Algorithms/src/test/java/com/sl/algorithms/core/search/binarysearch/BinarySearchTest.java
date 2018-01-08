package com.sl.algorithms.core.search.binarysearch;

import com.sl.algorithms.core.interfaces.search.BinarySearch;
import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.core.interfaces.search.BinarySearch.NUMBER_NOT_FOUND;

@SuppressWarnings("unchecked")
public class BinarySearchTest {
    
    private BinarySearch binarySearch;
    
    @Test
    public void testFindIndexRecursively() {
        binarySearch = new BinarySearchRecursive();
        Assert.assertEquals(3, binarySearch.findIndex(new Integer[]{1, 2, 3, 4, 5, 6}, 4));
        Assert.assertEquals(NUMBER_NOT_FOUND, binarySearch.findIndex(new Integer[]{1, 2, 3, 4, 5, 6}, 10));
        Assert.assertEquals(0, binarySearch.findIndex(new Integer[]{1, 2, 3, 4, 5, 6}, 1));
        Assert.assertEquals(5, binarySearch.findIndex(new Integer[]{1, 2, 3, 4, 5, 6}, 6));
    }

    @Test
    public void testFindIndexIteratively() {
        binarySearch = new BinarySearchIterative();
        Assert.assertEquals(3, binarySearch.findIndex(new Integer[]{1, 2, 3, 4, 5, 6}, 4));
        Assert.assertEquals(NUMBER_NOT_FOUND, binarySearch.findIndex(new Integer[]{1, 2, 3, 4, 5, 6}, 10));
        Assert.assertEquals(0, binarySearch.findIndex(new Integer[]{1, 2, 3, 4, 5, 6}, 1));
        Assert.assertEquals(5, binarySearch.findIndex(new Integer[]{1, 2, 3, 4, 5, 6}, 6));
    }

    @Test
    public void largeSizeTest() {
        binarySearch = new BinarySearchRecursive();
        int size = Integer.MAX_VALUE / 256; // /64 is w/in limits when primitive int[] is used
        Integer[] numArray = new Integer[size];
        for (int i = 0; i < size; i++) {
            numArray[i] = i;
        }
        Assert.assertEquals(6, binarySearch.findIndex(numArray, 6));
        Assert.assertEquals(65535, binarySearch.findIndex(numArray, 65535));
    }
}
