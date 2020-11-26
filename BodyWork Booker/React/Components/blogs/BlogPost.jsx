//Work in progress -- gotta get the post button to call the service properly

// import React from "react";
// import CKEditor from "react-ckeditor-component";
// import debug from "sabio-debug";
// import * as uploadService from "../../services/fileUploadService";
// import { Formik, Form, ErrorMessage, Field } from "formik";
// import { blogPostSchema } from "./blogPostSchema";
// import * as blogService from "../../services/blogService/blogServices";

// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   CardHeader,
//   CardBody,
//   FormGroup,
//   Label,
// } from "reactstrap";

// const _logger = debug.extend("BlogPost");

// class BlogPost extends React.Component {
//   state = {
//     formData: {
//       blogTypeId: "",
//       authorId: 2,
//       title: "",
//       subject: "",
//       content: "",
//       isPublished: "",
//       imageUrl: "",
//       blogFile: "",
//     },
//     blogTypes: [],
//   };

//   componentDidMount() {
//     this.blogTypes();
//   }

//   blogTypes = () => {
//     blogService
//       .getBlogType()
//       .then(this.getBlogTypeSuccess)
//       .catch(this.getBlogTypeError);
//   };

//   getBlogTypeSuccess = (response) => {
//     _logger(response.item);
//     this.setState((prevState) => {
//       return {
//         ...prevState,
//         blogTypes: response.item.map(this.mapItem),
//       };
//     });
//   };

//   getBlogTypeError = (response) => {
//     _logger(response);
//   };

//   // onFormFieldChanged = (e) => {
//   //   let currentTarget = e.currentTarget;
//   //   let newValue = currentTarget.value;
//   //   let inputName = currentTarget.name;
//   //   this.setState(() => {
//   //     let formData = { ...this.state.formData };
//   //     formData[inputName] = newValue;
//   //     return { formData };
//   //   });
//   // };

//   onPost = (values, { setSubmitting }) => {
//     // _logger(values, setSubmitting);
//     blogService
//       .createBlog(values)
//       .then(this.onCreateBlogSuccess)
//       .catch(this.onCreateBlogError)
//       .finally(() => setSubmitting(false));
//   };

//   onCreateBlogSuccess = (response) => {
//     _logger(response);
//     this.setState((prevState) => {
//       let currentBlog = { ...this.state };
//       return {
//         ...prevState,
//         currentBlog,
//       };
//     });
//   };

//   onCreateBlogError = (response) => {
//     _logger("response: ", response);
//   };

//   onCreateBlogError = (response) => {
//     _logger(response);
//   };

//   mapItem = (item) => (
//     <option key={item.id} value={item.id}>
//       {item.name}
//     </option>
//   );

//   handleUpload = (e, setFieldValue) => {
//     let currentUploadName = e.target.files[0];
//     _logger(currentUploadName);
//     let formData = { ...this.state.formData };

//     uploadService
//       .fileUpload(currentUploadName)
//       .then((response) => this.onUploadSuccess(response, setFieldValue))
//       .catch(this.onUploadError);

//     // _logger(formData.blogFile);

//     this.setState((prevState) => {
//       formData.blogFile = currentUploadName;
//       return {
//         ...prevState,
//         formData,
//       };
//     });
//   };

//   onUploadSuccess = (response, setFieldValue) => {
//     _logger("Main Response: ", response);
//     _logger("Url Response: ", response.item.url);

//     setFieldValue("imageUrl", response.item.url);
//   };

//   onUploadError = (errResponse) => {
//     _logger(errResponse);
//   };

//   render() {
//     return (
//       <React.Fragment>
//         <Container>
//           <Row>
//             <Col sm="12">
//               <Card>
//                 <CardHeader>
//                   <h5>Post Edit</h5>
//                 </CardHeader>
//                 <CardBody className="add-post">
//                   <Formik
//                     initialValues={{
//                       blogTypeId: "",
//                       authorId: 2,
//                       title: "",
//                       subject: "",
//                       content: "",
//                       isPublished: true,
//                       imageUrl: "",
//                     }}
//                     validationSchema={blogPostSchema}
//                     onSubmit={this.onPost}
//                     enableReinitialize={true}
//                   >
//                     {({
//                       // isSubmitting,
//                       // isValid,
//                       // isDirty,
//                       setFieldValue,
//                       values,
//                     }) => (
//                       <Form className="row needs-validation">
//                         <Col sm="12">
//                           <FormGroup>
//                             <Label htmlFor="title">Title:</Label>
//                             <ErrorMessage
//                               name="title"
//                               component="span"
//                               className="text-danger float-right"
//                             ></ErrorMessage>
//                             <Field
//                               className="form-control"
//                               name="title"
//                               type="text"
//                               id="title"
//                               placeholder="Blog Title"
//                             />
//                           </FormGroup>
//                           <FormGroup>
//                             <Label htmlFor="subject">Subject:</Label>
//                             <ErrorMessage
//                               name="subject"
//                               component="span"
//                               className="text-danger float-right"
//                             ></ErrorMessage>
//                             <Field
//                               className="form-control"
//                               name="subject"
//                               type="text"
//                               placeholder="Subject"
//                             />
//                           </FormGroup>
//                           <FormGroup>
//                             <Label htmlFor="blogTypeId">Category:</Label>
//                             <ErrorMessage
//                               name="blogTypeId"
//                               component="span"
//                               className="text-danger float-right"
//                             ></ErrorMessage>
//                             <Field
//                               component="select"
//                               className="form-control"
//                               name="blogTypeId"
//                             >
//                               <option key="0-option" value="">
//                                 Select Blog Type
//                               </option>
//                               {this.state.blogTypes}
//                             </Field>
//                           </FormGroup>
//                           <FormGroup>
//                             <Label>Content: </Label>
//                             <ErrorMessage
//                               name="content"
//                               component="span"
//                               className="text-danger float-right"
//                             ></ErrorMessage>
//                             <CKEditor
//                               content={values.content}
//                               events={{
//                                 change: (event) =>
//                                   setFieldValue(
//                                     "content",
//                                     event.editor.getData()
//                                   ),
//                               }}
//                             />
//                           </FormGroup>
//                           <div className="upload-container">
//                             {values.imageUrl && (
//                               <img src={values.imageUrl} alt={"test"} />
//                             )}

//                             <input
//                               onChange={(e) =>
//                                 this.handleUpload(e, setFieldValue)
//                               }
//                               className="file-input-btn"
//                               type="file"
//                             />
//                           </div>
//                           <div className="btn-showcase">
//                             <button
//                               className="btn btn-primary"
//                               type="submit"
//                               // disabled={!(isValid && isDirty) || isSubmitting}
//                               onClick={this.onCreateBlog}
//                             >
//                               Post
//                             </button>
//                           </div>
//                         </Col>
//                       </Form>
//                     )}
//                   </Formik>
//                   {/* <div className="w-100 m-0 dz-message needsclick">
//                     <Dropzone
//                       // getUploadParams={this.getUploadParams}
//                       onChangeStatus={this.uploadImage}
//                       accept="image/*"
//                       inputContent="Drop files here or click to upload."
//                     />
//                   </div> */}
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </React.Fragment>
//     );
//   }
// }
// export default BlogPost;
