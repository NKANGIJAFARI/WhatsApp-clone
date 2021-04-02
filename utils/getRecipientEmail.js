const getRecipientEmail = (users, userLoggedIn) => {
  users?.filter((userToFilter) => userFilter !== userLoggedIn?.email)[0];
};

export default getRecipientEmail;
