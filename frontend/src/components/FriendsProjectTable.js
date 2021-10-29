import React,  { useState }  from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { donateFriendProject } from '../utils/near-utils';


const FriendsProjectTable = ({ wallet, data, friendId }) => {

    const [amount, setamount] = useState("");
    const handleDonate = async (name) => {
        const project = {
            "friendId": friendId,
            "name": name
        };

        const result = await donateFriendProject(wallet, project, amount);
        const {
            status: { SuccessValue },
        } = result;
        console.log(atob(SuccessValue));
    }

    return (<Table striped bordered hover size="sm">
        <thead>
            <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Donate</th>
            </tr>
        </thead>
        <tbody>
            {data.map((name) =>
                <tr key={name}>
                    <td>{name}</td>
                    <td><input type = "text" onChange = {(e)=>setamount(e.target.value)}/></td>
                    <td><Button variant="outline-success" onClick={() => { handleDonate(name) }}>Donate</Button></td>
                </tr>
            )}
        </tbody>
    </Table>);
};

export default FriendsProjectTable;