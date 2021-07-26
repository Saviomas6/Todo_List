import React, { useState, useEffect } from "react";
import {
  MDBListGroup,
  MDBListGroupItem,
  MDBIcon,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";

//to get local items
const getLocalItems = () => {
  let list = localStorage.getItem("lists");

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const App = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [togglebtn, setTogglebtn] = useState(true);
  const [isedititem, setisEditItem] = useState(null);

  //key enter event logic
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addItem();
    } else {
    }
  };

  //add the items
  const addItem = () => {
    if (!inputdata) {
      alert("Please enter the data");
    } else if (inputdata && !togglebtn) {
      setItems(
        items.map((elem) => {
          if (elem.id === isedititem) {
            return { ...elem, name: inputdata };
          }
          return elem;
        })
      );
      setTogglebtn(true);
      setInputData("");
      setisEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };

  //delete a particular element
  const deleteItem = (index) => {
    const updateditems = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updateditems);
  };

  //edit a particular element
  const editItem = (id) => {
    let newEdited = items.find((elem) => {
      return elem.id === id;
    });
    console.log(newEdited);
    setTogglebtn(false);
    setInputData(newEdited.name);
    setisEditItem(id);
  };

  //remove all items
  const removeALL = () => {
    setItems([]);
  };

  //to add to localStorage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <div className="main-div">
      <div className="child-div">
        <img
          src="https://adniasolutions.com/wp-content/uploads/2018/05/To-Do-List-Excel-Template-01.png"
          height="150px"
          width="150px"
          className="img-thumbnail"
          alt="..."
          style={{ maxWidth: "21rem" }}
        />
        <h1>ToDo List</h1>
        <MDBInput
          label="Enter a new task"
          id="form1"
          type="text"
          autoComplete="off"
          value={inputdata}
          onChange={(e) => setInputData(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div>
          {togglebtn ? (
            <MDBIcon
              className="mb-5"
              size="2x"
              fas
              icon="plus"
              onClick={addItem}
            />
          ) : (
            <MDBIcon
              size="2x"
              className="ms-4"
              fas
              icon="edit"
              onClick={addItem}
            />
          )}
        </div>

        {items.map((curE) => {
          return (
            <div>
              <div key={curE.id}>
                <MDBListGroup style={{ minWidth: "22rem" }}>
                  <MDBListGroupItem>
                    {curE.name}
                    <span className="center">
                      <MDBIcon
                        size="2x"
                        className="ms-4"
                        fas
                        icon="trash"
                        onClick={() => deleteItem(curE.id)}
                      />
                      <MDBIcon
                        size="2x"
                        className="ms-4"
                        fas
                        icon="edit"
                        onClick={() => editItem(curE.id)}
                      />
                    </span>
                  </MDBListGroupItem>
                </MDBListGroup>
              </div>
            </div>
          );
        })}

        <br />
        <div className="removeItem">
          <MDBBtn className="mx-2" color="danger" onClick={removeALL}>
            Remove All
          </MDBBtn>
        </div>
      </div>
    </div>
  );
};

export default App;
