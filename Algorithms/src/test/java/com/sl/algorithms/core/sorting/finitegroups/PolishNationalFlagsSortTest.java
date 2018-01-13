package com.sl.algorithms.core.sorting.finitegroups;

import com.sl.algorithms.core.interfaces.rwops.SortingEngine;
import com.sl.algorithms.core.sorting.generalpurpose.SortingEngineTest;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import static com.sl.algorithms.core.utils.ArrayOps.printArray;

public class PolishNationalFlagsSortTest extends SortingEngineTest {
    private static SortingEngine<Integer> integerSortingEngine;
    private static SortingEngine<String> stringSortingEngine;

    @BeforeClass
    public static void setup() {
        integerSortingEngine = new PolishNationalFlagSort<>(0, 1);
        stringSortingEngine = new PolishNationalFlagSort<>("A", "B");
    }

    @Test
    public void baseTests() {
        baseTests(integerSortingEngine);
    }

    @Test
    public void testDNESort() {
        {
            Integer[] sampleNumbers = new Integer[]{1, 0, 1, 0, 1, 0, 0, 1, 0};
            integerSortingEngine.sort(sampleNumbers);
            Assert.assertEquals("[0,0,0,0,0,1,1,1,1]", printArray(sampleNumbers));
        }
        {
            String[] sampleData = new String[]{"A", "A", "B", "A", "A", "B", "B", "B"};
            stringSortingEngine.sort(sampleData);
            Assert.assertEquals("[A,A,A,A,B,B,B,B]", printArray(sampleData));
        }
    }
}
