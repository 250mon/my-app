import React, { useState, useEffect } from "react";

function TopicForm({ topic, onAdd, onUpdate }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (topic) {
      setTitle(topic.title);
      setBody(topic.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [topic]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic) {
      onUpdate({ ...topic, title, body });
    } else {
      onAdd({ title, body });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
      </div>
      <div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="body"
        />
      </div>
      <div>
        <button type="submit">{topic ? "Update" : "Add"}</button>
      </div>
    </form>
  );
}

export default TopicForm;
