package com.sl.algorithms.core.sorting.finitegroups;

import com.sl.algorithms.core.interfaces.rwops.SortingEngine;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;

public class CountingSortTest {

    private SortingEngine<Integer> integerSortingEngineMax5;
    private SortingEngine<Integer> integerSortingEngineMax10;

    @Before
    public void setup() {
        integerSortingEngineMax5 = new CountingSort<>(5);
        integerSortingEngineMax10 = new CountingSort<>(10);
    }

    @Test
    public void testCountingSortMax5() {
        {
            Integer[] testData = new Integer[]{4, 5, 5, 0, 1, 2, 2, 0};
            Integer[] sortedData = new Integer[]{0, 0, 1, 2, 2, 4, 5, 5};
            integerSortingEngineMax5.sort(testData);
            Assert.assertTrue(Arrays.equals(testData, sortedData));
        }
        { // almost sorted
            Integer[] testData = new Integer[]{1, 2, 3, 5, 4};
            Integer[] sortedData = new Integer[]{1, 2, 3, 4, 5};
            integerSortingEngineMax5.sort(testData);
            Assert.assertTrue(Arrays.equals(testData, sortedData));
        }
    }

    @Test
    public void testCountingSortMax10() {
        { // 1->k-1 are present
            Integer[] testData = new Integer[]{5, 7, 6, 1, 3, 1, 2, 3, 4, 4, 2, 2, 3, 1, 2, 8, 5, 6, 9, 1, 2, 8, 6, 7};
            Integer[] sortedData = new Integer[]{1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 6, 6, 6, 7, 7, 8, 8, 9};
            integerSortingEngineMax10.sort(testData);
            Assert.assertTrue(Arrays.equals(testData, sortedData));
        }
        { // max number present is significantly less than k
            Integer[] testData = new Integer[]{1, 2, 3, 5, 4};
            Integer[] sortedData = new Integer[]{1, 2, 3, 4, 5};
            integerSortingEngineMax10.sort(testData);
            Assert.assertTrue(Arrays.equals(testData, sortedData));
        }
        { // 1->k are present
            Integer[] testData = new Integer[]{5, 7, 6, 1, 3, 1, 2, 10, 3, 4, 4, 2, 2, 3, 1, 2, 8, 5, 6, 9, 1, 2, 8, 6, 7};
            Integer[] sortedData = new Integer[]{1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 6, 6, 6, 7, 7, 8, 8, 9, 10};
            integerSortingEngineMax10.sort(testData);
            Assert.assertTrue(Arrays.equals(testData, sortedData));
        }
        { // 0->k are present
            Integer[] testData = new Integer[]{5, 7, 0, 6, 1, 3, 1, 2, 10, 3, 0, 4, 4, 2, 2, 3, 1, 2, 8, 5, 6, 9, 1, 2, 8, 6, 7};
            Integer[] sortedData = new Integer[]{0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 6, 6, 6, 7, 7, 8, 8, 9, 10};
            integerSortingEngineMax10.sort(testData);
            Assert.assertTrue(Arrays.equals(testData, sortedData));
        }
    }
}
