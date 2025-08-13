export default function DeviceDetail(props){
    return <>
    <h3>Id: {props.id} , Name: {props.devicename}, Status: {props.status}, Type: {props.type}, IP: {props.ip}</h3>
    </>
}