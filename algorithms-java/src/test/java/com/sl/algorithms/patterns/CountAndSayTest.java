package com.sl.algorithms.patterns;

import static com.sl.algorithms.patterns.CountAndSay.compute;
import static com.sl.algorithms.patterns.CountAndSay.generateMultipleRows;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class CountAndSayTest {

    @Test
    public void testBaseCases() {
        assertEquals("1", compute(1, 0));
        assertEquals("7", compute(7, 0));
    }

    @Test
    public void testTypicalSequences() {
        assertEquals("11", compute(1, 1));
        assertEquals("21", compute(1, 2));
        assertEquals("1211", compute(1, 3));

        assertEquals("17", compute(7, 1));
        assertEquals("1117", compute(7, 2));
        assertEquals("3117", compute(7, 3));
    }

    @Test
    public void testGenerateMultipleRows() {
        String[] expected = {
            "Row 0: 1",
            "Row 1: 11",
            "Row 2: 21",
            "Row 3: 1211",
            "Row 4: 111221"
        };
        assertArrayEquals(expected, generateMultipleRows(1, 5));
    }

    @Test
    public void testExceptionHandling() {
        assertThrows(IllegalArgumentException.class, () -> compute(-1, 0));
        assertThrows(IllegalArgumentException.class, () -> compute(0, 0));
        assertThrows(IllegalArgumentException.class, () -> compute(1, -1));
        assertThrows(IllegalArgumentException.class, () -> compute(1, 41));
    }

    @Test
    public void testEdgeCases() {
        assertEquals("12", compute(2, 1));  // "2" -> "one 2" -> "12"
        assertEquals("21", compute(11, 1)); // "11" -> "two 1s" -> "21"
    }

}
