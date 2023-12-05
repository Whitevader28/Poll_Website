function Poll() {
  function handleVote(e: any) {
    e.prevent.Default();
    console.log("wiiiiii");
  }

  return (
    // <div className="poll-body">
    //   <div>
    //     <div className="question-text"></div>
    //     <form action="">
    //       <label htmlFor="input">
    //         <input type="radio">Option 1</input>
    //         <input type="radio">Option 2</input>
    //         <button type="submit" value="Vote">
    //           Vote
    //         </button>
    //       </label>
    //     </form>
    //   </div>
    // </div>
    <form onSubmit={handleVote}>
      {/* <input type="radio">Option 1</input>
      <input type="radio">Option 2</input> */}
      <button type="submit" value="Vote">
        Vote
      </button>
      <p>This</p>
    </form>
  );
}

export default Poll;
