import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import './popUp.css';

const CustomPopup = (props) => {
  const [show, setShow] = useState(false);
  const [popupClassName, setPopupClassName] = useState('popup');

  const closeHandler = () => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() => {
    setShow(props.show);

    if (props.customClass) {
      setPopupClassName(props.customClass);
    }
  }, [props.show]);
  
  return (
    <div
      style={{
        visibility: show ? "visible" : "hidden",
        opacity: show ? "1" : "0"
      }}
      className="overlay"
    >
      <div className={popupClassName}>
        <h2>{props.title}</h2>
        <span className="close" onClick={closeHandler}>
          &times;
        </span>
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
};

CustomPopup.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  customClass: PropTypes.string
};

export default CustomPopup;
