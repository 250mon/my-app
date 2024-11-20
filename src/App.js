import { useState } from "react";
import "./App.css";

const Header = (props) => {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode("welcome");
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
};

const Nav = (props) => {
  const lis = props.topics.map((topic) => (
    <li key={topic.id}>
      <a
        href={"/content/" + topic.id}
        onClick={(event) => {
          event.preventDefault();
          props.onChangeMode(topic.id);
        }}
      >
        {topic.title}
      </a>
    </li>
  ));

  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
};

const Article = (props) => {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
};

const Create = (props) => {
  return (
    <article>
      <h2>Create</h2>
      <form
        action="/create_process"
        method="post"
        onSubmit={(event) => {
          event.preventDefault();
          props.onCreate(event.target.title.value, event.target.body.value);
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title"></input>
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <input type="submit" value="Create"></input>
        </p>
      </form>
    </article>
  );
};

const Update = (props) => {
  return (
    <article>
      <h2>Update</h2>
      <form
        action="/update_process"
        method="post"
        onSubmit={(event) => {
          event.preventDefault();
          props.onUpdate(event.target.title.value, event.target.body.value);
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title"></input>
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <input type="submit" value="Update"></input>
        </p>
      </form>
    </article>
  );
}

function App() {
  const [mode, setMode] = useState("welcome");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: "HTML", body: "HTML is ..." },
    { id: 2, title: "CSS", body: "CSS is ..." },
    { id: 3, title: "JavaScript", body: "JavaScript is ..." },
  ]);
  let content = null;
  let contextControl = null;
  if (mode === "welcome") {
    content = <Article title="Welcome" body="Hello, WEB" />;
  } else if (mode === "Read") {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
        break;
      }
    }
    content = <Article title={title} body={body} />;
    contextControl = (
      <li>
        <a
          href={"/update" + id}
          onClick={(event) => {
            event.defaultPrevented();
            setMode("Update");
          }}
        >
          Update
        </a>
      </li>
    );
  } else if (mode === "Create") {
    content = (
      <Create
        onCreate={(title, body) => {
          const new_topics = [
            ...topics,
            { id: nextId, title: title, body: body },
          ];
          setTopics(new_topics);
          setMode("Read");
          setId(nextId);
          setNextId(nextId + 1);
        }}
      />
    );
  } else if (mode === "Update") {
    content = (
      <Update
        onUpdate={(title, body) => {
          const new_topics = [...topics];
          for (let i = 0; i < new_topics.length; i++) {
            if (new_topics[i].id === id) {
              new_topics[i].title = title;
              new_topics[i].body = body;
              break;
            }
          }
          setTopics(new_topics);
          setMode("Read");
        }}
      />
    );
  }

  return (
    <div>
      <Header
        title="WEB"
        onChangeMode={(msg) => {
          setMode("welcome");
        }}
      />
      <Nav
        topics={topics}
        onChangeMode={(_id) => {
          setMode("Read");
          setId(_id);
        }}
      />
      {content}
      <ul>
        <li>
          <a
            href="/create"
            onClick={(event) => {
              event.preventDefault();
              setMode("Create");
            }}
          >
            Create
          </a>
        </li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
