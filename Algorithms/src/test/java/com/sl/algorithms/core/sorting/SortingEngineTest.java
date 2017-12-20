package com.sl.algorithms.core.sorting;

import org.junit.Assert;

import static com.sl.algorithms.core.linear.array.ArrayOps.printArray;

public class SortingEngineTest {

    public void nullTest(SortingEngine sortingEngine) {
        {
            Integer[] nullArray = null;
            sortingEngine.sort(nullArray);
            Assert.assertNull(nullArray);
        }
    }

    public void baseTests(SortingEngine sortingEngine) {
        nullTest(sortingEngine);
        {
            Integer[] emptyArray = new Integer[]{};
            sortingEngine.sort(emptyArray);
            Assert.assertEquals("[]", printArray(emptyArray));
        }
        {
            Integer[] singleElementArray = new Integer[]{1};
            sortingEngine.sort(singleElementArray);
            Assert.assertEquals("[1]", printArray(singleElementArray));
        }
    }
}
