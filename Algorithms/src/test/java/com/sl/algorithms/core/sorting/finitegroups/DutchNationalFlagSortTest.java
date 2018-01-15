package com.sl.algorithms.core.sorting.finitegroups;

import com.sl.algorithms.core.interfaces.sorting.SortingEngine;
import com.sl.algorithms.core.sorting.generalpurpose.SortingEngineTest;
import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.core.utils.ArrayOps.printArray;

public class DutchNationalFlagSortTest extends SortingEngineTest {

    private static SortingEngine<Integer> integerSortingEngine;
    private static SortingEngine<String> stringSortingEngine;

    @Test
    public void testDNFSortIntegers() {
        integerSortingEngine = new DutchNationalFlagSort<>(0, 2);
        {
            baseTests(integerSortingEngine);
        }
        {
            Integer[] sampleNumbers = new Integer[]{2, 0, 1, 0, 1, 0, 0, 2, 2};
            integerSortingEngine.sort(sampleNumbers);
            Assert.assertEquals("[0,0,0,0,1,1,2,2,2]", printArray(sampleNumbers));
        }
    }

    @Test
    public void testDNFSortStrings2c() {
        stringSortingEngine = new DutchNationalFlagSort<>("A", "C");
        testDNFSortStrings();
    }

    @Test
    public void testDNFSortStrings3c() {
        stringSortingEngine = new DutchNationalFlagSort<>("A", "B", "C");
        testDNFSortStrings();
    }

    private void testDNFSortStrings() {
        {
            String[] sampleData = new String[]{"A", "C", "B", "A", "A", "C", "B", "B"};
            stringSortingEngine.sort(sampleData);
            Assert.assertEquals("[A,A,A,B,B,B,C,C]", printArray(sampleData));
        }
        {
            String[] sampleData = new String[]{"A", "C", "B", "A", "A", "C", "E", "D"};
            stringSortingEngine.sort(sampleData);
            Assert.assertEquals("[A,A,A,B,E,D,C,C]", printArray(sampleData));
        }
    }
}
