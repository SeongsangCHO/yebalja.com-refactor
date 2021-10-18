import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "./Faq.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { getFaqs } from "../utils/api";

function QnA({ list }) {
  return (
    <>
      <div className={styles.question}>
        <i
          className={"fa fa-check"}
          style={{ color: `black` }}
          aria-hidden="true"
        ></i>
        {list.q}
      </div>
      <div className={styles.answer}>{list.a}</div>
    </>
  );
}

function SubTab({ sub }) {
  return (
    <ListGroup.Item href={sub.href} className={styles.listitem}>
      · {sub.title} ·
    </ListGroup.Item>
  );
}

function ContentBox({ sub }) {
  return (
    <Tab.Pane eventKey={sub.href}>
      {sub.qna.map((v, idx) => (
        <QnA list={v} key={idx} />
      ))}
    </Tab.Pane>
  );
}

function FaqTab({ subList }) {
  return (
    <Tab.Container defaultActiveKey={subList[0].href}>
      <ListGroup horizontal className={styles.subTab}>
        {subList.map((v, idx) => (
          <SubTab sub={v} key={idx} />
        ))}
      </ListGroup>
      <Tab.Content className={styles.content}>
        {subList.map((v, idx) => (
          <ContentBox sub={v} key={idx} />
        ))}
      </Tab.Content>
    </Tab.Container>
  );
}

export default function Faq() {
  const program = useSelector((state) => state.programReducer.data);
  const [faqData, setFaqData] = useState([]);

  const fetchData = async () => {
    const res = await getFaqs();
    setFaqData(res);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>
      <Tabs
        defaultActiveKey={faqData[program]?.[0]?.eventKey}
        transition={false}
        className={classNames({
          "justify-content-center": true,
          [styles.mainTab]: true,
        })}
      >
        {faqData[program]?.map((v, idx) => (
          <Tab eventKey={v.eventKey} title={v.category} key={idx}>
            <FaqTab subList={v.subCategory} key={idx} />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
