package com.sl.algorithms.core.search.binarysearch;

import com.sl.algorithms.core.interfaces.search.BinarySearch;
import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.core.interfaces.search.BinarySearch.NUMBER_NOT_FOUND;
import static org.hamcrest.CoreMatchers.anyOf;
import static org.hamcrest.CoreMatchers.is;

@SuppressWarnings("unchecked")
public class BinarySearchTest {
    
    private BinarySearch binarySearch;
    
    @Test
    public void testBinarySearchRecursive() {
        binarySearch = new BinarySearchRecursive();
        testFindIndex();
    }

    @Test
    public void testBinarySearchIterative() {
        binarySearch = new BinarySearchIterative();
        testFindIndex();
    }

    @Test
    public void testBinarySearchGeneric() {
        binarySearch = new BinarySearchGeneric();
        testFindIndex();
        testFindIndexInRotatedArray();
    }

    private void testFindIndex() {
        Assert.assertEquals(3, binarySearch.findIndex(new Integer[]{1, 2, 3, 4, 5, 6}, 4));
        Assert.assertEquals(NUMBER_NOT_FOUND, binarySearch.findIndex(new Integer[]{1, 2, 3, 4, 5, 6}, 10));
        Assert.assertEquals(0, binarySearch.findIndex(new Integer[]{1, 2, 3, 4, 5, 6}, 1));
        Assert.assertEquals(5, binarySearch.findIndex(new Integer[]{1, 2, 3, 4, 5, 6}, 6));
    }

    private void testFindIndexInRotatedArray() {
        { // sorted & rotated array
            Assert.assertEquals(3, binarySearch.findIndex(new Integer[]{4, 5, 1, 2, 3}, 2));
            Assert.assertEquals(0, binarySearch.findIndex(new Integer[]{4, 5, 1, 2, 3}, 4));
            Assert.assertEquals(2, binarySearch.findIndex(new Integer[]{4, 5, 1, 2, 3}, 1));
            Assert.assertEquals(1, binarySearch.findIndex(new Integer[]{3, 4, 5, 1, 2}, 4));
            Assert.assertEquals(3, binarySearch.findIndex(new Integer[]{3, 4, 5, 1, 2}, 1));
            Assert.assertEquals(2, binarySearch.findIndex(new Integer[]{3, 4, 5, 1, 2}, 5));
            Assert.assertEquals(0, binarySearch.findIndex(new Integer[]{3, 4, 5, 1, 2}, 3));
            Assert.assertEquals(4, binarySearch.findIndex(new Integer[]{3, 4, 5, 1, 2}, 2));
            Assert.assertEquals(3, binarySearch.findIndex(new Integer[]{6, 7, 1, 2, 3, 4, 5}, 2));
            Assert.assertEquals(1, binarySearch.findIndex(new Integer[]{6, 7, 1, 2, 3, 4, 5}, 7));
            Assert.assertEquals(6, binarySearch.findIndex(new Integer[]{6, 7, 1, 2, 3, 4, 5}, 5));
        }
        { // sorted, rotated array, with duplicates
            Assert.assertEquals(0, binarySearch.findIndex(new Integer[]{3, 3, 4, 5, 1, 2}, 3));
            Assert.assertEquals(2, binarySearch.findIndex(new Integer[]{3, 3, 4, 5, 1, 2}, 4));
            Assert.assertEquals(3, binarySearch.findIndex(new Integer[]{3, 3, 4, 5, 1, 2}, 5));
            Assert.assertEquals(4, binarySearch.findIndex(new Integer[]{3, 3, 4, 5, 1, 2}, 1));
            Assert.assertEquals(5, binarySearch.findIndex(new Integer[]{3, 3, 4, 5, 1, 2}, 2));
            Assert.assertEquals(0, binarySearch.findIndex(new Integer[]{3, 3, 1}, 3));
            Assert.assertThat(binarySearch.findIndex(new Integer[]{1, 1, 1}, 1), anyOf(is(1), is(0))); // special case
        }
    }
    @Test
    public void testFindStartOfRotation() {
        binarySearch = new BinarySearchGeneric();
        { // single element
            Assert.assertEquals(0, ((BinarySearchGeneric) binarySearch).findStartOfAscent(new Integer[]{1}));
        }
        { // regular sorted array
            Assert.assertEquals(0, ((BinarySearchGeneric) binarySearch).findStartOfAscent(new Integer[]{1, 2, 3, 4, 5}));
        }
        { // sorted array, with duplicates
            Assert.assertEquals(0, ((BinarySearchGeneric) binarySearch).findStartOfAscent(new Integer[]{1, 2, 3, 3, 4, 5}));
        }
        { // sorted & rotated array
            Assert.assertEquals(2, ((BinarySearchGeneric) binarySearch).findStartOfAscent(new Integer[]{4, 5, 1, 2, 3}));
            Assert.assertEquals(3, ((BinarySearchGeneric) binarySearch).findStartOfAscent(new Integer[]{3, 4, 5, 1, 2}));
        }
        { // sorted, rotated array, with duplicates
            Assert.assertEquals(4, ((BinarySearchGeneric) binarySearch).findStartOfAscent(new Integer[]{3, 3, 4, 5, 1, 2}));
            Assert.assertEquals(2, ((BinarySearchGeneric) binarySearch).findStartOfAscent(new Integer[]{3, 3, 1}));
            Assert.assertEquals(0, ((BinarySearchGeneric) binarySearch).findStartOfAscent(new Integer[]{1, 1, 1}));
        }
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
