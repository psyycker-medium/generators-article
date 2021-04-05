import {getUsersAdditionalDetails, getUsers} from "./API";
import {useEffect, useState} from "react";

async function* GetFullUsersInfo() {
  const basicUsers = await getUsers();
  yield basicUsers
  const ids = basicUsers.map(basicUser => basicUser.userId);
  const advancedUsers = await getUsersAdditionalDetails(ids);
  return advancedUsers.map(advancedUser => ({...advancedUser, ...basicUsers.find((basicUser) => basicUser.userId === advancedUser.userId)}))
}

const User = ({firstName, lastName, phoneNumber, emailAddress}) => {
  return <div style={{display: "flex", flexDirection: "column", marginTop: "20px"}}>
    <div style={{display: "flex", flexDirection: "row"}}>
      {`${firstName} ${lastName}`}
    </div>
    <span>{phoneNumber}</span>
    <span>{emailAddress}</span>
  </div>
}

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const gen = GetFullUsersInfo();
      const basicInfo = await gen.next();
      setUsers(basicInfo.value);
      const completeInfo = await gen.next();
      setUsers(completeInfo.value);
    })()
  }, [])

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      {users.map(user => <User key={user.userId} phoneNumber={user.phoneNumber} emailAddress={user.emailAddress} firstName={user.firstName} lastName={user.lastName}/>)}
    </div>
  );
}

export default App;
