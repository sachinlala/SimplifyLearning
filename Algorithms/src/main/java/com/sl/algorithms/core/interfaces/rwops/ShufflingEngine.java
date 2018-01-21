package com.sl.algorithms.core.interfaces.rwops;

import com.sl.algorithms.core.interfaces.base.BaseInterface;

import java.util.Random;

public interface ShufflingEngine<T extends Comparable> extends BaseInterface<T> {

    Random random = new Random();
    void shuffle(T[] objects);
}
