import React from 'react';
import { ButtonGroup, Button, Form, Row, Col } from 'react-bootstrap';
import grouping from "../domain/grouping";
import cards from "../domain/cards";
import Group from './Group';

function App() {
  const [data, setData] = React.useState([]);
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);
  const [groupBy, setGroupBy] = React.useState("q");
  const [query, setQuery] = React.useState("board:Work list:Done is:archived edited:90")
  const [trelloKey, setTrelloKey] = React.useState("");
  const [trelloToken, setTrelloToken] = React.useState("");

  return <div>
    <div className="group">
      <Row>
        <Col>
          <h1 className="logo">Backboard</h1>
        </Col>
        <Col></Col>
        <Col md={4}>
          <Form className="auth" onSubmit={enter}>
            {!isAuthenticating && 
            <Button 
              variant={isAuthenticated() ? "outline-success" : "outline-info"} 
              onClick={() => setIsAuthenticating(true)}>
              Authenticate{isAuthenticated() && "d" }
            </Button>
            }
            {isAuthenticating && 
              <>
                <Form.Control type="password" placeholder="Trello API key"
                  value={trelloKey} name="username" onChange={(e) => setTrelloKey(e.target.value)} />
                <Form.Control type="password" placeholder="Trello API token"
                  value={trelloToken} name="password" onChange={(e) => setTrelloToken(e.target.value)} />
                <Button type="submit" onClick={e => setIsAuthenticating(false)}>Done</Button>
              </>
            }
          </Form>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          {isAuthenticated() &&
            <Form onSubmit={enter} className="query">
              <Form.Control type="text" placeholder="Search query" value={query} onChange={(e) => setQuery(e.target.value)} />
              <Button variant={isLoaded() ? "outline-primary" : "primary" } type="submit">Load</Button>
            </Form>
            }
        </Col>
        <Col md={4}>
          {isAuthenticated() && isLoaded() && 
            <Form className="grouping">
              <ButtonGroup aria-label="Grouping">
                <Button variant="info" active={groupBy==="W"} onClick={() => setGroupBy("W")}>Week</Button>
                <Button variant="info" active={groupBy==="M"} onClick={() => setGroupBy("M")}>Month</Button>
                <Button variant="info" active={groupBy==="q"} onClick={() => setGroupBy("q")}>Quarter</Button>
              </ButtonGroup>
            </Form>
          }
        </Col>
      </Row>
    </div>

    {grouping.by(data, groupBy)
      .map((g, key) => <Group key={key} title={g.title} cards={g.items} />)}
  </div>

  function enter(e) {
    load();
    e.preventDefault();
  }

  function load() {
    setData([]);
    cards.load(trelloKey, trelloToken, query)
      .then(results => {
        setData(results);
      })
  }

  function isAuthenticated() {
    return !!trelloKey && !!trelloToken && !isAuthenticating;
  }

  function isLoaded() {
    return !!data.length;
  }
}

export default App;
