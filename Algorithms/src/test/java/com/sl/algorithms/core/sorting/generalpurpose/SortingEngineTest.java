package com.sl.algorithms.core.sorting.generalpurpose;

import com.sl.algorithms.core.interfaces.sorting.SortingEngine;
import org.junit.Assert;

import static com.sl.algorithms.core.utils.ArrayOps.printArray;

@SuppressWarnings("unchecked")
public class SortingEngineTest {

    public void nullTest(SortingEngine sortingEngine) {
        try {
            sortingEngine.sort(null);
            Assert.fail("Exception should've been raised");
        } catch (IllegalArgumentException iae) {
            Assert.assertNotNull(iae);
        }
    }

    public void baseTests(SortingEngine sortingEngine) {
        nullTest(sortingEngine);
        {
            try {
                Integer[] emptyArray = new Integer[]{};
                sortingEngine.sort(emptyArray);
                Assert.fail("Exception should've been raised");
            } catch (IllegalArgumentException iae) {
                Assert.assertNotNull(iae);
            }
        }
        {
            Integer[] singleElementArray = new Integer[]{1};
            sortingEngine.sort(singleElementArray);
            Assert.assertEquals("[1]", printArray(singleElementArray));
        }
    }
}
