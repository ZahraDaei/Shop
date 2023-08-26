import * as yup from "yup";

const schema = yup.object().shape({
    name: yup
        .string()
        .required("این فیلد الزامی است!")
        .test("english", "فقط نام انگلیسی مجاز است", (value) => { return /^[a-zA-Z\s-]*$/.test(value); }),
    farsiName: yup.string().required("این فیلد الزامی است!")
        .test("farsi", "فقط نام فارسی مجاز است", (value) => { return /^[\u0600-\u06FF\s]+$/.test(value); }),

    image: yup.mixed().test("fileNessesary", "بارگزاری تصویر الزامی است", (value) => { return value?.length })
        .test("fileSize", "حجم فایل بالاتر از حد مجاز است!", (value) => {
            if (value.length)
                return value[0].size <= 20000
        }),
    firstLevel: yup.boolean(),
    lastLevel: yup.boolean(),
    specifications: yup
        .mixed()
        .when("lastLevel", {
            is: true,
            then: yup.mixed()
                .test("valueNessesary", "تعریف ویژگی الزامی است", (value) => { return value?.length })
            // .test("farsiValue", "فقط حروف فارسی مجاز است!", (value) => { return /^[\u0600-\u06FF\s]+$/.test(value); })
        })



}).required();

export default schema;