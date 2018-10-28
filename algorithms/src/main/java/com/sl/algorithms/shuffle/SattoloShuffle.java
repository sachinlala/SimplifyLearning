package com.sl.algorithms.shuffle;

import static com.sl.algorithms.core.utils.ArrayOps.swap;

import com.sl.algorithms.core.interfaces.shuffle.ShufflingEngine;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

/**
 * <p>{@link FisherYatesKnuthShuffle} produces a random permutation while {@link SattoloShuffle}
 * produces a random permutation with exactly one cycle. i.e. we do not allow an element to be
 * swapped with itself, which implies an element will never end-up in it's original position.</p> <a
 * href="https://danluu.com/sattolo/">Sattolo's Shuffling Algorithm</a>
 */
public class SattoloShuffle<T extends Comparable> implements ShufflingEngine<T> {

  @Override
  public void shuffle(T[] objects) {
    checkArray(objects);
    Random random = ThreadLocalRandom.current();
    int n = objects.length;
    for (int i = n - 1; i > 0; i--) {
      swap(objects, i, random.nextInt(
          i)); // i (exclusive) is the delta w.r.t. FisherYatesKnuthShuffle - this ensures only one cycle is produced.
    }
  }
}
