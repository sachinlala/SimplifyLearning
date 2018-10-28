package com.sl.algorithms.shuffle;

import static com.sl.algorithms.core.utils.ArrayOps.swap;

import com.sl.algorithms.core.interfaces.shuffle.ShufflingEngine;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

/**
 * <p>The Fisher-Yates algorithm (presented by Knuth in TAOCP) is both the canonical shuffling
 * algorithm and asymptotically optimal (linear). The range provided for random-number generation
 * changes at each step i.e. does not include what has been seen so far, which guarantees equal
 * probability for all elements.</p> <br><a href="https://eli.thegreenplace.net/2010/05/28/the-intuition-behind-fisher-yates-shuffling/">Reference
 * Reading 1</a><br> <br><a href="https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle">Reference
 * Reading 2</a>
 */
public class FisherYatesKnuthShuffle<T extends Comparable> implements ShufflingEngine<T> {

  @Override
  public void shuffle(T[] objects) {
    checkArray(objects);
    Random random = ThreadLocalRandom.current();
    int n = objects.length;
    for (int i = n - 1; i > 0; i--) {
      swap(objects, i, random.nextInt(i + 1));
    }
  }
}
