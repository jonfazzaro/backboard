import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import { ButtonGroup, Button, Form, Row, Col } from 'react-bootstrap';
import Group from './Group';
import cards from './domain/cards';
import './App.css';

function App(props) {
  const [data, setData] = React.useState({ cards: [] });
  const [grouping, setGrouping] = React.useState("W");
  const [query, setQuery] = React.useState("board:Work list:Done is:archived edited:90")
  const [trelloKey, setTrelloKey] = React.useState("");
  const [trelloToken, setTrelloToken] = React.useState("");

  React.useEffect(load, []);

  return <div>

    <div className="group">
      <Row>
        <Col>
          <ButtonGroup aria-label="Grouping">
            <Button variant="secondary" onClick={() => setGrouping("W")}>Week</Button>
            <Button variant="secondary" onClick={() => setGrouping("M")}>Month</Button>
            <Button variant="secondary" onClick={() => setGrouping("Q")}>Quarter</Button>
          </ButtonGroup>
        </Col>
        <Col md={4}>
          <Form onSubmit={enter}>
            <Form.Control inline="true" type="text" placeholder="Search query"
              value={query} onChange={(e) => setQuery(e.target.value)} />
          </Form>
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col></Col>
        <Col md={4}>
          <Form onSubmit={enter}>
            <Form.Control type="password" placeholder="Trello API key"
              value={trelloKey} name="key" onChange={(e) => setTrelloKey(e.target.value)} />
            <Form.Control type="password" placeholder="Trello API token"
              value={trelloToken} name="token" onChange={(e) => setTrelloToken(e.target.value)} />
          </Form>
        </Col>
      </Row>
    </div>

    {group(data.cards, grouping)
      .map((g, key) => <Group key={key} title={g.title} cards={g.items} />)}
  </div>

  function enter(e) {
    load();
    e.preventDefault();
  }

  function load() {
    cards.load(trelloKey, trelloToken, query)
      .then(results => {
        setData(results);
      })
  }
}

function group(items, grouping) {
  return Object.entries(_.groupBy(items,
    (d) => moment(d.dateLastActivity).format(grouping)))
    .map(([k, i]) => {
      return {
        title: title(k, grouping),
        items: i
      };
    });
}

function title(key, by) {
  return {
    "W": "Week of " + monday(key),
    "M": month(key),
    "Q": "Q" + key
  }[by];
}

function month(number) {
  return moment()
    .date(1)
    .month(number - 1)
    .format("MMMM yyyy");
}

function monday(number) {
  return moment()
    .day("Monday")
    .week(number)
    .format("MMMM D");
}

export default App;
