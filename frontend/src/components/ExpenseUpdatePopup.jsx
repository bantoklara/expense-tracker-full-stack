import React, { Children } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import ExpenseCreateForm from "./ExpenseCreateForm";

const ExpenseUpdatePopup = (props) => {

    const {
        open,
        handleOpen,
        expense,
        setExpense,
        sendRequest,
        updateUI
    } = props;

    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Edit payment</DialogHeader>
                <DialogBody>
                    <ExpenseCreateForm
                        expense={expense}
                        setExpense={setExpense}
                        mode={2}
                        sendRequest={sendRequest}
                        updateUI={updateUI}
                        handleOpen={handleOpen}
                    />
                </DialogBody>
            </Dialog>
        </>
    );
}

export default ExpenseUpdatePopup;