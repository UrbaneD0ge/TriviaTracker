<script>
  import { onMount } from 'svelte';

  const rounds = Array.from({ length: 6 }, (_, i) => i + 1);
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

<!-- HTML STARTS HERE -->
<div id="app">
  <h1>Trivia Tracker</h1>
  <h2>Current Score: <span id="score">{score}</span></h2>
  <table>
    <thead>
      <tr>
        <th>2X</th>
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
              onchange={() => selectRound(round)}><br>
              <label for="doubledRound-{round}"></label>
            R{round}</td>
          {#each questions as question, qIdx}
            <td>
              <label class="custom-checkbox">
                <input
                  type="checkbox"
                  onclick={(e) => toggleIdx(rIdx * questions.length + qIdx, e.currentTarget)}
                />
                <span aria-hidden="true"></span>
              </label>
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>

  <div style="display: flex; gap: 10px; margin-top: 20px;">
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
  <button id="youTube">
    <a href="https://www.youtube.com/results?search_query=dirty+south+trivia+" target="_blank" rel="noopener noreferrer">YouTube</a>
  </button>
  <button id="dstLink">
    <a href="https://www.dirtysouthtrivia.com/" target="_blank" rel="noopener noreferrer">DST Website</a>
  </button>
</div>

<!-- Weekly answer selector: -->
<!-- #comp-mi2v68uj > p:nth-child(3) > span -->

<footer>Made with Svelte by <a href="https://kipdunlap.me">Kip Dunlap</a></footer>
</div>

<style>
  table {
    border-collapse: collapse;
    width: 100%;
    height: 60svh;
  }

  th, td {
    border: 0px none #ddd;
    padding: 0px;
    text-align: center;
  }

  th {
    background-color: #646464;
    border-radius: 5px;
    margin: 0;
    padding: 2px 0;
  }

  input[type="radio"] {
    transform: scale(1.5);
    /* margin: 5px; */
  }

  .custom-checkbox {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    position: relative;
  }

  .custom-checkbox input[type="checkbox"] {
    position: absolute;
    inset: 0;
    opacity: 0;
    margin: 0;
    cursor: pointer;
    z-index: 2;
    appearance: none;
    -webkit-appearance: none;
  }

  .custom-checkbox span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 2px solid #ab0000;
    border-radius: 8px;
    background: #ab0000;
    transition: background 0.2s ease, border-color 0.2s ease;
    pointer-events: none;
  }

  .custom-checkbox span::after {
    content: '';
    display: block;
    transform: scale(0);
    transition: transform .35s ease-in-out;
  }

  .custom-checkbox input[type="checkbox"]:not(:checked) + span::after {
    content: 'X';
    color: white;
    font-size: 28px;
    transform: scale(1);
    line-height: 1;
  }

  .custom-checkbox input[type="checkbox"]:checked + span {
    border-color: #429e63;
    background-color: #429e63;
  }

  .custom-checkbox input[type="checkbox"]:checked + span::after {
    content: '✔';
    color: white;
    font-size: 22px;
    transform: scale(1);
    line-height: 1;
  }

  .custom-checkbox input[type="checkbox"]:indeterminate + span {
    border-color: #ccc;
    background-color: #555;
  }

  .custom-checkbox input[type="checkbox"]:indeterminate + span::after {
    content: '';
    width: 14px;
    height: 3px;
    background-color: white;
    transform: scale(1);
  }

  footer {
    margin-top: auto;
    padding-top: 20px;
  }

  h1, h2 {
    margin: 5px 0;
  }

  button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    /* give the button a little dimension with inset shadow */
    box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.2);
    background-color: #2a5aca;
    color: white;
    font-weight: bold;
  }

  a {
    color: #2a5aca;
    text-decoration: none;
  }

  button a {
    color: white;
  }

  #app {
    /* max-width: 95svw; */
    /* padding: 10px; */
    margin: auto;
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 80vh;
  }

  #score {
    font-size: 24px;
    color: #ffffff;
    text-decoration: underline;
  }

  #youTube {
    background-color: #FF0000;
  }

  #dstLink {
    background-color: #429e63;
  }

</style>
