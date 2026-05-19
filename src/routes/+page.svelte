<h1>Trivia Tracker</h1>
<h2>Current Score: <span id="score">0</span></h2>
<table>
  <thead>
    <tr>
      <th>Round</th>
      <th>Q1</th>
      <th>Q2</th>
      <th>Q3</th>
      <th>Q4</th>
      <th>Q5</th>
      <th>Q6</th>
      <th>Q7</th>
      <th>Q8</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Round 1</td>
      <td><input type="checkbox" /></td>
      <td><input type="checkbox" /></td>
      <td><input type="checkbox" /></td>
      <td><input type="checkbox" /></td>
      <td><input type="checkbox" /></td>
      <td><input type="checkbox" /></td>
      <td><input type="checkbox" /></td>
      <td><input type="checkbox" /></td>
    </tr>
    <tr>
      <td>Round 2</td>
      <td><input type="checkbox" /></td>
      <td><input type="checkbox" /></td>
      <td><input type="checkbox" /></td>
      <td><input type="checkbox" /></td>
      <td><input type="checkbox" /></td>
      <td><input type="checkbox" /></td>
      <td><input type="checkbox" /></td>
      <td><input type="checkbox" /></td>
    </tr>
    <tr>
      <td>Round 3</td>
      <td><input type="checkbox" /></td>
      <td><input type="checkbox" /></td>
      <td><input type="checkbox" /></td>
      <td><input type="checkbox" /></td>
      <td><input type="checkbox" /></td>
      <td><input type="checkbox" /></td>
      <td><input type="checkbox" /></td>
      <td><input type="checkbox" /></td>
    </tr>
    <tr>
        <td>Round 4</td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>  
    </tr>
    <tr>
        <td>Round 5</td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
    </tr>
    <tr>
        <td>Round 6</td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
    </tr>
    <tr>
        <td>Round 7</td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
    </tr>
    <tr>
        <td>Round 8</td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" /></td>
    </tr>
  </tbody>
</table>

<script>
    let score = document.querySelectorAll('input[type="checkbox"]');
    score.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            let totalScore = 0;
            score.forEach((cb) => {
                if (cb.checked) {
                    totalScore++;
                }
            });
            console.log(`Total Score: ${totalScore}`);
        });
    });
</script>

<style>
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #f2f2f2;
  }

  input[type="checkbox"] {
    transform: scale(2);
  }
</style>
