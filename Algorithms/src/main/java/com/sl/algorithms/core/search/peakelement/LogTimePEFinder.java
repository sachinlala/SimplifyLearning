package com.sl.algorithms.core.search.peakelement;

import com.sl.algorithms.core.interfaces.search.PeakElementFinder;
import com.sl.algorithms.core.utils.Formulas;

/**
 * {@link PeakElementFinder}
 */
public class LogTimePEFinder<T extends Comparable> implements PeakElementFinder<T> {

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
            int midPoint = Formulas.midPoint(start, end);
            if (objects[midPoint].compareTo(objects[midPoint + 1]) < 0) {
                start = midPoint + 1;
            } else {
                end = midPoint;
            }
        }
        return objects[start];
    }
}
