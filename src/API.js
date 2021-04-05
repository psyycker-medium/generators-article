export function getUsers() {
  return new Promise(resolve => {
    resolve([
      {userId: 1, firstName: "John", lastName: "Doe"},
      {userId: 2, firstName: "Jane", lastName: "Foster"}
    ])
  })
}

// This function is taking more time to resolve as the backend is doing some complex queries
export function getUsersAdditionalDetails(ids) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {userId: 1, phoneNumber: "06456785343", emailAddress: "john.doe@gmail.com"},
        {userId: 2, phoneNumber: "04576549698", emailAddress: "jane.foster@gmail.com"}
      ])
    }, 3000)
  })
}
