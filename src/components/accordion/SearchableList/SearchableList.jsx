import { useRef } from "react";
import { useState } from "react";

export default function SearchableList({ items, itemKeyFn, children }) {
  const lastChange = useRef();

  const [searchTerm, setSearchTerm] = useState("");

  const searchResults = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleChange(event) {
    // 현재 진행 중인 타이머가 있다면 비우고 새로 시작. 새 키보드 입력을 이용한 새 타이머가 대신 예약됨
    // 타이머가 만료되기 전에 입력을 계속한다면, 가장 최신의 갱신만 진행되도록
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }

    // 매 키보드 입력이 아닌 일정 시간 지난 후 입력값으로 검색
    lastChange.current = setTimeout(() => {
      lastChange.current = null;
      setSearchTerm(event.target.value);
    }, 500);
  }

  return (
    <div className="searchable-list">
      <input type="search" placeholder="Search" onChange={handleChange} />
      <ul>
        {searchResults.map((item) => (
          <li key={itemKeyFn(item)}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
}
