import React from "react";
import PropTypes from "prop-types";
import { Fragment, BreadCrumb, Container, Row, Col, Media } from "reactstrap";

function SingleBlogComponent(props) {
  const singleBlog = props.blog;

  return (
    <Fragment key={`${singleBlog.id}`}>
      <BreadCrumb parent="Home" subparent="Blog" title="Blog Single" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <div className="blog-single">
              <div className="blog-box blog-details">
                <Media
                  className="img-fluid w-100 main-blog-image"
                  src={singleBlog.imageUrl}
                  alt="blog-main"
                />
                <div className="blog-details">
                  <ul className="blog-social">
                    <li className="digits">25 July 2018</li>
                    <li>
                      <i className="icofont icofont-user"></i>Mark{" "}
                      <span>Jecno </span>
                    </li>
                    <li className="digits">
                      <i className="icofont icofont-thumbs-up"></i>02
                      <span>Hits</span>
                    </li>
                    <li className="digits">
                      <i className="icofont icofont-ui-chat"></i>598 Comments
                    </li>
                  </ul>
                  <h4>{singleBlog.title}</h4>
                  <div className="single-blog-content-top">
                    <p>{singleBlog.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

SingleBlogComponent.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
};

export default React.memo(SingleBlogComponent);
