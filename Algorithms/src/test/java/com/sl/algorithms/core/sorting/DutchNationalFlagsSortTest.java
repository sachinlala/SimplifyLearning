package com.sl.algorithms.core.sorting;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import static com.sl.algorithms.core.linear.array.ArrayOps.printArray;

public class DutchNationalFlagsSortTest extends SortingEngineTest {
    private static SortingEngine sortingEngine;

    @BeforeClass
    public static void setup() {
        sortingEngine = new DutchNationalFlagsSort();
    }

    @Test
    public void baseTests() {
        baseTests(sortingEngine);
    }

    @Test
    public void testDNESort() {
        {
            Integer[] sampleNumbers = new Integer[]{2,0,1,0,1,0,0,2,2};
            sortingEngine.sort(sampleNumbers);
            Assert.assertEquals("[0,0,0,0,1,1,2,2,2]", printArray(sampleNumbers));
        }
        {
            String[] sampleData = new String[]{"A","B","C"};
            try {
                sortingEngine.sort(sampleData);
                Assert.fail("Exception should have come as String data-type not supported yet");
            } catch (IllegalArgumentException iae) {
                Assert.assertEquals("Input contains a data-type not yet supported", iae.getMessage());
            }
        }
    }
}
