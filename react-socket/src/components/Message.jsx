import React from 'react';

const Message = ({ text }) => {
  return (
    <div className={`message user`}>
      <p>{text}</p>
    </div>
  );
};

export default Message;
