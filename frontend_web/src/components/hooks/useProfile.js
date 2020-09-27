import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { USERS_GET_ME } from "../../helpers/UsersGraphQL";

function useProfile() {
  const history = useHistory();
  const { loading, error, data } = useQuery(USERS_GET_ME);
  if (loading) return null;
  if (error) {
    if (error.graphQLErrors.length) {
      let message = error.graphQLErrors[0].message;
      if (
        message === "Signature has expired" ||
        message === "You do not have permission to perform this action"
      ) {
        history.push("/login");
      }
    }
    console.log(error);
    return null;
  }
  return data;
}

export default useProfile;
