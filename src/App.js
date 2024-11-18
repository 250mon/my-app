import './App.css';

const Header = (props) => {
  return (
    <header>
      <h1><a href="/">{props.title}</a></h1>
    </header>
  );
};

const Nav = (props) => {
  const lis = props.topics.map((topic) => (
    <li key={topic.id}><a href={"/content/" + topic.id}>{topic.title}</a></li>
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
  const topics = [
    {id: 1, title: 'HTML', body: 'HTML is ...'},
    {id: 2, title: 'CSS', body: 'CSS is ...'},
    {id: 3, title: 'JavaScript', body: 'JavaScript is ...'}
  ]
  return (
    <div>
      <Header title="WEB" />
      <Nav topics={topics} />
      <Article title="Welcome" body="Hello, WEB"/>
      <Article title="Hi" body="Hello, React"/>
    </div>
  );
}

export default App;
