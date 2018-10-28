package com.sl.algorithms.core.list.intersection;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.junit.Assert;
import org.junit.Test;

@SuppressWarnings("unchecked")
public class ListIntersectionTest extends ListIntersection {

  @Test
  public void assertBaseCases() {
    List<Integer> expectedList = new ArrayList<>();
    Assert.assertEquals(expectedList, getIntersection(null, null));
    Assert.assertEquals(expectedList, getIntersection(null, expectedList));
    Assert.assertEquals(expectedList, getIntersection(expectedList, null));
    Assert.assertEquals(expectedList, getIntersection(expectedList, expectedList));
  }

  @Test
  public void assertSmallData() {
    List<Integer> list1 = new ArrayList<>(Arrays.asList(4, 2, 1, 10, -1));
    List<Integer> list2 = new ArrayList<>(Arrays.asList(1, -1));
    List<Integer> expectedList = new ArrayList<>(Arrays.asList(1, -1));
    Assert.assertEquals(expectedList, getIntersection(list1, list2));
  }

  public List<Integer> buildList(String filePath) {
    List<Integer> list = new ArrayList<>();
    try {
      BufferedReader reader = new BufferedReader(
          new InputStreamReader(new FileInputStream(new File(filePath))));
      String s;
      while ((s = reader.readLine()) != null) {
        list.add(Integer.parseInt(s));
      }
    } catch (Exception e) {
      Assert.fail("Problem in reading the test-data file.");
    }
    return list;
  }
}
