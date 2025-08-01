package com.sl.algorithms.shuffle;

import static com.sl.algorithms.core.utils.ArrayOps.swap;

import com.sl.algorithms.core.interfaces.shuffle.ShufflingEngine;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

/**
 * <p>In-place algorithm to shuffle the input data. I've used the Naive prefix, simply because the
 * algorithm works on a constant range [0 to n-1] for random-number generation, which implies same
 * number could be chosen again, hence all numbers do not have equal probability.</p>
 */
public class NaiveShuffle<T extends Comparable> implements ShufflingEngine<T> {

  @Override
  public void shuffle(T[] objects) {
    checkArray(objects);
    Random random = ThreadLocalRandom.current();
    int n = objects.length;
    for (int i = 0; i < n; i++) {
      swap(objects, i, random.nextInt(n));
    }
  }
}
