package com.sl.algorithms.sort.finitegroups;

import com.sl.algorithms.core.baseObj.ListNode;
import com.sl.algorithms.core.interfaces.sorting.SortingEngine;

import static com.sl.algorithms.core.utils.ArrayOps.swap;

/**
 * <br>A customized quick-sort, this algorithm is specific for cases when the data could be divided into 2-3 finite groups.
 * <br><a href="https://rosettacode.org/wiki/Dutch_national_flag_problem">Reference 1</a>
 * <br><a href="http://users.monash.edu/~lloyd/tildeAlgDS/Sort/Flag/">Reference 2</a>
 * <br>Time = O(N) and Space = O(1)<br>
 */
public class DutchNationalFlagSort<T extends Comparable> implements SortingEngine<T> {

    private T red;
    private T white;
    private T blue;

    /**
     * <a href="https://en.wikipedia.org/wiki/Flag_of_the_Netherlands">Dutch Flag</a>
     *
     * @param _red   (red) : value of first group
     * @param _white (white) : value of middle group
     * @param _blue  (blue) : value of third group
     */
    public DutchNationalFlagSort(T _red, T _white, T _blue) {
        red = _red;
        white = _white;
        blue = _blue;
    }

    /**
     * <br>(white) is the implicit middle layer;<br>
     * i.e. red and blue values are fixed, everything else is white and can be any value hence will settle in the middle.<br>
     * @param _red value of first group
     * @param _blue value of third (final) group
     */
    public DutchNationalFlagSort(T _red, T _blue) {
        red = _red;
        blue = _blue;
    }

    /**
     * <br><u>Approach</u>:<br>
     * <p>There is just one check pointer 'w'. All steps depend on A[w]:
     * <br>- swap with A[r] if it is red
     * <br>- swap with A[b] if it is blue
     * <br>- decrement w if it is white.
     * <br>The variables r and b indicate red and blue boundaries such that all elements to the left of r are red and all elements to the right of b are blue.
     * <br>It is clear that a swap occurs when A[w] is red or blue.</p>
     */
    @Override
    public void sort(T[] objects) {
        checkArray(objects);
        int r = 0, w = objects.length - 1, b = objects.length - 1;
        while (w >= r) {
            T obj = objects[w];
            if (obj.equals(red)) {
                swap(objects, w, r);
                r++;
            } else if (obj.equals(blue)) {
                swap(objects, w, b);
                b--;
                w--; // w needs to be move lock-step with b { example to assert: 2, 0, 1, 0, 1, 0, 0, 2, 2 }
            } else { // white (implicit) // middle layer
                w--;
            }
        }
    }

    @Override
    public ListNode<T> sortList(ListNode<T> list) {
        throw new UnsupportedOperationException();
    }
}
