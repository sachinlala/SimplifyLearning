package com.sl.algorithms.core.interfaces.rwops;

import com.sl.algorithms.core.interfaces.base.BaseInterface;
import com.sl.algorithms.core.utils.ArrayOps;

import java.util.Random;

/**
 * <br><a href="https://eli.thegreenplace.net/2010/05/28/the-intuition-behind-fisher-yates-shuffling/">Reference Reading</a><br>
 */
public interface ShufflingEngine<T extends Comparable> extends BaseInterface<T> {

    Random random = new Random();

    default void shuffle(T[] objects) {
        checkArray(objects);
        int n = objects.length;
        if (n == 1) {
            return;
        }
        for (int i = 1; i < n; i++) {
            ArrayOps.swap(objects, i, random.nextInt(i + 1));
        }
    }
}
