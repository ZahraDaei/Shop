import React, { useState,useRef } from "react";
import { Button } from 'react-bootstrap';
import { useFieldArray, useFormContext } from "react-hook-form";

export default function Specification() {

    //const { register, control, handleSubmit, reset, trigger, setError } = useForm({
    //    defaultValues: { specifications: [] }
    //    //resolver:
    //});
    const inputEl = useRef(null);

    const { register, control, formState: { errors } } = useFormContext(); // retrieve all hook methods
    const [specKeyValue, setSpecKeyValue] = useState();

    const changeHandler = (e) => {
        var value = e.target.value;
        setSpecKeyValue(value);
    }

    const appendNewItem = () => {
        if (/^[\u0600-\u06FF\s]+$/.test(specKeyValue)) {
            append({ specificationKey: specKeyValue });
            setSpecKeyValue("");
            // `current` points to the mounted text input element
            inputEl.current.focus();
        }
        return;
    }
    const { fields, append, remove } = useFieldArray({
        control,
        name: "specifications"
    });
    return (
        <>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <label>ویژگی (به فارسی):</label>

                <input value={specKeyValue} ref={inputEl} className="inputStyle" onChange={changeHandler} />
                <Button
                    variant="success"
                    onClick={appendNewItem}
                >
                    اضافه
            </Button>
            </div>
            <div className="inputErrorStyle">  {errors?.specifications?.message}</div>
            <div style={{ maxHeight: "120px", overflow:"auto" }}>
                <ul>
                    {fields.map((item, index) => (
                        <li key={item.id}>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <input style={{ border: "none", backgroundColor: "transparent" }} disabled  {...register(`specifications.${index}.specificationKey`)} />

                                <div className="deleteDiv" onClick={() => remove(index)}>حذف</div>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
