import React from "react";

const TagsInput = () => {
  return (
    <div className="tags">
      <div className="tags__item">
        {/* One hardcoded tag for test */}
        <span className="text">hello</span>
        <span className="close">&times;</span>
      </div>
      <input
        type="text"
        className="tags__input"
        placeholder="Type something..."
      />
    </div>
  );
};

export default TagsInput;
