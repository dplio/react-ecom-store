import React from "react";
import { withRouter } from "react-router-dom";
import CollectionItem from "../collection-item/collection-item.component";
import "./collection-preview.styles.scss";

const CollectionPreview = ({ match, history, routeName, title, items }) => {
  return (
    <div className="collection-preview">
      <div
        onClick={() => history.push(`${match.path}/${routeName}`)}
        className="title"
      >
        {title.toUpperCase()}
      </div>
      <div className="preview">
        {items
          .filter((item, idx) => idx < 4)
          .map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default withRouter(CollectionPreview);
