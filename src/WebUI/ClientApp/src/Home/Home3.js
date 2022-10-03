import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import { useForm, Controller } from "react-hook-form";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

export default function Example() {
    const { control, handleSubmit,register } = useForm();
    const [submittedDate, setSubmittedDate] = useState();

    const onSubmit = ( date ) => {
        console.log("dataaa",date)
        setSubmittedDate(date.date);
    };


    return (
        <>
          
            <form onSubmit={handleSubmit(onSubmit, e => console.log("error", e))}>
                <input {...register("lastName", { required: true })}/>
                <Controller
                    control={control}
                    name="date"
                    render={({
                        field: { onChange, name, value },
                        fieldState: { invalid, isDirty }, //optional
                        formState: { errors }, //optional, but necessary if you want to show an error message
                    }) => (
                        <>
                            <DatePicker
                                
                                onChange={(date) => {
                                    
                                    onChange( date.toString() );
                                }}
                                calendar={persian}
                                locale={persian_fa}
                                format="MM/DD/YYYY"
                            />
                            {errors && errors[name] && errors[name].type === "required" && (
                                //if you want to show an error message
                                <span>your error message !</span>
                            )}
                        </>
                    )}
                />
                <input type="submit" />
            </form>
            <p>Submitted Date:  {submittedDate}</p>
        </>
    )
}