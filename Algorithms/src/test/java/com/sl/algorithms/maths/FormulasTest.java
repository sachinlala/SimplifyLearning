package com.sl.algorithms.maths;

import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.maths.Formulas.*;

public class FormulasTest {
    @Test
    public void hcfTest() {
        Assert.assertEquals(hcf(0, 0), -1);
        Assert.assertEquals(hcf(3, 0), 3);
        Assert.assertEquals(hcf(0, 1), 1);
        Assert.assertEquals(hcf(3, 2), 1);
        Assert.assertEquals(hcf(4, 2), 2);
        Assert.assertEquals(hcf(6, 2), 2);
        Assert.assertEquals(hcf(7, 2), 1);
        Assert.assertEquals(hcf(2, 7), 1);
        Assert.assertEquals(hcf(6, 3), 3);
        Assert.assertEquals(hcf(18, 12), 6);
        Assert.assertEquals(hcf(5, 6), 1);
        Assert.assertEquals(hcf(5, 7), 1);
    }
}
