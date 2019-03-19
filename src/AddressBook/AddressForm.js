import React, { Component } from "react";
import { connect } from 'react-redux';
import { getName } from 'country-list';
import { nameRegex, emailRegex } from '../utils/regexDefinition';
import options from '../utils/countryParser';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button/Button";
import Select from 'react-select';
import PersonalizedDialog from '../utils/PersonalizedDialog';
import Grid from "@material-ui/core/Grid/Grid";

class AddressForm extends Component {
    constructor(props) {
        super(props);
        this._handleChange = this._handleChange.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.state = {
            firstName: {
                value: "",
                valid: false,
                label: "First Name"
            },
            lastName: {
                value: "",
                valid: false,
                label: "Last Name"
            },
            email: {
                value: "",
                valid: false,
                label: "Email"
            },
            country: {
                value: "",
                valid: false,
                label: "Country"
            },
            init: false,
            dialog: {
                title: "",
                message: "",
                status: "",
                open: false
            }
        };
    }

    _handleChange = name => event => {
        let checkValidity = false;
        let value = "";
        switch(name) {
            case("firstName"):
            case("lastName"):
                value = event.target.value;
                checkValidity = nameRegex.test(value);
                break;
            case("email"):
                value = event.target.value;
                checkValidity = emailRegex.test(value);
                break;
            case("country"):
                value = event.value;
                if(value !== undefined)
                    checkValidity = value.length > 0 && getName(value).length > 0;
                break;
            default:
            break;
        }

        this.setState({ [name]: {"value": value, "valid": checkValidity}});
        this.setState({"init": true});
    };

    cleanState() {
        this.setState({"firstName": {"value": "", "valid": false}});
        this.setState({"lastName": {"value": "", "valid": false}});
        this.setState({"email": {"value": "", "valid": false}});
        this.setState({"init": false});
    }

    validForm() {
        return this.state.firstName.valid && this.state.lastName.valid && this.state.email.valid && this.state.country.valid;
    }

    _handleSubmit = (e) => {
        e.preventDefault();
        if(this.validForm()) {
            const firstName = this.state.firstName.value;
            const lastName = this.state.lastName.value;
            const email = this.state.email.value;
            const country = this.state.country.value;
            const data = {
                id: new Date(),
                firstName,
                lastName,
                email,
                country,
                editing: false
            };

            this.props.dispatch({
                type: 'ADD_ADDRESS',
                data
            });
            this.cleanState();
            this.openDialog("Success!", "There has been created a new address", true, "dialogSuccess");
        } else {
            const wrongFields = [this.state.lastName, this.state.firstName, this.state.email, this.state.country].filter((field) => !field.valid)
                .flatMap((value) => " " + value.label);
            const errorMessage = "Those fields marked in red are wrong:" + wrongFields + ", please fill the fields again";
            this.openDialog("There are errors completing the form", errorMessage, true, "dialogError");
        }
    };

    openDialog(title, message, open, status) {
        this.setState({
            dialog: {
                title: title,
                message: message,
                open: open,
                status: status
            }
        });
    }

    hideDialog() {
        this.setState({
            dialog: {
                title: "",
                message: "",
                open: false
            }
        });
    }

    render() {
        return (
            <Grid item xs={12}>
                <div className="formContent">
                    <h2 className="cardTitleHeader">New Address</h2>
                    <form onSubmit={this._handleSubmit} autoComplete="off" noValidate className="newForm">
                        <TextField
                            className="formElement"
                            required
                            value={this.state.firstName.value}
                            error={!this.state.firstName.valid && this.state.init }
                            label="First Name"
                            margin="normal"
                            fullWidth
                            onChange={this._handleChange('firstName')}
                            placeholder="Enter First Name"
                            variant="outlined"
                        />
                        <TextField
                            className="formElement"
                            required
                            value={this.state.lastName.value}
                            error={!this.state.lastName.valid && this.state.init }
                            label="Last Name"
                            margin="normal"
                            fullWidth
                            onChange={this._handleChange('lastName')}
                            placeholder="Enter Last Name"
                            variant="outlined"
                        />
                        <TextField
                            className="formElement"
                            required
                            value={this.state.email.value}
                            error={!this.state.email.valid && this.state.init }
                            label="Email"
                            margin="normal"
                            fullWidth
                            onChange={this._handleChange('email')}
                            placeholder="Enter Email"
                            variant="outlined"
                        />
                        <Select
                            className="formElement selectElement"
                            options={options}
                            onChange={this._handleChange('country')}
                            placeholder="Choose a Country"
                            fullWidth
                        />
                        <Button
                            type="submit"
                            className="personalizedButton"
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                        >
                            Add Address
                        </Button>
                    </form>
                    <PersonalizedDialog title={this.state.dialog.title}
                                        message={this.state.dialog.message}
                                        open={this.state.dialog.open}
                                        status={this.state.dialog.status}
                                        handleClose={this.hideDialog}/>
                </div>
            </Grid>
        );
    }
}

export default connect()(AddressForm);
