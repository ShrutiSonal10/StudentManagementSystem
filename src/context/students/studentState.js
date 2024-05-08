import studentContext from "./studentContext.js";
const StudentState = (props)=>{
    const state = {
        "name":"Shruti",
        "class":"5b"
    }
return (
    <studentContext.Provider value = {state}>
        {props.childern}
    </studentContext.Provider>
)
}
export default StudentState;