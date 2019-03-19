import React, { Component } from "react";
import { getName} from 'country-list';
import connect from "react-redux/es/connect/connect";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class Address extends Component {
    render() {
        return (
            <TableRow>
                <TableCell component="th" scope="row"> <Typography noWrap>{this.props.address.firstName}</Typography> </TableCell>
                <TableCell> <Typography noWrap>{this.props.address.lastName}</Typography> </TableCell>
                <TableCell> <Typography noWrap>{this.props.address.email}</Typography> </TableCell>
                <TableCell> <Typography noWrap>{getName(this.props.address.country)}</Typography> </TableCell>
                <TableCell align="right">
                    <Button onClick={()=>this.props.dispatch({type:'EDIT_ADDRESS',id:this.props.address.id})}
                            variant="contained" color="secondary" fullWidth className="personalizedButton">
                        Edit
                    </Button>
                </TableCell>
                <TableCell align="right">
                    <Button onClick={()=>this.props.dispatch({type:'DELETE_ADDRESS',id:this.props.address.id})}
                            variant="contained" color="secondary" fullWidth className="personalizedButton">
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
        );
    }
}

export default connect()(Address);
