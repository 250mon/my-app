import React from "react";
import { useState } from "react";
import  TopicItem  from "./components/TopicItem";
import  TopicForm  from "./components/TopicForm";
import  useTopics  from "./hooks/useTopics";

function App() {
  const { currentTopic, setCurrentTopic } = useState(null);
  const { topics, addTopic, updateTopic, deleteTopic } = useTopics();

  return (
    <div>
      <TopicForm topic={currentTopic} onAdd={addTopic} onUpdate={updateTopic} />
      <ul>
        {topics.map((topic) => (
          <TopicItem
            key={topic.id}
            topic={topic}
            onUpdate={(topic) => {
              setCurrentTopic(topic);
              updateTopic(topic);
              setCurrentTopic(null);
            }}
            onDelete={deleteTopic}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
