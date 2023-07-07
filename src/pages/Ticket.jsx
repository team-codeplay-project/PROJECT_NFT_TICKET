import React, { useState } from "react";
import "../style/booking.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from "react-dropdown-select";
import { BiBaseball } from "react-icons/bi";
import { TbCalendarTime } from "react-icons/tb";
import { LuArmchair } from "react-icons/lu";

const CustomDatePicker = React.forwardRef(({ value, onClick }, ref) => (
  <div className="custom-datepicker" onClick={onClick} ref={ref}>
    <span className="datepicker-value">{value || "Select a date"}</span>
  </div>
));

const TicketBooking = () => {
  const tickets = ["Ticket 1", "Ticket 2", "Ticket 3"];
  const seatSections = [
    {
      value: "일반좌석",
      label: "일반좌석",
      options: [
        { value: "켈리존 (VIP석)", label: "켈리존 (VIP석)" },
        { value: "1루 테이블석", label: "1루 테이블석" },
        { value: "1루 익사이팅존", label: "1루 익사이팅존" },
        { value: "1루 블루석", label: "1루 블루석" },
        { value: "1루 FILA 존", label: "1루 FILA 존" },
        { value: "1루 레드석", label: "1루 레드석" },
        { value: "1루 네이비석", label: "1루 네이비석" },
        { value: "1루 와야지정석", label: "1루 와야지정석" },
      ],
    },
    {
      value: "휠체어석",
      label: "휠체어석",
      options: [
        { value: "중앙 네이비석", label: "중앙 네이비석" },
        {
          value: "1루 레드 휠체어석 (동반 가능)",
          label: "1루 레드 휠체어석 (동반 가능)",
        },
        {
          value: "1루 레드 휠체어석 (동반 불가)",
          label: "1루 레드 휠체어석 (동반 불가)",
        },
        { value: "3루 블루 휠체어석", label: "3루 블루 휠체어석" },
        {
          value: "3루 레드 휠체어석 (동반 가능)",
          label: "3루 레드 휠체어석 (동반 가능)",
        },
        {
          value: "3루 레드 휠체어석 (동반 불가)",
          label: "3루 레드 휠체어석 (동반 불가)",
        },
      ],
    },
    {
      value: "시야방해석",
      label: "시야방해석",
      options: [
        { value: "1루 블루석_시야방해", label: "1루 블루석_시야방해" },
        { value: "1루 FILA 존_시야방해", label: "1루 FILA 존_시야방해" },
        { value: "1루 레드석_시야방해", label: "1루 레드석_시야방해" },
        { value: "1루 네이비석_시야방해", label: "1루 네이비석_시야방해" },
        { value: "1루 와야지정석_시야방해", label: "1루 와야지정석_시야방해" },
        { value: "3루 블루석_시야방해", label: "3루 블루석_시야방해" },
        { value: "3루 오렌지석_시야방해", label: "3루 오렌지석_시야방해" },
        { value: "3루 레드석_시야방해", label: "3루 레드석_시야방해" },
        { value: "3루 네이비석_시야방해", label: "3루 네이비석_시야방해" },
        { value: "3루 와야지정석_시야방해", label: "3루 와야지정석_시야방해" },
      ],
    },
  ];

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const handleBooking = () => {
    if (selectedTicket && selectedDate && selectedSeat) {
      console.log("Booking Confirmed!");
    } else {
      console.log("Please select all options!");
    }
  };

  return (
    <div className="ticket-booking">
      <div className="tab-container">
        <button
          className={`tab ${activeTab === 1 ? "active" : ""}`}
          onClick={() => handleTabClick(1)}
          role="tab">
          래플
        </button>
      </div>

      {activeTab === 1 && (
        <>
          <div className="section-row">
            <div className="section">
              <h2 className="section-title">
                <BiBaseball className="section-icon" />
                Tickets
              </h2>
              <div className="ticket-list">
                {tickets.map((ticket) => (
                  <div
                    key={ticket}
                    className={`ticket-item ${
                      selectedTicket === ticket ? "selected" : ""
                    }`}
                    onClick={() => setSelectedTicket(ticket)}>
                    <p>{ticket}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="section">
              <h2 className="section-title">
                <TbCalendarTime className="section-icon" />
                Dates
              </h2>
              <div className="date-picker">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  customInput={<CustomDatePicker />}
                  dateFormat="yyyy/MM/dd"
                  className="custom-datepicker"
                />
              </div>
            </div>
          </div>

          <div className="section">
            <h2 className="section-title">
              <LuArmchair className="section-icon" />
              Seats
            </h2>
            <div className="seat-select">
              <Dropdown
                options={seatSections}
                value={selectedSeat}
                onChange={(option) => setSelectedSeat(option[0].value)}
                placeholder="Select a seat"
                className="dropdown-select"
                menuPlacement="auto"
              />
            </div>
          </div>

          <button className="book-button" onClick={handleBooking}>
            Book Now
          </button>
        </>
      )}
    </div>
  );
};

export default TicketBooking;
