import React from "react";

export const PageInputForm = () => {
  return (
    <div className="flex flex-row">
      <form className="flex flex-col">
        <label htmlFor="pageNum" className="text-sm">Enter Page Number:</label>
        <input
          type="number"
          placeholder="enter to save page"
          required
          min="0"
          name="pageNum"
          className="border-2 border-solid"
        />
      </form>
      <button type="button">Save</button>
    </div>
  );
};
