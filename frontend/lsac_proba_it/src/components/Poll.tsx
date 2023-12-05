import "./cmp_styles/Poll.css";

function Poll() {
  function handleVote(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const selectedOption = formData.get(pollID);
    console.log(selectedOption);
  }

  const pollID = "1";
  const option1 = "Option 1";
  const option2 = "Option 2";
  const question = "What is your favourite option?";

  return (
    <>
      <div className="poll-body">
        <div className="individual-poll">
          <div className="question-text">{question}</div>
          <p className="make-a-choice">Make a choice:</p>
          <form onSubmit={handleVote}>
            <label>
              <input name={pollID} type="radio" value={option1} />
              {option1}
            </label>
            <label>
              <input name={pollID} type="radio" value={option2} />
              {option2}
            </label>
            <button type="submit">Vote</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Poll;
