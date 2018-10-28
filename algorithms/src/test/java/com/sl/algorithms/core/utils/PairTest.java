package com.sl.algorithms.core.utils;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class PairTest {

  private Pair<Integer, Integer> integerPair;

  @Before
  public void setup() {
    integerPair = new Pair<>(1, 2);
  }

  @Test
  public void assertBaseMethods() {
    Pair<Integer, Integer> similarPair = new Pair<>(1, 2);
    Assert.assertTrue(integerPair.equals(similarPair));
    Assert.assertTrue(integerPair.hashCode() == similarPair.hashCode());
    Assert.assertTrue(integerPair.toString().equals(similarPair.toString()));
  }
}
