import React, { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { IoSearchCircle } from "react-icons/io5";
import { MdOutlineAddCard, MdCreditCard } from "react-icons/md";
import { CgCloseR } from "react-icons/cg";

const Header = ({ account, setAccount }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCardConnected, setIsCardConnected] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const connectAccount = async () => {
    if (isCardConnected) {
      setIsCardConnected(false);
      setConnectedAccount(null);
    } else {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setIsCardConnected(true);
        setConnectedAccount(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const toggleCardConnection = () => {
    connectAccount();
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-menu ">
        <FiMenu className="header-icon" size={28} strokeWidth={2} />
      </div>
      <div className="header-content">
        {!isSearchOpen ? (
          <IoSearchCircle
            className="header-icon"
            size={34}
            onClick={toggleSearch}
          />
        ) : (
          <div className="search-container">
            <input type="text" placeholder="검색" />
            <div className="close-icon-container">
              <CgCloseR
                className="close-icon"
                size={15}
                onClick={toggleSearch}
              />
            </div>
          </div>
        )}
        {isCardConnected ? (
          <div className="connected-account">
            <MdCreditCard
              className="header-icon card-icon"
              size={30}
              color="#007aff"
              onClick={toggleCardConnection}
              style={{ marginTop: "2px" }}
            />
            <span
              className="account-digits"
              style={{
                fontSize: "10px",
                color: "#007aff",
                display: "block",
                marginTop: "-6px",
                marginLeft: "16px",
              }}>
              {connectedAccount.slice(-4)}
            </span>
          </div>
        ) : (
          <MdOutlineAddCard
            className="header-icon card-icon"
            size={30}
            onClick={toggleCardConnection}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
