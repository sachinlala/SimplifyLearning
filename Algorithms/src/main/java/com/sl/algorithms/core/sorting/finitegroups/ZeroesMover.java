package com.sl.algorithms.core.sorting.finitegroups;

import com.sl.algorithms.core.interfaces.sorting.Consolidator;

import static com.sl.algorithms.core.utils.ArrayOps.swap;

/**
 * <br><a href="https://leetcode.com/problems/move-zeroes/description/">Problem Reference</a>
 */
public class ZeroesMover<T extends Comparable> implements Consolidator<T> {

    /**
     * O(n) time and O(1) space, with optimal # operations in worst case.
     */
    @Override
    public void consolidate(T[] objects, T element, boolean right) {
        checkArray(objects);
        int slow = 0, fast = 0;
        if (right) {
            moveRight(objects, element, slow, fast);
        } else {
            moveLeft(objects, element, slow, fast);
        }
    }

    private void moveRight(T[] objects, T element, int slow, int fast) {
        while (fast < objects.length) {
            if (!objects[fast].equals(element)) {
                swap(objects, slow, fast);
                ++slow;
            }
            ++fast;
        }
    }

    private void moveLeft(T[] objects, T element, int slow, int fast) {
        while (fast < objects.length) {
            if (objects[fast].equals(element)) {
                swap(objects, slow, fast);
                ++slow;
            }
            ++fast;
        }
    }
}
