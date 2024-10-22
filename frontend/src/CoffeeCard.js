import React from 'react';
import { Card, Label } from 'semantic-ui-react';

import { useSubstrateState } from './substrate-lib';

import CoffeeCardComponents from './CoffeeCardComponents';
//import TransferModal from './TransferModal';
//import SetPriceModal from './SetPriceModal';
//import BuyModal from './BuyModal';
//import BreedModal from './BreedModal';

// Function to get the account address
const getAccountAddress = account => (account ? account.address : '')

// Component representing a single Coffee Card
const CoffeeCard = ({ coffee, currentAccount, setStatus }) => {

    const { keyring } = useSubstrateState()

    const { id, dna, owner, price } = coffee;
    const displayDna = dna && dna.toJSON();
    const isOwner = getAccountAddress(currentAccount) === owner;
    const isPrice = price !== null;
    // const bool that represent that isOwner and isPrice
    const isNotOwnerAndPrice = !isOwner && isPrice;

    const ownerName = keyring.getPairs().find(account => account.address === owner).meta.name;

    return (
        <Card className="card" style={{height: '100%'}}>
            {/* Render a label indicating ownership */}
            {isOwner && <Label color='grey'>Mine</Label>}

            {/* Render the Coffee Card Components */}
            <CoffeeCardComponents dna={dna.toU8a()} />

            <Card.Content>
                {/* Display the Kitty ID */}
                <Card.Header style={{ fontSize: '.8em', overflowWrap: 'break-word' }}>
                    ID: {id}
                </Card.Header>

                {/* Display the Kitty DNA */}
                <Card.Meta style={{ fontSize: '.9em', overflowWrap: 'break-word' }}>
                    DNA: {displayDna}
                </Card.Meta>

                <Card.Description>
                    {/* Display the Kitty Gender */}
                    <p style={{ fontSize: '.9em', overflowWrap: 'break-word' }}>
                        Gender: {gender}
                    </p>

                    {/* Display the Kitty Owner */}
                    <p style={{ fontSize: '.9em', overflowWrap: 'break-word' }}>
                        Owner: {ownerName}
                    </p>

                    {/* Display the Kitty Price or a fallback message */}
                    <p style={{ overflowWrap: 'break-word' }}>
                        {price != null ? <span>Price:</span> : 'Price:'} {price ? price : 'No price set'}
                        {price != null && <span> Units</span>}
                    </p>
                </Card.Description>
            </Card.Content>

            <Card.Content extra style={{ textAlign: 'center' }}>
                {/* Render the TransferModal and SetPriceModal or BuyModal */}
                { isOwner 
                ? (
                    <div>
                    <SetPriceModal coffee={coffee} setStatus={setStatus} />
                    <TransferModal coffee={coffee} setStatus={setStatus} />
                    <BreedModal coffee={coffee} setStatus={setStatus} />
                    </div>
                ) : ( 
                    isNotOwnerAndPrice 
                    ?(
                    <BuyModal coffee={coffee} setStatus={setStatus} />
                    ): null
                    )
                }
            </Card.Content>
        </Card>
    );
 };

 export default CoffeeCard;