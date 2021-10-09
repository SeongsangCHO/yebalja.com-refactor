import styles from "./Timeline.module.css";
import Header from "./Header";
import TimelineList from "./TimelineList";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTimeLineHeader } from "../utils/api";

const Timeline = () => {
  const program = useSelector((state) => state.programReducer.data);
  const [timeLineHeaderData, setTimeLineHeaderData] = useState([]);
  const fetchData = async () => {
    const res = await getTimeLineHeader();
    setTimeLineHeaderData(res);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.body}>
      <Header className={styles.header}>
        <h1>{timeLineHeaderData[program]?.[0].heading}</h1>
        <p>{timeLineHeaderData[program]?.[0].subheading}</p>
      </Header>
      <div className={styles.line}></div>
      <div className={styles.timeline}>
        <ol className={styles.order}>
          <TimelineList program={program} />
        </ol>
      </div>
    </div>
  );
};

export default Timeline;
