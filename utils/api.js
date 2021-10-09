import axios from "axios";
const BASE_URL = `http://localhost:8080`;
const END_POINT = {
  yearlycalendar: "/api/yearlycalendar",
  timelinelist: "/api/timelinelist",
  timelineheader: "/api/timelineheader",
  programtable: "/api/programtable",
  reviews: "/api/reviews",
  faqs: "/api/faqs",
};

const requestGet = async (url) => {
  return axios.get(url);
};

export const getFaqs = async () => {
  const res = await requestGet(BASE_URL + END_POINT.faqs);
  return res.data;
};

export const getReviews = async () => {
  const res = await requestGet(BASE_URL + END_POINT.reviews);
  return res.data;
};

export const getProgramTable = async () => {
  const res = await requestGet(BASE_URL + END_POINT.programtable);
  return res.data;
};

export const getYearlyCalendar = async () => {
  const res = await requestGet(BASE_URL + END_POINT.yearlycalendar);
  return res.data;
};

export const getTimelineListData = async () => {
  const res = await requestGet(BASE_URL + END_POINT.timelinelist);
  return res.data;
};

export const getTimeLineHeader = async () => {
  const res = await requestGet(BASE_URL + END_POINT.timelineheader);
  return res.data;
};
