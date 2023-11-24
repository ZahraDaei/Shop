import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import { useForm, Controller } from "react-hook-form";

export default function Example() {
    const { control, handleSubmit } = useForm();
    const [submittedDate, setSubmittedDate] = useState();

    const onSubmit = ({ date }) => {
        setSubmittedDate(date);

    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, e => console.log("error",e))}>
                <Controller
                    control={control}
                    name="date"
                    rules={{ required: true }} //optional
                    render={({
                        field: { onChange, name, value },
                        fieldState: { invalid, isDirty }, //optional
                        formState: { errors }, //optional, but necessary if you want to show an error message
                    }) => (
                        <>
                            <input
                                value={value}
                                onChange={(date) => {
                                    onChange(date);
                                }}
                        
                            />
                            {errors && errors[name] && errors[name].type === "required" && (
                                //if you want to show an error message
                                <span>{errors[name].message}</span>
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