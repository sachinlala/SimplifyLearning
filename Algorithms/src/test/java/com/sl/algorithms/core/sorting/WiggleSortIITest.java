package com.sl.algorithms.core.sorting;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;

import static com.sl.algorithms.core.linear.array.ArrayOps.printArray;

public class WiggleSortIITest extends SortingEngineTest {
    private static SortingEngine sortingEngine;

    @BeforeClass
    public static void setup() {
        sortingEngine = new WiggleSortII();
    }

    @Test
    public void baseTests() {
        baseTests(sortingEngine);
    }

    //TODO //FIXME - this assertion needs to be more involved because output can vary based on randomization
    @Ignore
    @Test
    public void testWiggleSortII() {
        {
            Integer[] sampleNumbers = new Integer[]{1,2,3,4,5};
            sortingEngine.sort(sampleNumbers);
            //Assert.assertEquals("[3,4,2,5,1]", printArray(sampleNumbers));
        }
        {
            Integer[] sampleNumbers = new Integer[]{3,5,2,1,6,4};
            sortingEngine.sort(sampleNumbers);
            //Assert.assertEquals("[3,4,1,5,2,6]", printArray(sampleNumbers));
        }
        {
            String[] sampleData = new String[]{"A","B","C","D","E"};
            sortingEngine.sort(sampleData);
            Assert.assertEquals("[A,C,B,E,D]", printArray(sampleData));
        }
    }

    //TODO //FIXME - this assertion needs to be more involved because output can vary based on randomization
    @Test
    public void testWiggleSortIIDupNumbers() {
        {
            Integer[] sampleData = new Integer[]{2,2,2,2,1,1,1};
            sortingEngine.sort(sampleData);
            Assert.assertEquals("[2,2,1,2,1,2,1]", printArray(sampleData));
        }
    }
}
