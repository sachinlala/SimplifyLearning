package com.sl.algorithms.core.search.peakelement;

import com.sl.algorithms.core.interfaces.search.PeakElementFinder;

/**
 * {@link PeakElementFinder}
 */
public class LinearTimePEFinder<T extends Comparable> implements PeakElementFinder<T> {

    /**
     * @inheritDoc
     */
    @SuppressWarnings("unchecked")
    @Override
    public T findPeakElement(T[] objects) {
        objChecks(objects);
        if (objects.length == 1) return objects[0];
        int start = 0, end = objects.length - 1;
        while (start != end) {
            if (objects[start].compareTo(objects[end]) < 0) {
                start++;
            } else {
                end--;
            }
        }
        return objects[start];
    }
}
