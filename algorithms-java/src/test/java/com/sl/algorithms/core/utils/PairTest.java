package com.sl.algorithms.core.utils;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class PairTest {

  private Pair<Integer, Integer> integerPair;

  @BeforeEach
  public void setup() {
    integerPair = new Pair<>(1, 2);
  }

  @Test
  public void assertBaseMethods() {
    Pair<Integer, Integer> similarPair = new Pair<>(1, 2);
    assertTrue(integerPair.equals(similarPair));
    assertTrue(integerPair.hashCode() == similarPair.hashCode());
    assertTrue(integerPair.toString().equals(similarPair.toString()));
  }
}
