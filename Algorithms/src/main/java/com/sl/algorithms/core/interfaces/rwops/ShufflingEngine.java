package com.sl.algorithms.core.interfaces.rwops;

import com.sl.algorithms.core.interfaces.base.BaseInterface;
import com.sl.algorithms.core.utils.ArrayOps;

import java.util.Random;

//TODO: utilize this interface
public interface ShufflingEngine<T extends Comparable> extends BaseInterface<T> {

    Random random = new Random();

    default void shuffle(T[] objects) {
        objChecks(objects);
        for (int i = 1; i < objects.length; i++) {
            ArrayOps.swap(objects, i, random.nextInt(i + 1));
        }
    }
}
