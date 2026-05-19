<h1>Trivia Tracker</h1>
<h2>Current Score: <span id="score">{score.length}</span></h2>
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
    let score = [];
    // Set score to the number of checkboxes that are checked
    function updateScore() {
        score = [];
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                score.push(1);
            }
        });
        return score.length;
    }
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

  /* When a row is active, scale the checkboxes */
</style>
