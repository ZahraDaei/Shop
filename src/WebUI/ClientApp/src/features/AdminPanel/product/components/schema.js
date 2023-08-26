import * as yup from "yup";

    const schema = yup.object().shape({
        name: yup
            .string()
            .required("این فیلد الزامی است!")
            .test("english", "فقط نام انگلیسی مجاز است", (value) => { return /^[a-zA-Z\s-]*$/.test(value); }),
        farsiName: yup.string().required("این فیلد الزامی است!")
            .test("farsi", "فقط نام فارسی مجاز است", (value) => { return /^[\u0600-\u06FF\s]+$/.test(value); }),
        brandName: yup.string().required("این فیلد الزامی است!")
            .test("farsi", "فقط نام فارسی مجاز است", (value) => { return /^[\u0600-\u06FF\s]+$/.test(value); }),
        description: yup.string().required("این فیلد الزامی است!")
            .test("farsi", "فقط حروف فارسی مجاز است", (value) => { return /^[\u0600-\u06FF\s]+$/.test(value); }),
        shortDescription: yup.string().required("این فیلد الزامی است!")
            .test("farsi", "فقط حروف فارسی مجاز است", (value) => { return /^[\u0600-\u06FF\s]+$/.test(value); }),
        price: yup.string().required("این فیلد الزامی است!")
            .test("price", "قیمت را به درستی وارد کنید!", (value) => { return /^[1-9]\d*$/.test(value); }),

        productSpecifications: yup.mixed()
            .test("lastLevelSelection", "انتخاب دسته بندی نهایی الزامی است", (value) => { return value.length !== 0 })
            .test("productSpecifications", "هر ویژگی بایستی دارای مقدار باشد!", (value) => {
                var specValidation = true;
                for (var i = 0; i < value.length; i++) {
                    var v = value[i];
                    var obj = Object.values(v).every(s => s !== null);
                    if (!obj) {
                        specValidation = false;
                        break;
                    }
                }
                return specValidation;
            })
        ,

        productCategory: yup.mixed().test("productCategory", "انتخاب دسته بندی الزامی است", (value) => { console.log("shosho", typeof(value)); return value?.length }),

        image: yup.mixed().test("fileNessesary", "بارگزاری تصویر الزامی است", (value) => { return value?.length })
            .test("fileSize", "حجم فایل بالاتر از حد مجاز است!", (value) => {
                if (value.length)
                    return value[0].size <= 100000
            }),
    }).required();

export default schema;