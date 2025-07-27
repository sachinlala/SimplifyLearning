package com.sl.algorithms.core.list.intersection;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

@SuppressWarnings("unchecked")
public class ListIntersectionTest extends ListIntersection {

  @Test
  public void assertBaseCases() {
    List<Integer> expectedList = new ArrayList<>();
    assertEquals(expectedList, getIntersection(null, null));
    assertEquals(expectedList, getIntersection(null, expectedList));
    assertEquals(expectedList, getIntersection(expectedList, null));
    assertEquals(expectedList, getIntersection(expectedList, expectedList));
  }

  @Test
  public void assertSmallData() {
    List<Integer> list1 = new ArrayList<>(Arrays.asList(4, 2, 1, 10, -1));
    List<Integer> list2 = new ArrayList<>(Arrays.asList(1, -1));
    List<Integer> expectedList = new ArrayList<>(Arrays.asList(1, -1));
    assertEquals(expectedList, getIntersection(list1, list2));
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
      fail("Problem in reading the test-data file.");
    }
    return list;
  }
}
