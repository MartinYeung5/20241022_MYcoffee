import React, { useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

import { TxButton } from './substrate-lib/components';

const BuyModal = ({ coffee, setStatus }) => {

    // State for controlling the modal open/close state and form value
    const [open, setOpen] = useState(false);

    // Event handler for confirming and closing the modal
    const confirmAndClose = () => {
        setOpen(false);
    };
    
    // Event handler for opening the modal
    const handleOpen = () => {
        setOpen(true);
    };
    
    // Event handler for closing the modal
    const handleClose = () => {
        setOpen(false);
    };
    
    // Event handler for cancel button click
    const handleCancel = () => {
        handleClose();
    };

    return (
        <>
        {/* Modal component */}
        <Modal onClose={handleClose} onOpen={handleOpen} open={open} 
        trigger={<Button basic color='blue'>Buy Coffee Card</Button>}>
            
            {/* Modal header */}
            <Modal.Header>Buy Coffee Card</Modal.Header>
            <Modal.Content><Form>

                {/* Form inputs */}
                <Form.Input 
                    fluid 
                    label='Coffee ID' 
                    readOnly 
                    value={coffee.id}
                />
                <Form.Input 
                    fluid 
                    label='New Price' 
                    readOnly 
                    value={coffee.price}
                />

            </Form></Modal.Content>
  
            <Modal.Actions>

                {/* Cancel button */}
                <Button basic color='grey' onClick={handleCancel}>
                    Cancel
                </Button>

                {/* Transaction button */}
                <TxButton
                    label='Buy coffee'
                    type='SIGNED-TX'
                    setStatus={setStatus}
                    txOnClickHandler={confirmAndClose}
                    attrs={{
                        palletRpc: 'coffeesModule',
                        callable: 'buyCoffee',
                        inputParams: [coffee.id, coffee.price],
                        paramFields: [true, true]
                    }}
                />
            </Modal.Actions>
        </Modal>
        </>
    );
  };

export default BuyModal;