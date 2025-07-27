package com.sl.sample.rest.service.predicate;

import java.util.ArrayList;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class MonkPredicatesTest extends MonkPredicates {

  private List<Monk> monkList;

  @Test
  public void testMonkUniqueness() {
    Monk monk = new Monk(20, true);
    assertEquals(31 * 20 + 1, monk.hashCode());
  }

  @BeforeEach
  public void createMonkList() {
    monkList = new ArrayList<>();
    monkList.add(new Monk(1, false));
    monkList.add(new Monk(2, false));
    monkList.add(new Monk(3, false));
    monkList.add(new Monk(4, true));
    monkList.add(new Monk(5, true));
    monkList.add(new Monk(6, true));
    monkList.add(new Monk(7, false));
    monkList.add(new Monk(8, false));
    monkList.add(new Monk(9, true));
    monkList.add(new Monk(12, false));
    monkList.add(new Monk(13, true));
    monkList.add(new Monk(14, true));
    monkList.add(new Monk(14, false));
    monkList.add(new Monk(15, true));
    monkList.add(new Monk(18, false));
    monkList.add(new Monk(18, true));
    monkList.add(new Monk(18, true));
    monkList.add(new Monk(21, false));
    monkList.add(new Monk(22, true));
  }

  @Test
  public void assertSportPersonsCount() {
    assertEquals(10, filterMonks(monkList, isSportsPerson()).size());
  }

  @Test
  public void assertTeenagerCount() {
    assertEquals(9, filterMonks(monkList, isTeenager()).size());
  }

  @Test
  public void assertAdultSportPersonsCount() {
    assertEquals(3, filterMonks(monkList, isAdultSportsPerson()).size());
  }

  @Test
  public void assertCompareMonks() {
    assertFalse(new Monk(18, true).equals(new Monk(19, true)));
    assertFalse(new Monk(18, true).equals(new Monk(18, false)));
    assertTrue(new Monk(18, true).equals(new Monk(18, true)));
    assertFalse(new Monk(18, true).equals(null));
  }
}
