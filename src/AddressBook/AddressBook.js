import React, { Component } from "react";
import AddressForm from "./AddressForm";
import AddressList from "./AddressList";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './AddressBook.css';

class AddressBook extends Component {

    render() {
        return (
            <div className="addressBook">
                <div className="addressFormContainer">
                    <Card className="addressBookCard">
                        <CardContent>
                            <AddressForm />
                        </CardContent>
                    </Card>
                </div>
                <div className="addressListContainer">
                    <Card className="addressBookCard">
                        <CardContent>
                            <AddressList />
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }
}

export default AddressBook;
