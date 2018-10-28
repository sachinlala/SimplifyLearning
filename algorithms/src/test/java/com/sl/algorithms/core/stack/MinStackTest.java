package com.sl.algorithms.core.stack;

import org.junit.Assert;
import org.junit.Test;

public class MinStackTest {

  @Test
  public void assertMinStackOps() {
    MinStack obj = new MinStack();
    obj.push(-2);
    obj.push(0);
    obj.push(-3);
    Assert.assertEquals(-3, obj.getMin());
    obj.pop();
    Assert.assertEquals(0, obj.top());
    Assert.assertEquals(-2, obj.getMin());
  }

  @Test
  public void assertNullMinStackOps() {
    MinStack obj = new MinStack();
    Assert.assertEquals(-1, obj.getMin());
    Assert.assertEquals(-1, obj.top());
    obj.pop();
    Assert.assertEquals(-1, obj.getMin());
    obj.push(-10);
    Assert.assertEquals(-10, obj.getMin());
    Assert.assertEquals(-10, obj.top());
    obj.pop();
    Assert.assertEquals(-1, obj.top());
  }
}
