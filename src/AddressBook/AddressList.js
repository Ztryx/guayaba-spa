import React, { Component } from "react";
import Address from "./Address";
import { connect } from 'react-redux';
import EditAddress from './EditAddress';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class AddressList extends Component {

    render() {
        return (
            <Grid item xs={12}>
                <div className="formContent">
                    <h2 className="cardTitleHeader">
                        Address List
                    </h2>
                    <div style={{width: 'auto', overflowX: 'auto'}}>
                        <Table className="addressTable">
                            <TableHead>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Country</TableCell>
                                    <TableCell align="center">Update</TableCell>
                                    <TableCell align="center">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.addressList.map(address => (
                                    address.editing ? <EditAddress address={address} key={address.id} /> : <Address key={address.id} address={address} />
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        addressList: state
    }
};

export default connect(mapStateToProps)(AddressList);
