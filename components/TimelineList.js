import TimelineListItem from "./TimelineListItem";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimelineListData } from "../utils/api";

export default function TimelineList({ program }) {
  const [timeLineListData, setTimeLineListData] = useState([]);
  const fetchData = async () => {
    const res = await getTimelineListData();
    setTimeLineListData(res);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {timeLineListData[program]?.map((v, index, id) => (
        <TimelineListItem data={v} key={index} id={index} />
      ))}
    </>
  );
}
