import React from "react";
import PropTypes from "prop-types";
import { Col, Card, Media } from "reactstrap";

function BlogComponentTwo(props) {
  // topBlog is to map through the top two smaller blog entries next to the main featured blog entry
  const topBlog = props.blog;

  const getBlogId = function () {
    props.onClick(topBlog);
  };
  return (
    <Card className="card-no-shadow" key={`Top-Blog-${topBlog.id}`}>
      <div onClick={getBlogId} className="blog-box blog-list row">
        <Col sm="5">
          <Media className="img-fluid sm-100-w" src={topBlog.imageUrl} alt="" />
        </Col>
        <Col sm="7">
          <div className="blog-details">
            {/* <div className="blog-date digits"><span>02</span>{topSideBlogs.datePublish}</div> */}
            <h6>{topBlog.title}</h6>
            <div className="blog-bottom-content">
              {/* <ul className="blog-social">
                                    <li>by: Admin</li>
                                    <li className="digits">0 Hits</li>
                                </ul> */}
              <p className="mt-0">{topBlog.content}</p>
            </div>
          </div>
        </Col>
      </div>
    </Card>
  );
}

BlogComponentTwo.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    // imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};

export default React.memo(BlogComponentTwo);
