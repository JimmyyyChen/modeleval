export default function CompletedTesting() {
  return (
    // tabIndex={0} attribute is necessary to make the div focusable
    <div tabIndex={0} className="collapse collapse-arrow border bg-white p-2 ">
      <div className="items-center collapse-title flex space-x-3">
        <div className="font-mono text-xl font-bold">GPT-4</div>
        <div className="font-medium text-gray-400">正确率66% • 用时xx分钟</div>
      </div>
      <div className="collapse-content overflow-x-auto">
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th></th>
                <th>是否正确</th>
                <th>类型</th>
                <th>问题</th>
                <th>生成答案</th>
                <th>正确答案</th>
                <th>选项 A</th>
                <th>选项 B</th>
                <th>选项 C</th>
                <th>选项 D</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>❌</td>
                <td>abstract_algebra</td>
                <td>The cyclic subgroup of Z_24 generated by 18 has order</td>
                <td>B</td>
                <td>A</td>
                <td>4</td>
                <td>8</td>
                <td>12</td>
                <td>6</td>
              </tr>
              <tr>
                <th>2</th>
                <td>✅</td>
                <td>abstract_algebra</td>
                <td>
                  Statement 1 | A permutation that is a product of m even
                  permutations and n odd permutations is an even permutation if
                  and only if n is even. Statement 2 | Every group is isomorphic
                  to a group of permutations.
                </td>
                <td>A</td>
                <td>A</td>
                <td>True, True</td>
                <td>False, False</td>
                <td>True, False</td>
                <td>False, True</td>
              </tr>
              <tr>
                <th>3</th>
                <td>✅</td>
                <td>college_computer_science</td>
                <td>
                  Sometimes the object module produced by a compiler includes
                  information (from the symbol table) mapping all source program
                  names to their addresses. The most likely purpose of this
                  information is
                </td>
                <td>A</td>
                <td>A</td>
                <td>for use as input to a debugging aid</td>
                <td>to increase the run-time efficiency of the program</td>
                <td>
                  for the reduction of the symbol-table space needed by the
                  compiler
                </td>
                <td>to tell the loader where each variable belongs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}