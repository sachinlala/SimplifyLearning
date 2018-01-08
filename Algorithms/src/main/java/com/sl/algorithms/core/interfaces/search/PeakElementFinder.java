package com.sl.algorithms.core.interfaces.search;

import com.sl.algorithms.core.interfaces.base.BaseInterface;

/**
 * <br><a href="https://leetcode.com/problems/find-peak-element/description/">Problem Reference</a><br>
 * <br>Given an array which is in ascending order till some point and then descending order till end, find peak element.<br>
 */
public interface PeakElementFinder<T extends Comparable> extends BaseInterface<T> {

    /**
     * <br>The input series has a peak element.<br>
     */
    T findPeakElement(T[] objects);
}
