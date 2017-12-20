package com.sl.algorithms.core.sorting;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import static com.sl.algorithms.core.linear.array.ArrayOps.printArray;

public class WiggleSortTest extends SortingEngineTest {
    private static SortingEngine sortingEngine;

    @BeforeClass
    public static void setup() {
        sortingEngine = new WiggleSort();
    }

    @Test
    public void baseTests() {
        baseTests(sortingEngine);
    }

    @Test
    public void testWiggleSort() {
        {
            Integer[] sampleNumbers = new Integer[]{1,2,3,4,5};
            sortingEngine.sort(sampleNumbers);
            Assert.assertEquals("[1,3,2,5,4]", printArray(sampleNumbers));
        }
        {
            Integer[] sampleNumbers = new Integer[]{3,5,2,1,6,4};
            sortingEngine.sort(sampleNumbers);
            Assert.assertEquals("[3,5,1,6,2,4]", printArray(sampleNumbers));
        }
        {
            String[] sampleData = new String[]{"A","B","C","D","E"};
            sortingEngine.sort(sampleData);
            Assert.assertEquals("[A,C,B,E,D]", printArray(sampleData));
        }
    }
}
