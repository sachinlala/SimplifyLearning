package com.sl.algorithms.core.sorting.distribution;

import com.sl.algorithms.core.interfaces.sorting.SortingEngine;

import static java.lang.Integer.valueOf;

/**
 * <br>A stable special-purpose integer-sorting algorithm with O(N+k) time & space complexity, where k represents the range of finite values in the array.<br>
 * <br><u>Inventor</u>:&nbsp;<a href="https://en.wikipedia.org/wiki/Harold_H._Seward">Harold H Seward</a><br>
 * <br><u>Assumption</u>:&nbsp;k is significantly less than n (only then this algo is advantageous).<br>
 * <br><a href="https://en.wikipedia.org/wiki/Counting_sort">Reference Reading 0</a>
 * <br><a href="https://brilliant.org/wiki/counting-sort/">Reference Reading 1</a>
 * <br><a href="https://www.interviewcake.com/concept/java/counting-sort">Reference Reading 2</a>
 * <br><a href="http://www.cs.usfca.edu/~galles/visualization/CountingSort.html">Animation</a><br>
 */
public class CountingSort<T extends Integer> implements SortingEngine<T> {

    private int maxValue;

    public CountingSort(int _maxValue) {
        maxValue = _maxValue;
    }

    @SuppressWarnings("unchecked") // valueOf
    @Override
    public void sort(T[] objects) {
        objChecks(objects);

        // O(k) space count array to track the frequency of each element
        int[] countArray = new int[maxValue + 1];

        // 1st pass : O(n) : count the elements
        for (int obj : objects) {
            ++countArray[obj];
        }

        // 2nd pass : O(k) : calculate start-index for each element
        int total = 0;
        for (int i = 0; i < countArray.length; i++) {
            int count = countArray[i];
            countArray[i] = total;
            total += count;
        }

        // O(n) space output array is the one which gives stability to this sorting approach
        int[] outputArray = new int[objects.length];

        // 3rd pass : O(n) : place the k objects at their sort-expected positions
        for (int obj : objects) {
            outputArray[countArray[obj]] = obj;
            countArray[obj] += 1;
        }

        // 4th pass (redundant) : O(n) : copy sorted array to original input
        for (int i = 0; i < outputArray.length; i++) {
            objects[i] = (T) valueOf(outputArray[i]);
        }
    }
}
