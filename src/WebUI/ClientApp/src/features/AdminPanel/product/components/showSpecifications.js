import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form"



const showSpecifications = (methods,specifications) => {
    return (
        <Controller
            name={"productSpecifications"}
            control={methods.control}
            render={({ field: { onChange, value } }) => {

                const specChangeHandeling = (e) => {
                    if (value.length != 0) {

                        for (var i = 0; i < value.length; i++) {
                            if (value[i].id == e.target.name) {
                                value[i].value = e.target.value;
                                return;
                            }
                        }
                        value[value.length] = {
                            id: e.target.name,
                            value: e.target.value
                        }
                    } else {
                        value[0] = {
                            id: e.target.name,
                            value: e.target.value
                        }
                    }
                }
                return (
                    specifications.map((s, i) =>
                        <div style={{ display: "flex", flexDirection: "row" }} key={i} >

                            <p style={{ width: "200px", textAlign: "left" }}> {s.specificationKey} :</p>
                            <p style={{ width: "300px", textAlign: "right" }}>
                                <input onChange={specChangeHandeling} name={s.id} style={{ border: "1px solid rgba(128, 128, 128, 0.21)", borderRadius: "5px", width: "100%" }} />
                            </p>
                        </div>
                    )
                )
            }
            } />
    )
}


export default showSpecifications;