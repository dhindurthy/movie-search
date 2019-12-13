import React from "react";

function DataList(props) {
  return (
    <datalist id={props.id}>
      {props.articles &&
        props.articles.map((article, index) => (
          <option key={index} value={article.Title}>
            {article.Type} - {article.Year}
          </option>
        ))}
    </datalist>
  );
}
export default DataList;
//onClick={props.clickList}
