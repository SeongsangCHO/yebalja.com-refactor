import React, { useEffect } from "react";
import styles from "./NavBar.module.css";
import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import classNames from "classnames";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/router";

function NavItem({ data }) {
  const router = useRouter();

  return (
    <>
      <Link href={data.href}>
        <a
          className={classNames({
            ["nav-link"]: true,
            [router.pathname == [data.href] ? "active" : ""]: true,
          })}
        >
          {data.program}
        </a>
      </Link>
    </>
  );
}

function RollingItem({ data }) {
  /* 남은 날짜, 시간에 따라 D-Day 표현방식(status) 결정 */
  let status;
  let target = new Date(data.enddate);
  let today = new Date();

  if (today > target) {
    status = "마감";
  } else if (target.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
    status = "D-Day";
  } else {
    status = `D-${(target - today) / (60 * 60 * 24 * 1000)}`;
  }

  return (
    <>
      <li>
        <a target="_blank" rel="noopener noreferrer" href={data.href}>
          <span className={styles.date}>{status}</span>
          <span className={styles.notice}>{data.title}</span>
        </a>
      </li>
    </>
  );
}

function ListItem({ data, idx }) {
  return (
    <>
      <li className={styles.noticePopoverItem}>
        <a target="_blank" rel="noopener noreferrer" href={data.href}>
          <span>· {data.title}</span>
        </a>
      </li>
    </>
  );
}

export default function NavBar() {
  useEffect(() => {}, []);

  const navList = [
    {
      program: "42서울",
      href: "/ftseoul",
    },
    {
      program: "SSAFY",
      href: "/ssafy",
    },
    {
      program: "부스트캠프",
      href: "/boostcamp",
    },
    {
      program: "SOMA",
      href: "/soma",
    },
    {
      program: "우아한테크코스",
      href: "/woowa",
    },
    {
      program: "멋쟁이사자처럼",
      href: "/likelion",
    },
  ];
  const noticeList = [
    {
      title: "DREAMIN iOS Academy 교육생 모집",
      href: "https://dreamin.career/academy/ios",
      date: "D-3",
    },
    {
      title: "광주AI사관학교",
      href: "http://ai.gitct.kr/apply/",
      date: "마감",
    },
    {
      title: "예발자닷컴 오픈",
      href: "https://yebalja.com",
      date: "D-9",
    },
  ];
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        className={styles.navbarBg}
      >
        <Navbar.Brand></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {navList?.map((v) => (
              <NavItem data={v} key={v.program} />
            ))}
          </Nav>

          <Form inline className={styles.noticeRolling}>
            <ul>
              {noticeList?.map((v) => (
                <RollingItem data={v} key={v.title} />
              ))}
            </ul>
          </Form>

          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={
              <Popover
                id={`popover-positioned-bottom`}
                className={styles.noticePopover}
              >
                <Popover.Title className={styles.noticePopoverTitle}>
                  실시간 모집공고
                </Popover.Title>
                <Popover.Content className={styles.noticePopoverList}>
                  <ul id="noticePopoverList">
                    {noticeList?.map((v, idx) => (
                      <ListItem data={v} key={v.title} id={idx} />
                    ))}
                  </ul>
                </Popover.Content>
              </Popover>
            }
          >
            <Button variant="link" className={styles.buttonPopover}>
              <img
                src={require("../src/image/Expand.png")}
                width="24"
                height="24"
              />
            </Button>
          </OverlayTrigger>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
