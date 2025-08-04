import com.sl.algorithms.patterns.CountAndSay;

public class TestRunner {
    private static int tests = 0;
    private static int passed = 0;
    
    public static void main(String[] args) {
        System.out.println("Running Count and Say Tests...\n");
        
        // Test base cases
        test("Base case 1,0", "1", CountAndSay.compute(1, 0));
        test("Base case 7,0", "7", CountAndSay.compute(7, 0));
        
        // Test typical sequences starting with 1
        test("Sequence 1,1", "11", CountAndSay.compute(1, 1));
        test("Sequence 1,2", "21", CountAndSay.compute(1, 2));
        test("Sequence 1,3", "1211", CountAndSay.compute(1, 3));
        test("Sequence 1,4", "111221", CountAndSay.compute(1, 4));
        
        // Test sequences starting with 7
        test("Sequence 7,1", "17", CountAndSay.compute(7, 1));
        test("Sequence 7,2", "1117", CountAndSay.compute(7, 2));
        test("Sequence 7,3", "3117", CountAndSay.compute(7, 3));
        
        // Test edge cases
        test("Edge case 2,1", "12", CountAndSay.compute(2, 1));
        test("Edge case 11,1", "21", CountAndSay.compute(11, 1));
        
        // Test error cases
        testException("Negative starting number", () -> CountAndSay.compute(-1, 0));
        testException("Zero starting number", () -> CountAndSay.compute(0, 0));
        testException("Negative row number", () -> CountAndSay.compute(1, -1));
        testException("Row number too large", () -> CountAndSay.compute(1, 41));
        
        // Test multiple rows generation
        try {
            String[] result = CountAndSay.generateMultipleRows(1, 3);
            test("Multiple rows length", "3", String.valueOf(result.length));
            test("Multiple rows [0]", "Row 0: 1", result[0]);
            test("Multiple rows [1]", "Row 1: 11", result[1]);
            test("Multiple rows [2]", "Row 2: 21", result[2]);
        } catch (Exception e) {
            System.out.println("❌ Multiple rows test failed: " + e.getMessage());
            tests++;
        }
        
        System.out.println("\n=== Test Results ===");
        System.out.println("Passed: " + passed + "/" + tests);
        if (passed == tests) {
            System.out.println("🎉 All tests passed!");
        } else {
            System.out.println("❌ " + (tests - passed) + " tests failed.");
        }
    }
    
    private static void test(String name, String expected, String actual) {
        tests++;
        if (expected.equals(actual)) {
            System.out.println("✅ " + name + ": " + actual);
            passed++;
        } else {
            System.out.println("❌ " + name + ": expected '" + expected + "', got '" + actual + "'");
        }
    }
    
    private static void testException(String name, Runnable test) {
        tests++;
        try {
            test.run();
            System.out.println("❌ " + name + ": expected exception but none was thrown");
        } catch (Exception e) {
            System.out.println("✅ " + name + ": " + e.getClass().getSimpleName());
            passed++;
        }
    }
    
    @FunctionalInterface
    interface Runnable {
        void run() throws Exception;
    }
}
