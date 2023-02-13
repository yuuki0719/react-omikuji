import {useState, useEffect} from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Button from './components/Button';
import Result from './components/Result';
import './App.css';
const query = `
{
  omikujiCollection {
    items {
      title
      description
    }
  }
}
`
function App() {
  const [page, setPage] = useState(null);

  useEffect(() => {
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/reb9eu4dhxhb/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer S7DU5L-bAzhRQZ4bfI87_-sSYd6PC3M4Qiwn2Vz8mv4",
        },
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }
        const number = Math.floor( Math.random() * ((data.omikujiCollection.items.length - 1) + 1 - 0) ) + 0
        setPage(data.omikujiCollection.items[number]);
      });
  }, []);

  if (!page) {
    return "Loading...";
  }

  return (
    <div className="App">
      <Router basename='/react-omikuji/'>
        <Route exact path='/' render={() => <Button text='今日の運勢を占う'/>} />
        <Route exact path='/result' render={() => <Result title={page.title} description={page.description}/>} />
      </Router>
    </div>
  );
}

export default App;
