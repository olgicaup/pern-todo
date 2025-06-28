import React, { Fragment, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const InputTodo = () => {

    const [description, setDescription] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch(`${API_URL}/todos`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/";

        } catch (err) {
            console.error(err.message)
        }
    };

    return (
        <Fragment>
            <h1 className="text-center mt-5">PERN Todo List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button className="btn btn-success">Add Todo</button>

            </form>
        </Fragment>
    )
};

export default InputTodo;
