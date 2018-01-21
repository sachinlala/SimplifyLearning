package com.sl.algorithms.shuffle;

import com.sl.algorithms.core.interfaces.rwops.ShufflingEngine;

import static com.sl.algorithms.core.utils.ArrayOps.swap;

public class NaiveShuffle<T extends Comparable> implements ShufflingEngine<T> {

    @Override
    public void shuffle(T[] objects) {
        checkArray(objects);
        int n = objects.length;
        for (int i = 1; i < n; i++) {
            swap(objects, i, random.nextInt(i + 1));
        }
    }
}
