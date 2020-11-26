import React from "react";
import PropTypes from "prop-types";
import { Card, Media } from "reactstrap";

function BlogComponentOne(props) {
  const oneBlog = props.blog;

  const getBlogId = function () {
    props.onClick(oneBlog);
  };

  return (
    <Card className="card-no-shadow" key={`Top-Blog-${oneBlog.id}`}>
      <div
        onClick={getBlogId}
        data-blog-id={oneBlog.id}
        className="blog-box blog-shadow"
      >
        <Media className="img-fluid" src={oneBlog.imageUrl} alt="" />
        <div className="blog-details">
          {/* <p className="digits">{oneBlog.dateCreated}</p> */}
          <h4>{oneBlog.title}</h4>
          {/* <ul className="blog-social">
                            <li className="digits"><i className="icofont icofont-thumbs-up"></i>02 Hits</li>
                            <li className="digits"><i className="icofont icofont-ui-chat"></i>598 Comments</li>
                        </ul> */}
        </div>
      </div>
    </Card>
  );
}

BlogComponentOne.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};

export default React.memo(BlogComponentOne);
