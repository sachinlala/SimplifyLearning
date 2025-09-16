# Radix Sort

A stable, non-comparison based sorting algorithm that processes individual digits. Uses counting sort as a subroutine to sort digits from least significant to most significant.

## Algorithm Overview

**Radix Sort** is a distribution sorting algorithm that sorts integers by processing individual digits. It works by performing counting sort for each digit position, starting from the least significant digit (ones place) and moving toward the most significant digit.

### Key Characteristics

- **Time Complexity**: O((n + k) × d) where n = elements, k = radix (10 for decimal), d = digits
- **Space Complexity**: O(n + k) for counting and output arrays
- **Stable**: Yes (maintains relative order of equal elements)
- **In-place**: No (requires additional space)
- **Comparison-based**: No (distribution sort)

### When to Use

✅ **Good for:**
- Sorting integers with known, reasonable digit count
- When stability is required
- When linear time relative to digits is beneficial
- Input elements are non-negative integers
- Alternative to comparison-based sorts for integer data

❌ **Not suitable for:**
- Large digit counts (performance degrades)
- Floating-point numbers without preprocessing
- Negative numbers (without modification)
- General comparison-based sorting needs

## Usage

### Basic Usage

```javascript
const { RadixSortModule } = require('./index.js');

// Simple sorting
const sorted = RadixSortModule.sort([170, 45, 75, 90, 2, 802, 24, 66]);
console.log(sorted); // [2, 24, 45, 66, 75, 90, 170, 802]

// With detailed results and metrics
const result = RadixSortModule.radixSort([170, 45, 75, 90, 2, 802, 24, 66]);
console.log('Sorted:', result.sortedArray);
console.log('Metrics:', result.metrics);
```

### Step-by-Step Visualization

```javascript
// Get step-by-step execution for visualization
const result = RadixSortModule.sortWithSteps([170, 45, 75, 90, 2, 802, 24, 66]);

console.log('Steps:', result.steps.length);
result.steps.forEach((step, i) => {
    console.log(`Step ${i + 1}: ${step.message}`);
});
```

### Quick Demo

```javascript
// Run a quick demonstration
RadixSortModule.demo(); // Uses default test case
RadixSortModule.demo([24, 170, 45]); // Custom input
```

### Input Analysis

```javascript
// Analyze input to predict performance
const analysis = RadixSortModule.analyze([170, 45, 75, 90, 2, 802, 24, 66]);
console.log('Analysis:', analysis);
// Output: { elements: 8, maxValue: 802, digits: 3, predictedPasses: 3, ... }
```

### Input Validation

```javascript
// Validate input before sorting
const validation = RadixSortModule.validate([123, 456, 789]);
if (validation.valid) {
    console.log('Input is valid');
} else {
    console.log('Error:', validation.message);
}
```

### Performance Comparison

```javascript
// Compare with other sorting algorithms
const comparison = RadixSortModule.compare(
    [170, 45, 75, 90, 2, 802, 24, 66],
    (arr) => arr.sort((a, b) => a - b),
    'JavaScript Sort'
);
console.log(comparison);
```

## Algorithm Steps

1. **Find Maximum**: Determine the maximum value to count digits needed
2. **For each digit position** (ones, tens, hundreds, etc.):
   - **Extract Digit**: Get the digit at current position for each element
   - **Counting Sort**: Use counting sort to sort by this digit
   - **Maintain Stability**: Process elements consistently to preserve order
3. **Complete**: After all digit positions processed, array is sorted

## Example Walkthrough

Input: `[170, 45, 75, 90, 2, 802, 24, 66]`

Maximum = 802 (3 digits), so 3 passes needed:

### Pass 1 (Ones digit):
- Extract: [0,5,5,0,2,2,4,6]  
- Sort by ones: [170, 90, 2, 802, 24, 45, 75, 66]

### Pass 2 (Tens digit):
- Extract: [7,9,0,0,2,4,7,6]
- Sort by tens: [2, 802, 24, 45, 66, 170, 75, 90]

### Pass 3 (Hundreds digit):
- Extract: [0,8,0,0,0,1,0,0]
- Sort by hundreds: [2, 24, 45, 66, 75, 90, 170, 802]

**Result**: `[2, 24, 45, 66, 75, 90, 170, 802]`

## Configuration

The module includes comprehensive configuration for interactive demos:

- **Test Cases**: 9 predefined test cases from easy to hard
- **Visualization**: Color schemes for different phases and digit processing
- **Validation**: Input constraints and custom validators
- **Performance**: Comparison data with other algorithms

## Files

- `radix-sort-core.js` - Core algorithm implementation
- `radix-sort-config.js` - Configuration for demos and visualization
- `test-radix-sort.js` - Comprehensive test suite
- `index.js` - Main module entry point
- `README.md` - This documentation

## Testing

Run the test suite to verify the implementation:

```bash
node test-radix-sort.js
```

All tests should pass, verifying:
- Basic functionality across different input sizes
- Edge cases (single elements, zeros, powers of 10)
- Input validation and error handling
- Stability properties
- Configuration test cases
- Performance characteristics

## Browser Usage

The module works in both Node.js and browser environments:

```html
<script src="radix-sort-core.js"></script>
<script src="radix-sort-config.js"></script>
<script src="index.js"></script>

<script>
    // Use RadixSortModule in browser
    const result = RadixSortModule.sort([170, 45, 75, 90, 2]);
    console.log(result);
</script>
```

## Algorithm History

Radix Sort is one of the oldest sorting algorithms, with origins dating back to the 1800s when it was used for sorting punched cards. The algorithm became popular in computer science for sorting integers efficiently when the range of digits is reasonable.

## Complexity Analysis

### Time Complexity: O((n + k) × d)
- Finding maximum: O(n)
- For each of d digit positions:
  - Counting sort: O(n + k) where k=10 (radix)
- Total: O(n + d × (n + k)) = O((n + k) × d)

### Space Complexity: O(n + k)
- Counting array: O(k) = O(10) = O(1)
- Output array: O(n)
- Total: O(n + k)

### Performance Characteristics
- **Best Case**: When d (digits) is small relative to n
- **Worst Case**: When d (digits) is large
- **Practical**: Excellent for 1-4 digit numbers, good for 5-6 digits

### Comparison with Other Algorithms

| Algorithm | Time Complexity | Space | Stable | Comparisons |
|-----------|----------------|-------|--------|-------------|
| Radix Sort | O((n+k)×d) | O(n+k) | Yes | 0 |
| Quick Sort | O(n log n) avg | O(log n) | No | Many |
| Merge Sort | O(n log n) | O(n) | Yes | Many |
| Counting Sort | O(n+k) | O(k) | Yes | 0 |

## Tips for Usage

1. **Check digit count** before choosing radix sort
2. **Use for integer data** with reasonable value ranges
3. **Consider counting sort** if all values fit in small range
4. **Stable by design** - great when order preservation matters
5. **Linear time** - faster than comparison sorts for suitable data