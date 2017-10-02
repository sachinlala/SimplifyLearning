package com.sl.examples.predicate;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

public class MonkPredicatesTest {

    List<Monk> monkList;

    @Before
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
        Assert.assertEquals(10, MonkPredicates.filterMonks(monkList, MonkPredicates.isSportsPerson()).size());
    }

    @Test
    public void assertTeenagerCount() {
        Assert.assertEquals(9, MonkPredicates.filterMonks(monkList, MonkPredicates.isTeenager()).size());
    }

    @Test
    public void assertAdultSportPersonsCount() {
        Assert.assertEquals(3, MonkPredicates.filterMonks(monkList, MonkPredicates.isAdultSportsPerson()).size());
    }
}
