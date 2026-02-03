import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { POST_TASK_API_URL, GET_TASKS_API_URL, UPDATE_COMPLETED_TASK_API_URL, DELETE_TASK_API_URL } from "../../utils/apiUrls";
import { deleteRequest, getRequest, patchRequest, postRequest } from "../../utils/requests";

// 공통된 비동기 액션 생성 로직을 별도의 함수로 분리
const postItemFetchThunk = (actionType, apiURL) => {
    return createAsyncThunk(actionType, async (postData) => {
        const options = {
            body: JSON.stringify(postData),
        }

        return await postRequest(apiURL, options)
    })
}

const getItemFetchThunk = (actionType, apiURL) => {
    return createAsyncThunk(actionType, async (userId) => {
        const fullPath = `${apiURL}/${userId}`;
        return await getRequest(fullPath)
    })
}

const updateCompletedFetchThunk = (actionType, apiURL) => {
    return createAsyncThunk(actionType, async (options) => {
        // console.log(options)
        return await patchRequest(apiURL, options)
    })
}

const deleteItemFetchThunk = (actionType, apiURL) => {
    return createAsyncThunk(actionType, async (itemId) => {
        return await deleteRequest(apiURL, itemId)
    })
}

// Delete Item Data Fetch
export const fetchDeleteItem = deleteItemFetchThunk('fetchDeleteItem', DELETE_TASK_API_URL)

// Get Item Data Fetch
export const fetchGetItem = getItemFetchThunk('fetchGetItem', GET_TASKS_API_URL)

// Post Item Data Fetch
export const fetchPostItem = postItemFetchThunk('fetchPostItem', POST_TASK_API_URL)

// Patch Completed Data Fetch
export const fetchUpdateCompleted = updateCompletedFetchThunk('fetchUpdateCompleted', UPDATE_COMPLETED_TASK_API_URL)

const handleFulfilled = (stateKey) => (state, action) => {
    state[stateKey] = action.payload;
}
const handleRejected = (action) => {
    console.log('Error', action.payload)
}

const apisSlice = createSlice({
    name: 'api',
    initialState: {
        postItemData: null,
        getItemData: null,
        updateCompletedData: null,
        deleteItemData: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostItem.fulfilled, handleFulfilled('postItemData'))
            .addCase(fetchPostItem.rejected, handleRejected)
            .addCase(fetchGetItem.fulfilled, handleFulfilled('getItemData'))
            .addCase(fetchGetItem.rejected, handleRejected)
            .addCase(fetchUpdateCompleted.fulfilled, handleFulfilled('updateCompletedData'))
            .addCase(fetchUpdateCompleted.rejected, handleRejected)
            .addCase(fetchDeleteItem.fulfilled, handleFulfilled('deleteItemData'))
            .addCase(fetchDeleteItem.rejected, handleRejected)
    }
})

export default apisSlice.reducer