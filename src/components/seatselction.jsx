import React, { useState } from "react";
import "../css/SeatSelection.css";

const SeatSelectionPage = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSeatSelection = (row, seat) => {
    const seatKey = `${row}-${seat}`;
    const isSelected = selectedSeats.includes(seatKey);

    if (isSelected) {
      const updatedSeats = selectedSeats.filter((seat) => seat !== seatKey);
      setSelectedSeats(updatedSeats);
    } else {
      const updatedSeats = [...selectedSeats, seatKey];
      setSelectedSeats(updatedSeats);
    }

    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedSeats([]);
    setIsModalOpen(false);
  };

  const handleConfirmBooking = () => {
    console.log("Selected Seats:", selectedSeats);
    // 예매 확인 처리 함수?
    // 선택된 좌석 전송
  };

  const renderSeatMap = () => {
    const seatMap = [
      { row: 1, seats: 13 },
      { row: 2, seats: 15 },
      { row: 3, seats: 15 },
      { row: 4, seats: 16 },
    ];
    return seatMap.map(({ row, seats }) => {
      const rowSeats = [];

      for (let seat = 1; seat <= seats; seat++) {
        const seatKey = `${row}-${seat}`;
        const isSelected = selectedSeats.includes(seatKey);

        let blank = 0;
        if (seat % 3 === 0) {
          blank = 10;
        }

        rowSeats.push(
          <div
            key={seatKey}
            className={`seat ml-4 ${isSelected ? "selected" : ""}`}
            style={{ marginLeft: blank }}
            onClick={() => handleSeatSelection(row, seat)}></div>
        );
      }

      return (
        <div key={`row-${row}`} className="row">
          {rowSeats}
        </div>
      );
    });
  };

  return (
    <div className="iphone13">
      <div className="header">
        <h1>테이블석</h1>
      </div>
      <div className="seat-map ">{renderSeatMap()}</div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="selected-seats">
              <p>선택한 좌석: {selectedSeats.join(", ")}</p>
            </div>
            <div className="modal-buttons">
              <button onClick={handleConfirmBooking}>예매하기</button>
              <button onClick={handleModalClose}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatSelectionPage;
