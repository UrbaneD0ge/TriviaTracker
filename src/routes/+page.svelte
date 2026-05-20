<script>
  import { onMount } from 'svelte';

  const rounds = Array.from({ length: 8 }, (_, i) => i + 1);
  const questions = Array.from({ length: 8 }, (_, i) => i + 1);
  // answers can be 'checked' | 'unchecked' | 'indeterminate'
  let answers = Array.from({ length: rounds.length * questions.length }, () => 'indeterminate');
  let selectedRound = $state(null);

  let score = $state(0);
  $effect(() => {
    const checkedCount = answers.filter((a) => a === 'checked').length;
    if (selectedRound != null) {
      const rowStart = (selectedRound - 1) * questions.length;
      const rowEnd = rowStart + questions.length;
      const selectedRowChecked = answers.slice(rowStart, rowEnd).filter((a) => a === 'checked').length;
      score = checkedCount + selectedRowChecked;
    } else {
      score = checkedCount;
    }
    console.log(`Current score: ${score}`);
  });

  // On page load, load the answer array from localStorage and set the checkboxes accordingly.
  function saveAnswers() {
    localStorage.setItem('trivia-answers', JSON.stringify({ answers, selectedRound }));
  }

  function selectRound(round) {
    selectedRound = round;
    saveAnswers();
    console.log(`Selected round ${round}`);
  }

  onMount(() => {
    const savedAnswers = localStorage.getItem('trivia-answers');
    if (savedAnswers) {
      console.log('Loading saved answers from localStorage');
      const parsed = JSON.parse(savedAnswers);
      answers = parsed.answers ?? answers;
      if ('selectedRound' in parsed) selectedRound = parsed.selectedRound;
    }
    // Ensure DOM checkboxes and radio buttons reflect answers after mount/update
    requestAnimationFrame(() => {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox, index) => {
        const val = answers[index] ?? 'indeterminate';
        checkbox.checked = val === 'checked';
        checkbox.indeterminate = val === 'indeterminate';
      });
      const radios = document.querySelectorAll('input[type="radio"]');
      radios.forEach((radio, index) => {
        radio.checked = selectedRound === rounds[index];
      });
    });
    // Calculate initial score after loading answers
    if (selectedRound != null) {
      const checkedCount = answers.filter((a) => a === 'checked').length;
      const rowStart = (selectedRound - 1) * questions.length;
      const rowEnd = rowStart + questions.length;
      const selectedRowChecked = answers.slice(rowStart, rowEnd).filter((a) => a === 'checked').length;
      score = checkedCount + selectedRowChecked;
    } else {
      score = answers.filter((a) => a === 'checked').length;
    }
  });

  // cycle state: indeterminate -> checked -> unchecked -> indeterminate
  function toggleIdx(idx, el) {
    const cur = answers[idx] ?? 'indeterminate';
    let next;
    if (cur === 'indeterminate') next = 'checked';
    else if (cur === 'checked') next = 'unchecked';
    else next = 'indeterminate';
    answers[idx] = next;
    // update DOM state explicitly
    el.checked = next === 'checked';
    el.indeterminate = next === 'indeterminate';
    saveAnswers();
    // console.log(`Toggled index ${idx} to ${next}`);
    // Update score immediately after toggle
    score = answers.filter((a) => a === 'checked').length;
  }
</script>


<div>
  <h1>Trivia Tracker</h1>
  <h2>Current Score: <span id="score">{score}</span></h2>
  <table>
    <thead>
      <tr>
        <th></th>
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
      {#each rounds as round, rIdx}
        <tr>
          <td>
            <input
              type="radio"
              name="doubledRound"
              checked={selectedRound === round}
              onchange={() => selectRound(round)}>
              <label for="doubledRound-{round}"></label>
            R{round}</td>
          {#each questions as question, qIdx}
            <td>
              <input
                type="checkbox"
                onclick={(e) => toggleIdx(rIdx * questions.length + qIdx, e.currentTarget)}
              />
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>

  <button onclick={() => {
    answers = Array.from({ length: rounds.length * questions.length }, () => 'indeterminate');
    selectedRound = null;
    saveAnswers();
    score = 0;
    // Reset all checkboxes in the DOM
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
      checkbox.indeterminate = true;
    });
    // Reset radio buttons
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach((radio) => {
      radio.checked = false;
    });
  }}>Reset</button>
</div>

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
    background-color: #848484;
  }

  input[type="checkbox"] {
    transform: scale(2);
      margin: 5px;
  }

  input[type="checkbox"]:indeterminate {
    accent-color: #ccc;
  }
  input[type="checkbox"]:checked {
    accent-color: green;
    filter: invert(49%) sepia(65%) saturate(7149%) hue-rotate(92deg) brightness(89%) contrast(103%);
}
  input[type="checkbox"]:not(:checked):not(:indeterminate) {
    accent-color: red;
    filter: invert(85%) sepia(83%) saturate(6726%) hue-rotate(360deg) brightness(111%) contrast(111%);
  }

  div {
    /* max-width: 95svw; */
    /* padding: 10px; */
    margin: auto;
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;

  }
</style>
