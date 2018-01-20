package com.sl.algorithms.sort.wave;

import com.sl.algorithms.core.interfaces.sorting.SortingEngine;
import com.sl.algorithms.sort.BaseTest;
import org.junit.*;

import static com.sl.algorithms.core.utils.ArrayOps.printArray;

@SuppressWarnings("unchecked")
public class WiggleSortIITest extends BaseTest {

    private SortingEngine sortingEngine;

    @Before
    public void setup() {
        sortingEngine = new WiggleSortII();
    }

    //TODO //FIXME - this assertion needs to be more involved because output can vary based on input randomization, but will satisfy a set pattern.
    @Ignore
    @Test
    public void testWiggleSortII() {
        {
            assertBaseCases(sortingEngine);
        }
        { // has dup
            Integer[] sampleData = new Integer[]{2,2,2,2,1,1,1};
            sortingEngine.sort(sampleData);
            Assert.assertEquals("[2,2,1,2,1,2,1]", printArray(sampleData));
        }
        { // sorted in ascending order
            Integer[] sampleNumbers = new Integer[]{1,2,3,4,5};
            sortingEngine.sort(sampleNumbers);
            //Assert.assertEquals("[3,4,2,5,1]", printArray(sampleNumbers));
        }
        { // unsortred
            Integer[] sampleNumbers = new Integer[]{3,5,2,1,6,4};
            sortingEngine.sort(sampleNumbers);
            //Assert.assertEquals("[3,4,1,5,2,6]", printArray(sampleNumbers));
        }
        { // string, sorted in ascending order
            String[] sampleData = new String[]{"A","B","C","D","E"};
            sortingEngine.sort(sampleData);
            Assert.assertEquals("[A,C,B,E,D]", printArray(sampleData));
        }
        { // string, unsorted
            String[] sampleData = new String[]{"E","A","B","D","C"};
            sortingEngine.sort(sampleData);
            Assert.assertEquals("[A,C,B,E,D]", printArray(sampleData));
        }
    }
}
