package algorithms;

public class FibonacciGen {
    private int olderPrevious, previous = 0;
    
    public int fibValue(int n) {
        int result = 0;
        if (n == 0) {
            result = 0;
        } else if (n == 1) {
            result = 1;
        } else {
            result = previous + olderPrevious;
        }
        olderPrevious = previous;
        previous = result;
        return result;
    }
    
    public static void main(String[] args) {
        FibonacciGen fibGen = new FibonacciGen();
        for (int i = 0; i <= 10; i++) {
            System.out.println(fibGen.fibValue(i));
        }
    }
}
