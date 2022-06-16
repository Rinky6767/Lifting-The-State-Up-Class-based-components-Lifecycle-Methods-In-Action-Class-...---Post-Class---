import React from "react";
import { Fragment, useState } from "react";
import "./../styles/App.css";
let list = [];
function App() 
{
  const [id, setId] = useState(0);
  const [input, setInput] = useState("");
  const [isEditing, setEditing] = useState(NaN);
  const [newinput, setNewInput] = useState("");
  const [task, setTask] = useState(list);

  function Form() {
    return (
      <>
        <form
          onSubmit={() => {
            setId(id + 1);
            let newtask = {
              name: input,
              id: id
            };
            let newarr = [...task, newtask];
            setTask(newarr);
          }}
        >
          <input required
            type="text"
			id="task"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
          <button id="btn">ADD</button>
        </form>{" "}
      </>
    );
  }

	return (
	<div id="main">
	//Do not alter main div
	//Please do not alter the functional component as tests depend on the type of component.
	<Form />
      <ul>
        {task.map((vals) => {
          return (
            <Fragment key={vals.id}>
              {isEditing !== NaN && isEditing === vals.id ? (
                <>
                  <input className="editTask" required
                    type="text"
                    value={newinput}
                    onChange={(event) => setNewInput(event.target.value)}
                  />
                  <button className="saveTask"
                    onClick={() => {
						if(newinput.length>0){
							let modarr = task.map((val) => {
							  if (val.id === isEditing) {
								val.name = newinput;
							  }
							  return val;
							});
							setEditing(NaN);
							setTask(modarr);
						  }
						}}
                  >
                    SAVE
                  </button>
                </>
              ) : (
                <>
                  <li className="list">{vals.name}</li>
                  <button className="delete"
                    onClick={() => {
                      let newarr = task.filter((val) => {
                        return vals.id !== val.id;
                      });
                      setTask(newarr);
                    }}
                  >
                    Delete
                  </button>
                  <button className="edit"
                    onClick={() => {
                      setEditing(vals.id);
                    }}
                  >
                    Edit
                  </button>
                </>
              )}
            </Fragment>
          );
        })}
      </ul>
	</div>
	);
}
export default App;
