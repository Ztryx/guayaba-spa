import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { getName } from 'country-list';
import {nameRegex, emailRegex} from '../utils/regexDefinition';
import options from '../utils/countryParser';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField/TextField";

class EditAddress extends Component {

    constructor(props) {
        super(props);
        this._handleChange = this._handleChange.bind(this);
        this._onBlurCountryField = this._onBlurCountryField.bind(this);
        this._onChangeCountryField = this._onChangeCountryField.bind(this);
        this._handleClose = this._handleClose.bind(this);
        this.state = {
            selectedOption: {label: getName(this.props.address.country), value: this.props.address.country},
            firstName: this.props.address.firstName,
            lastName: this.props.address.lastName,
            email: this.props.address.email,
            firstNameValidity: true,
            lastNameValidity: true,
            emailValidity: true,
            countryValidity: true
        };
    }

    _handleChange = name => event => {
        let checkValidity = false;
        const value = event.target.value;
        switch(name) {
            case("firstName"):
            case("lastName"):
                checkValidity = nameRegex.test(value);
                break;
            case("email"):
                checkValidity = emailRegex.test(value);
                break;
            default:
                break;
        }
        this.setState({ [name]: value });
        this.setState({ [name + "Validity"]: checkValidity});
    };

    _onChangeCountryField = (selectedOption) => {
        this.setState({ selectedOption });
    };

    _onBlurCountryField() {
        let result = false;
        const value = this.state.selectedOption.value;
        if(value !== undefined)
            result = value.length > 0 && getName(value).length > 0;
        this.setState({countryValidity: result});
    }

    validForm() {
        return this.state.firstNameValidity && this.state.lastNameValidity && this.state.emailValidity && this.state.countryValidity;
    }

    _handleClose() {
        this.props.dispatch({type:'CANCEL_UPDATE', id:this.props.address.id})
    }

    _handleEdit = (e) => {
        e.preventDefault();
        if(this.validForm()) {
            const editedFirstName = this.state.firstName;
            const editedLastName = this.state.lastName;
            const editedEmail = this.state.email;
            const editedCountry = this.state.selectedOption.value;
            const data = {
                editedFirstName,
                editedLastName,
                editedEmail,
                editedCountry
            };
            this.props.dispatch({ type: 'UPDATE_ADDRESS', id: this.props.address.id, data: data })
        }
    };

    render() {
        const { selectedOption } = this.state;

        return (
            <div>
                <Dialog
                    open={this.props.address.editing}
                    onClose={this._handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Edit Address</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please edit here the information related to this address
                        </DialogContentText>
                        <form onSubmit={this._handleEdit} noValidate autoComplete="off">
                            <TextField
                                required
                                error={!this.state.firstNameValidity}
                                label="First Name"
                                margin="normal"
                                fullWidth
                                value={this.state.firstName}
                                onChange={this._handleChange('firstName')}
                                placeholder="Enter First Name"
                            />
                            <TextField
                                required
                                error={!this.state.lastNameValidity}
                                label="Last Name"
                                margin="normal"
                                fullWidth
                                value={this.state.lastName}
                                onChange={this._handleChange('lastName')}
                                placeholder="Enter Last Name"
                            />
                            <TextField
                                required
                                error={!this.state.emailValidity}
                                label="Email"
                                margin="normal"
                                fullWidth
                                value={this.state.email}
                                onChange={this._handleChange('email')}
                                placeholder="Enter Email"
                            />
                            <Select
                                className="formElement"
                                options={options}
                                value={selectedOption}
                                onChange={this._onChangeCountryField}
                                onBlur={this._onBlurCountryField}
                            />
                            <Button
                                className="formElement personalizedButton"
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Add Address
                            </Button>
                            <Button onClick={this._handleClose} fullWidth variant="contained" color="secondary" className="formElement personalizedButton">
                                Cancel
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default connect()(EditAddress);
