import "./RankingTable.css";

const RankingTable = () => {
  return (
    <div className="table-box">
      <h3>Mess Performance Ranking</h3>

      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Mess</th>
            <th>Rating</th>
            <th>Efficiency</th>
            <th>Footfall</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Mess A</td>
            <td>4.8</td>
            <td>94%</td>
            <td>4120</td>
          </tr>

          <tr>
            <td>2</td>
            <td>Mess C</td>
            <td>4.2</td>
            <td>82%</td>
            <td>5842</td>
          </tr>

          <tr>
            <td>3</td>
            <td>Mess B</td>
            <td>3.1</td>
            <td>65%</td>
            <td>2520</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RankingTable;