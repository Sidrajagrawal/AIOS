# Code Cheater Agent
<p className="font-hand text-xl text-gray-400 mb-8">Algorithmic execution and optimized problem solving.</p>

---

The CodeCheater agent (`CodeCheater.py`) is a specialized module within the Developer Package, strictly optimized for competitive programming and rapid algorithmic problem-solving on platforms like LeetCode and CodeChef.

## Execution Directives
To ensure maximum efficiency during timed programming scenarios, CodeCheater utilizes aggressive formatting directives. 

*   **Primary Languages:** The agent is heavily biased toward generating high-performance **Java** and **Python** solutions.
*   **Zero-Cruft Output:** CodeCheater is instructed to output pure logic. It intentionally strips out all comments and standardizes or flattens indentation to provide raw, immediately deployable code without visual bloat.

## Tool Integration
It relies heavily on `cli_tool.py` to silently compile and test its raw output against local edge-cases before returning the final snippet to the frontend UI.