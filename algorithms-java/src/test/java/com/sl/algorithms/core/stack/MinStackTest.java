package com.sl.algorithms.core.stack;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class MinStackTest {

  @Test
  public void assertMinStackOps() {
    MinStack obj = new MinStack();
    obj.push(-2);
    obj.push(0);
    obj.push(-3);
    assertEquals(-3, obj.getMin());
    obj.pop();
    assertEquals(0, obj.top());
    assertEquals(-2, obj.getMin());
  }

  @Test
  public void assertNullMinStackOps() {
    MinStack obj = new MinStack();
    assertEquals(-1, obj.getMin());
    assertEquals(-1, obj.top());
    obj.pop();
    assertEquals(-1, obj.getMin());
    obj.push(-10);
    assertEquals(-10, obj.getMin());
    assertEquals(-10, obj.top());
    obj.pop();
    assertEquals(-1, obj.top());
  }
}
