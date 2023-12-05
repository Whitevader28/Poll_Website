import React, { useEffect, useState } from "react";
import axios from "axios";

import "./cmp_styles/poll.css";

function Poll() {
  const [polls, setPolls] = useState([]);

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

  console.log(polls);

  function handleVote(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const selectedOption = formData.get(pollID1); // this isn't working just temp fix
    console.log(selectedOption);
  }
  const pollID1 = "1";

  // polls.map((poll, index) => {
  //   console.log(poll.options[0]);
  //   console.log(index);
  // });

  return (
    <>
      <div className="poll-body">
        {/* {polls.map((poll, index) => (
          <div key={index}>
            <form>
              <label>
                <input name={poll._id} type="radio" value={poll.option[0]} />
                {poll.option1}
              </label>
              <label>
                <input
                  name={poll.poll._id}
                  type="radio"
                  value={poll.option[1]}
                />
                {poll.options[1]}
              </label>
              <div className="form-btn-div">
                <button className="radio-form-btn" type="button">
                  Delete
                </button>
                <button className="radio-form-btn" type="submit">
                  Vote
                </button>
              </div>
            </form>
          </div>
        ))} */}
      </div>
    </>
  );
}

export default Poll;
