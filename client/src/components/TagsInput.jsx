import React from "react";

const TagsInput = ({ tags, setTags }) => {
  const handleKeyDown = (e) => {
    // If user did not press enter key, return
    if (e.key !== "Enter") return;
    // Get the value of the input
    const value = e.target.value;
    // If the value is empty, return (不可以是空字串)
    if (!value.trim()) return;
    // Add the value to the tags array
    if (tags.length >= 3) return;
    setTags([...tags, value]);
    // Clear the input
    e.target.value = "";
  };

  const removeTag = (index) => {
    setTags(tags.filter((el, i) => i !== index));
  };

  const handleSetTags = (e, index) => {
    const { value } = e.target;
    const list = [...tags];
    list[index] = value;
    setTags(list);
  };

  return (
    <div className="tags">
      {tags.map((tag, i) => {
        return (
          <div className="tags__item" key={i}>
            <input
              className="tags__tag"
              name={`tags.${i}`}
              value={tag}
              onChange={(e) => {
                handleSetTags(e, i);
              }}
            />
            <span className="close" onClick={() => removeTag(i)}>
              &times;
            </span>
          </div>
        );
      })}
      <input
        type="text"
        className="tags__input"
        placeholder="Add your tags, max : 3 tags"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default TagsInput;
