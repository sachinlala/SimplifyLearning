package com.sl.algorithms.core.sorting.generalpurpose;

import com.sl.algorithms.core.interfaces.sorting.SortingEngine;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import static com.sl.algorithms.core.utils.ArrayOps.printArray;

@SuppressWarnings("unchecked")
public class MergeSortTest extends SortingEngineTest {
    private static SortingEngine sortingEngine;

    @BeforeClass
    public static void setup() {
        sortingEngine = new MergeSort();
    }

    @Test
    public void baseTests() {
        baseTests(sortingEngine);
    }

    @Test
    public void testMergeSort() {
        {
            Integer[] sampleNumbers = new Integer[]{10, 7, 3, 1, 2, 11};
            sortingEngine.sort(sampleNumbers);
            Assert.assertEquals("[1,2,3,7,10,11]", printArray(sampleNumbers));
        }
        {
            String[] sampleStrings = new String[]{"Sarika", "Nikunj", "Roohani", "Sachin"};
            sortingEngine.sort(sampleStrings);
            Assert.assertEquals("[Nikunj,Roohani,Sachin,Sarika]", printArray(sampleStrings));
        }
        {
            Integer[] sampleNumbersOddCount = new Integer[]{100, -100, 2, 0, -1, 1, -2};
            sortingEngine.sort(sampleNumbersOddCount);
            Assert.assertEquals("[-100,-2,-1,0,1,2,100]", printArray(sampleNumbersOddCount));
        }
    }
}
