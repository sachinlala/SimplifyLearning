package com.sl.algorithms.core.interfaces.rwops;

import com.sl.algorithms.core.interfaces.base.BaseInterface;

import java.util.Random;

public interface ShufflingEngine<T extends Comparable> extends BaseInterface<T> {

    Random random = new Random();
    /**
     * <br><a href="https://eli.thegreenplace.net/2010/05/28/the-intuition-behind-fisher-yates-shuffling/">Reference Reading</a><br>
     */
    void shuffle(T[] objects);
}
