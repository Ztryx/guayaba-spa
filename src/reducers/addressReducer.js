const addressReducer = (state = [], action) => {switch(action.type) {
    case 'ADD_ADDRESS':
        return state.concat([action.data]);
    case 'DELETE_ADDRESS':
        return state.filter((address)=>address.id !== action.id);
    case 'EDIT_ADDRESS':
        return state.map((address)=>address.id === action.id ? {...address,editing:!address.editing}:address);
    case 'UPDATE_ADDRESS':
        return state.map((address)=>{
            if(address.id === action.id) {
                return {
                    ...address,
                    firstName:action.data.editedFirstName,
                    lastName:action.data.editedLastName,
                    email:action.data.editedEmail,
                    country:action.data.editedCountry,
                    editing: !address.editing
                }
            } else {
                return address;
            }
        });
    case 'CANCEL_UPDATE':
        return state.map((address)=>address.id === action.id ? {...address,editing:!address.editing}:address);
    default:
        return state;
    }
};

export default addressReducer;
