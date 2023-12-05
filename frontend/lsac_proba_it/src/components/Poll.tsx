function Poll() {
  function handleVote(e: any) {
    e.prevent.Default();
    console.log("wiiiiii");
  }

  const pollID = "1";

  return (
    <>
      <div className="poll-body">
        <div>
          <div className="question-text"></div>
          <form action="">
            <label>
              <input name={pollID} type="radio" value="Option1" />
              Option 1
            </label>
            <label>
              <input name={pollID} type="radio" value="Option1" />
              Option 2
              <button type="submit" value="Vote">
                Vote
              </button>
            </label>
          </form>
        </div>
      </div>
      <p>This</p>
    </>
  );
}

export default Poll;
