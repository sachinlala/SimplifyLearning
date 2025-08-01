package com.sl.algorithms.core.interfaces.shuffle;

import com.sl.algorithms.core.interfaces.base.BaseInterface;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

public interface ShufflingEngine<T extends Comparable> extends BaseInterface<T> {

  void shuffle(T[] objects);

  /**
   * Generate a random number between min and max (both inclusive).
   *
   * @param min lower bound (inclusive)
   * @param max upper bound (inclusive)
   * @return random number
   */
  default int getRandomNumberInRange(int min, int max) {
    Random random = ThreadLocalRandom.current();
    int randomNumber =
        random.nextInt(max - min + 1) + min; // +1 to ensure max is included in the range
    return randomNumber;
  }
}
