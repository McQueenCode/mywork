import * as Yup from 'yup';

const blogPostSchema = Yup.object({
        blogTypeId: Yup
        .number()
        .required(),
        authorId: Yup
        .number()
        .required(),
        title: Yup
        .string()
        .required(),
        subject: Yup
        .string()
        .required(),
        content: Yup
        .string()
        .required(),
        isPublished: Yup
        .boolean()
        .required(),
        imageUrl: Yup
        .string()
    });

export {blogPostSchema};