import React from "react";
import PropTypes from "prop-types";
import { Card, Media, Col } from "reactstrap";

function BlogComponentThree(props) {
  const allBlogs = props.blog;

  const getBlogId = function () {
    props.onClick(allBlogs);
  };

  return (
    <Col lg="3">
      <Card
        className="card-no-shadow"
        onClick={getBlogId}
        key={`Top-Blog-${allBlogs.id}`}
      >
        <div className="blog-box blog-grid text-center">
          <Media
            className="img-fluid top-radius-blog"
            src={allBlogs.imageUrl}
            alt=""
          />
          <div className="blog-details-main">
            {/* <ul className="blog-social">
                            <li className="digits">9 April 2019</li>
                            <li className="digits">by: Admin</li>
                            <li className="digits">0 Hits</li>
                        </ul> */}
            <hr />
            <h6 className="blog-bottom-details">{allBlogs.title}</h6>
          </div>
        </div>
      </Card>
    </Col>
  );
}

BlogComponentThree.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};

export default React.memo(BlogComponentThree);
