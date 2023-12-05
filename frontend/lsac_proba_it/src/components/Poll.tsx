import React, { useEffect, useState } from "react";
import axios from "axios";

import "./cmp_styles/poll.css";

function Poll() {
  const [polls, setPolls] = useState([]);
  const [vote_poll_id, setVotePollId] = useState("");

  const [loadedPolls, setLoadedPolls] = useState(false);

  if (!loadedPolls) {
    setLoadedPolls(true);
    axios
      .get("http://localhost:5000/polls")
      .then((response) => {
        setPolls(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  function handleVote(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const selectedOption = formData.get(vote_poll_id);
    alert(selectedOption);

    axios.post("http://localhost:5000/vote", {
      // TODO: implement vote
    });
  }

  return (
    <>
      <div className="poll-body">
        {polls.map((poll, index) => (
          <div className="individual-poll" key={index}>
            <form onSubmit={handleVote}>
              <div className="radio-form">
                <div className="question">
                  <strong>{poll.question}</strong>
                </div>
                <p className="make-a-choice">Make a choice</p>
                {poll.options.map((option: any) => (
                  <label>
                    <input name={poll._id} type="radio" value={option.text} />
                    {option.text}
                  </label>
                ))}
                <div className="form-btn-div">
                  <button className="radio-form-btn" type="button">
                    Delete
                  </button>
                  <button
                    className="radio-form-btn"
                    type="submit"
                    onClick={() => {
                      setVotePollId(poll._id);
                    }}
                  >
                    Vote
                  </button>
                </div>
              </div>
            </form>
          </div>
        ))}
      </div>
    </>
  );
}

export default Poll;
