package com.sl.algorithms.shuffle;

import com.sl.algorithms.core.interfaces.rwops.ShufflingEngine;

import static com.sl.algorithms.core.utils.ArrayOps.swap;

public class NaiveShuffle<T extends Comparable> implements ShufflingEngine<T> {

    /**
     * @inheritDoc
     */
    @Override
    public void shuffle(T[] objects) {
        checkArray(objects);
        int n = objects.length;
        if (n == 1) {
            return;
        }
        for (int i = 1; i < n; i++) {
            swap(objects, i, random.nextInt(i + 1));
        }
    }
}
