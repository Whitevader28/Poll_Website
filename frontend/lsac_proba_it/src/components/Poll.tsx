import React, { useEffect, useState } from "react";
import axios from "axios";

import "./cmp_styles/poll.css";

function Poll() {
  const [polls, setPolls] = useState([]);
  const [vote_poll_id, setVotePollId] = useState("");
  const [delete_poll_id, setDeletePollId] = useState("");

  axios
    .get("http://localhost:5000/polls")
    .then((response) => {
      setPolls(response.data);
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });

  function handleVote(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const selectedOption = formData.get(vote_poll_id);

    axios
      .patch(`http://localhost:5000/polls/vote/${vote_poll_id}`, {
        option: selectedOption,
        voter: localStorage.getItem("user_email"),
      })
      .then((response) => {
        alert(response.data);
        window.location.reload();
      })
      .catch((error) => {
        alert(error.response.data);
        console.log("There was an error!", error);
      });
  }

  function handleDelete(e: any) {
    e.preventDefault();

    axios
      .delete(`http://localhost:5000/polls/${delete_poll_id}`, {
        params: {
          owner: localStorage.getItem("user_email"),
        },
      })
      .then((response) => {
        alert(response.data);
        window.location.reload();
      })
      .catch((error) => {
        alert(error.response.data);
        console.log("There was an error!", error);
      });
  }

  return (
    <>
      <div className="poll-body">
        {polls.map((poll, index) => (
          <div className="individual-poll" key={index}>
            <form onSubmit={handleVote} onReset={handleDelete}>
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
                  {(() => {
                    if (poll.owner == localStorage.getItem("user_email")) {
                      return (
                        <>
                          <button
                            className="radio-form-btn"
                            type="reset"
                            onClick={() => {
                              setDeletePollId(poll._id);
                            }}
                          >
                            Delete
                          </button>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <button
                            className="radio-form-btn invisible"
                            type="button"
                          >
                            Delete
                          </button>
                        </>
                      );
                    }
                  })()}
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
