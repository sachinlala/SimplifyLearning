package com.sl.algorithms.core.sorting.finitegroups;

import com.sl.algorithms.core.interfaces.rwops.SortingEngine;
import com.sl.algorithms.core.sorting.generalpurpose.SortingEngineTest;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import static com.sl.algorithms.core.utils.ArrayOps.printArray;

public class DutchNationalFlagsSortTest extends SortingEngineTest {
    private static SortingEngine<Integer> integerSortingEngine;
    private static SortingEngine<String> stringSortingEngine;

    @BeforeClass
    public static void setup() {
        integerSortingEngine = new DutchNationalFlagsSort<>(0, 2);
        stringSortingEngine = new DutchNationalFlagsSort<>("A", "C");
    }

    @Test
    public void baseTests() {
        baseTests(integerSortingEngine);
    }

    @Test
    public void testDNESort() {
        {
            Integer[] sampleNumbers = new Integer[]{2, 0, 1, 0, 1, 0, 0, 2, 2};
            integerSortingEngine.sort(sampleNumbers);
            Assert.assertEquals("[0,0,0,0,1,1,2,2,2]", printArray(sampleNumbers));
        }
        {
            String[] sampleData = new String[]{"A", "C", "B", "A", "A", "C", "B", "B"};
            stringSortingEngine.sort(sampleData);
            Assert.assertEquals("[A,A,A,B,B,B,C,C]", printArray(sampleData));
        }
    }
}
