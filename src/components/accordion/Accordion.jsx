import { createContext, useState, useContext } from "react";

import AccordionItem from "./AccordionItem";

// Accordion과 모든 연관된 컴포넌트를 다룰 컨텍스트라서 여기에 생성
const AccordionContext = createContext();

// 사용자 정의 훅 추가 생성 : 컨텍스트 읽기를 쉽고 안전하게 하기 위함
export function useAccordionContext() {
  // 컨텍스트 읽고 저장
  const ctx = useContext(AccordionContext);

  // 보안 강화 : 잘못된 곳에서 훅을 사용하면 에러 전달
  if (!ctx) {
    throw new Error(
      "Accordion-related components must be wrapped by <Accordion>."
    );
  }

  return ctx;
}

export default function Accordion({ children, className }) {
  const [openItemId, setOpenItemId] = useState();

  function toggleItem(id) {
    setOpenItemId((prevId) => (prevId === id ? null : id));
  }

  const contextValue = {
    openItemId: openItemId,
    toggleItem,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <ul className={className}>{children}</ul>
    </AccordionContext.Provider>
  );
}

// [컴파운드 컴포넌트 그룹화]
// JS에서 함수는 곧 객체이므로 함수명(=객체명).속성명 으로 속성 추가
Accordion.Item = AccordionItem;
