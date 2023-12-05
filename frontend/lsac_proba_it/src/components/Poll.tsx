import "./cmp_styles/poll.css";

function Poll() {
  function handleVote(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const selectedOption = formData.get(pollID1); // this isn't working just temp fix
    console.log(selectedOption);
  }

  const pollID1 = "1";
  // const pollID2 = "2";
  const option1 = "Option 1";
  const option2 = "Option 2";
  const question = "What is your favourite option?";

  return (
    <>
      <div className="poll-body">
        <div className="individual-poll">
          <div className="question-text">
            <strong>{question}</strong>
          </div>
          <p className="make-a-choice">Make a choice:</p>
          <form onSubmit={handleVote} className="radio-form">
            <label>
              <input name={pollID1} type="radio" value={option1} />
              {option1}
            </label>
            <label>
              <input name={pollID1} type="radio" value={option2} />
              {option2}
            </label>
            <button className="radio-form-btn" type="submit">
              Vote
            </button>
          </form>
        </div>
        <div className="individual-poll">
          <div className="question-text">{question}</div>
          <p className="make-a-choice">Make a choice:</p>
          <form onSubmit={handleVote} className="radio-form">
            <label>
              <input name={pollID1} type="radio" value={option1} />
              {option1}
            </label>
            <label>
              <input name={pollID1} type="radio" value={option2} />
              {option2}
            </label>
            <button className="radio-form-btn" type="submit">
              Vote
            </button>
          </form>
        </div>{" "}
        <div className="individual-poll">
          <div className="question-text">{question}</div>
          <p className="make-a-choice">Make a choice:</p>
          <form onSubmit={handleVote} className="radio-form">
            <label>
              <input name={pollID1} type="radio" value={option1} />
              {option1}
            </label>
            <label>
              <input name={pollID1} type="radio" value={option2} />
              {option2}
            </label>
            <button className="radio-form-btn" type="submit">
              Vote
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Poll;
