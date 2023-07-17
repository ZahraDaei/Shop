`import { createSlice } from '@reduxjs/toolkit'
export const ${name}Slice = createSlice({
    name: '${name}',
    initialState: {
        ${name}List: [],
        selected${name}: {},
        loading: true,
        loading${name} :true,
        loading${name} :true

    },
    reducers: {
        get${name}ById: (state, action) => {
            state.selected${name} = state.${name}List?.filter(p => p.id === +action.payload)[0];
            state.loading${name} = false;
        },
        get${name}s: (state, action) => {
            state.${name}List = action.payload
            state.loading${name}s = false;
        }       
    }
})

export const { get${name}ById, get${name}s } = ${name}Slice.actions

export default ${name}Slice.reducer



export const select${name}s = state => state.${name}s.${name}List;
export const select${name}ById = state => state.${name}s.selected${name};

export const selectLoading = state => state.${name}s.loading;
export const selectLoading${name} = state => state.${name}s.loading${name};
`