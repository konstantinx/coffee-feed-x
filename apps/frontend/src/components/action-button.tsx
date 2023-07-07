import React from 'react';

export interface ButtonProps {
  isDisabled: boolean;
  onClick: () => void;
  text: string;
}

const ActionButton: React.FC<ButtonProps> = ({ isDisabled, onClick, text }) => (
  <div className="feed__button-container">
    <button disabled={isDisabled} onClick={onClick} className="feed__button">
      {text}
    </button>
  </div>
);

export default ActionButton;
