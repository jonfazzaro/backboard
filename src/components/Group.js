import React from "react";
import { ButtonGroup, Button, Row, Col, Form } from "react-bootstrap";
import words from "../domain/words";
import Cloud from "./Cloud";
import Pie from "./Pie";
import Cards from "./Cards";
import Journal from "./Journal";
import Stories from "./Stories";

const CLOUD = "cloud";
const JOURNAL = "journal";
const STORIES = "stories";
const CARDS = "cards";

function Group(props) {
  const [display, setDisplay] = React.useState(CLOUD);

  return (
    <div className="group">
      <Row>
        <Col md={4}>
          <Pie cards={props.cards} size={50} />
          <div className="header">
            <h2>{props.title}</h2>
            <small>{props.cards.length} cards</small>
          </div>
        </Col>
        <Col sm={0}></Col>
        <Col>
          <Form className="display">
            <ButtonGroup aria-label="Grouping">
              <Button
                variant="outline-info"
                active={display === CLOUD}
                onClick={() => setDisplay(CLOUD)}
              >
                Cloud
              </Button>
              <Button
                variant="outline-info"
                active={display === CARDS}
                onClick={() => setDisplay(CARDS)}
              >
                Cards
              </Button>
              <Button
                variant="outline-info"
                active={display === JOURNAL}
                onClick={() => setDisplay(JOURNAL)}
              >
                Journal
              </Button>
              <Button
                variant="outline-info"
                active={display === STORIES}
                onClick={() => setDisplay(STORIES)}
              >
                Stories
              </Button>
            </ButtonGroup>
          </Form>
        </Col>
      </Row>

      {display === CLOUD && (
        <Cloud
          words={words.prefixes(props.cards).concat(words.words(props.cards))}
        />
      )}

      {display === CARDS && <Cards cards={props.cards} />}

      {display === JOURNAL && <Journal cards={props.cards} />}

      {display === STORIES && <Stories cards={props.cards} />}
    </div>
  );
}

export default Group;
