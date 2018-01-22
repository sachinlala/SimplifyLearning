package com.sl.algorithms.sort.generalpurpose;

import com.sl.algorithms.core.baseObj.ListNode;
import com.sl.algorithms.core.interfaces.sorting.SortingEngine;
import com.sl.algorithms.sort.BaseTest;
import com.sl.algorithms.sort.generalpurpose.heap.HeapSort;
import com.sl.algorithms.sort.generalpurpose.merge.BottomUpMergeSort;
import com.sl.algorithms.sort.generalpurpose.merge.TopDownMergeSort;
import com.sl.algorithms.sort.generalpurpose.smalldata.BubbleSort;
import com.sl.algorithms.sort.generalpurpose.smalldata.InsertionSort;
import com.sl.algorithms.sort.generalpurpose.smalldata.SelectionSort;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;

import static com.sl.algorithms.core.baseObj.ListNode.createLinkedList;
import static com.sl.algorithms.core.utils.ArrayOps.printArray;

@SuppressWarnings("unchecked")
public class SortingEngineTest extends BaseTest {

    private SortingEngine<Integer> integerSortingEngine;
    private SortingEngine<String> stringSortingEngine;

    @Test
    public void testBubbleSort() {
        integerSortingEngine = new BubbleSort<>();
        stringSortingEngine = new BubbleSort<>();
        assertBaseCases(integerSortingEngine);
        assertSort();
    }

    @Test
    public void testSelectionSort() {
        integerSortingEngine = new SelectionSort<>();
        stringSortingEngine = new SelectionSort<>();
        assertBaseCases(integerSortingEngine);
        assertSort();
    }

    @Test
    public void testInsertionSort() {
        integerSortingEngine = new InsertionSort<>();
        stringSortingEngine = new InsertionSort<>();
        assertBaseCases(integerSortingEngine);
        assertSort();
        assertListSort();
    }

    @Test
    public void testTopDownMergeSort() {
        integerSortingEngine = new TopDownMergeSort<>();
        stringSortingEngine = new TopDownMergeSort<>();
        assertBaseCases(integerSortingEngine);
        assertSort();
        assertListSort();
    }

    @Test
    public void testBottomUpMergeSort() {
        integerSortingEngine = new BottomUpMergeSort<>();
        stringSortingEngine = new BottomUpMergeSort<>();
        assertBaseCases(integerSortingEngine);
        assertSort();
        assertListSort();
    }

    @Test
    public void testQuickSort() {
        integerSortingEngine = new QuickSort<>();
        stringSortingEngine = new QuickSort<>();
        assertBaseCases(integerSortingEngine);
        assertSort();
    }

    @Ignore //FIXME
    @Test
    public void testHeapSort() {
        integerSortingEngine = new HeapSort<>();
        stringSortingEngine = new HeapSort<>();
        assertBaseCases(integerSortingEngine);
        assertSort();
    }

    private void assertSort() {
        {
            Integer[] sampleNumbers = new Integer[]{10, 7, 3, 1, 2, 11};
            integerSortingEngine.sort(sampleNumbers);
            Assert.assertEquals("[1,2,3,7,10,11]", printArray(sampleNumbers));
        }
        {
            String[] sampleStrings = new String[]{"Sarika", "Nikunj", "Roohani", "Sachin"};
            stringSortingEngine.sort(sampleStrings);
            Assert.assertEquals("[Nikunj,Roohani,Sachin,Sarika]", printArray(sampleStrings));
        }
        {
            Integer[] sampleNumbersOddCount = new Integer[]{100, -100, 2, 0, -1, 1, -2};
            integerSortingEngine.sort(sampleNumbersOddCount);
            Assert.assertEquals("[-100,-2,-1,0,1,2,100]", printArray(sampleNumbersOddCount));
        }
        {
            Integer[] sampleNumbers = new Integer[]{2, 1, 3, 5, 3};
            integerSortingEngine.sort(sampleNumbers);
            Assert.assertEquals("[1,2,3,3,5]", printArray(sampleNumbers));
        }
        {
            Integer[] sampleNumbers = new Integer[]{2, 1, 3, 5, 3, 2, 1, 3, 5, 3, 2, 1, 3, 5, 3, 2, 1, 3, 5, 3, 2, 1, 3, 5, 3, 7, 10, 6, 9, 8, 100, 99, 100};
            integerSortingEngine.sort(sampleNumbers);
            Assert.assertEquals("[1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,5,5,5,5,5,6,7,8,9,10,99,100,100]", printArray(sampleNumbers));
        }
    }

    private void assertListSort() {
        {
            try {
                integerSortingEngine.sortList(null);
                Assert.fail("Exception should've been raised");
            } catch (IllegalArgumentException iae) {
                Assert.assertNotNull(iae);
            }
        }
        {
            ListNode<Integer> emptyList = createLinkedList(new Integer[]{});
            try {
                integerSortingEngine.sortList(emptyList);
                Assert.fail("Exception should've been raised");
            } catch (IllegalArgumentException iae) {
                Assert.assertNotNull(iae);
            }
        }
        {
            ListNode<Integer> singleElement = createLinkedList(new Integer[]{1});
            Assert.assertEquals("[1]", integerSortingEngine.sortList(singleElement).toString());
        }
        {
            ListNode<Integer> sampleNumbers = createLinkedList(new Integer[]{10, 7, 3, 1, 2, 11});
            Assert.assertEquals("[1,2,3,7,10,11]", integerSortingEngine.sortList(sampleNumbers).toString());
        }
        {
            ListNode<String> sampleStrings = createLinkedList(new String[]{"Sarika", "Nikunj", "Roohani", "Sachin"});
            Assert.assertEquals("[Nikunj,Roohani,Sachin,Sarika]", stringSortingEngine.sortList(sampleStrings).toString());
        }
        {
            ListNode<Integer> sampleNumbersOddCount = createLinkedList(new Integer[]{100, -100, 2, 0, -1, 1, -2});
            Assert.assertEquals("[-100,-2,-1,0,1,2,100]", integerSortingEngine.sortList(sampleNumbersOddCount).toString());
        }
        { // dup
            ListNode<Integer> sampleNumbersOddCount = createLinkedList(new Integer[]{2, 1, 3, 5, 3});
            Assert.assertEquals("[1,2,3,3,5]", integerSortingEngine.sortList(sampleNumbersOddCount).toString());
        }
        {
            int largeSize = 65536/8; // calibrated till Integer.MAX_VALUE/1024 i.e. 2097151
            System.out.println(Integer.MAX_VALUE/1024);
            Integer[] largeList = new Integer[largeSize];
            Integer[] expectedList = new Integer[largeSize];
            for (int i = largeSize - 1; i >= 0; i--) {
                largeList[i] = i;
            }
            for (int i = 0; i < largeSize; i++) {
                expectedList[i] = i;
            }
            ListNode<Integer> sampleNumbers32Plus = createLinkedList(largeList);
            Assert.assertEquals(printArray(expectedList), integerSortingEngine.sortList(sampleNumbers32Plus).toString());
        }
    }
}