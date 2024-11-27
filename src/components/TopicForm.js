import React, { useState } from "react";

export const TopicForm = ({ topic, onAdd, onUpdate }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDetaulf();
    if (!topic && title.trim() && body.trim()) {
      onAdd({ title: title, body: body });
    } else if (topic && title.trim() && body.trim()) {
      onUpdate({ ...topic, title, body });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="title"
        value={topic.title || ""}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <input
        type="text"
        name="body"
        placeholder="body"
        value={topic.body || ""}
        onChange={(e) => setBody(e.target.value)}
      ></input>
      <button type="submit">Add</button>
    </form>
  );
};
