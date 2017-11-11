package com.sl.algorithms.search;

import org.junit.Assert;
import org.junit.Test;

public class BinarySearchTest {

    @Test
    public void positiveTest() {
        int[] numArray = {1, 2, 3, 4, 5, 6};
        int numberToSearch = 4;
        Assert.assertEquals(3, BinarySearch.findIndex(numArray, numberToSearch));
    }

    @Test
    public void negativeTest() {
        int[] numArray = {1, 2, 3, 4, 5, 6};
        int numberToSearch = 10;
        Assert.assertEquals(BinarySearch.NUMBER_NOT_FOUND, BinarySearch.findIndex(numArray, numberToSearch));
    }

    @Test
    public void positiveTestFirstElement() {
        int[] numArray = {1, 2, 3, 4, 5, 6};
        int numberToSearch = 1;
        Assert.assertEquals(0, BinarySearch.findIndex(numArray, numberToSearch));
    }

    @Test
    public void positiveTestLastElement() {
        int[] numArray = {1, 2, 3, 4, 5, 6};
        int numberToSearch = 6;
        Assert.assertEquals(5, BinarySearch.findIndex(numArray, numberToSearch));
    }

    @Test
    public void largeSizeTest() {
        int size = Integer.MAX_VALUE/64;
        int[] numArray = new int[size];
        for (int i=0; i<size; i++) {
            numArray[i] = i;
        }
        int numberToSearch = 6;
        Assert.assertEquals(6, BinarySearch.findIndex(numArray, numberToSearch));
    }
}
