import { useState } from 'react';
import './App.css';

const Header = (props) => {
  return (
    <header>
      <h1><a href="/" onClick={(event) => {
        event.preventDefault();
        props.onChangeMode('welcome');
      }}>{props.title}</a></h1>
    </header>
  );
};

const Nav = (props) => {
  const lis = props.topics.map((topic) => (
    <li key={topic.id}><a href={"/content/" + topic.id} onClick={event => {
      event.preventDefault();
      props.onChangeMode(topic.id);
    }}>{topic.title}</a></li>
  ));

  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  );
}

const Article = (props) => {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function App() {
  const [mode, setMode] = useState('welcome');
  const [id, setId] = useState(null);
  const topics = [
    {id: 1, title: 'HTML', body: 'HTML is ...'},
    {id: 2, title: 'CSS', body: 'CSS is ...'},
    {id: 3, title: 'JavaScript', body: 'JavaScript is ...'}
  ]
  let content = null;
  if (mode === 'welcome') {
    content = <Article title="Welcome" body="Hello, WEB"/>
  } else if (mode === 'Read') {
    let title , body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
        break;
      }
    }
    content = <Article title={title} body={body}/>
  } else if (mode === 'CSS') {
    content = <Article title="CSS" body="CSS is ..."/>
  } else if (mode === 'JavaScript') {
    content = <Article title="JavaScript" body="JavaScript is ..."/>
  }
  
  return (
    <div>
      <Header title="WEB" onChangeMode={(msg) => {
        setMode('welcome');
      }} />
      <Nav topics={topics} onChangeMode={(_id) => {
        setMode('Read');
        setId(_id);
      }}/>
      {content}
      <Article title="Welcome" body="Hello, WEB"/>
      <Article title="Hi" body="Hello, React"/>
    </div>
  );
}

export default App;
