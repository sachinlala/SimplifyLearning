package com.sl.sample.rest.service.predicate;

import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class MonkPredicates {

  MonkPredicates() {
    /**
     * This is a utility class.<br>
     */
  }

  public static Predicate<Monk> isSportsPerson() {
    return p -> p.isSportsPerson();
  }

  public static Predicate<Monk> isAdultSportsPerson() {
    return p -> p.isSportsPerson() && p.getAge() >= 18;
  }

  public static Predicate<Monk> isTeenager() {
    return p -> p.getAge() >= 13;
  }

  public static List<Monk> filterMonks(List<Monk> monks, Predicate<Monk> predicate) {
    return monks.stream().filter(predicate).collect(Collectors.<Monk>toList());
  }
}
