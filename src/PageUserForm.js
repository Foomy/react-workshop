import React from "react";
import { __RouterContext } from "react-router";

function useRouter() {
  return React.useContext(__RouterContext);
}

export function PageUserForm() {
  const [firstName, setFirstName] = React.useState("Test");
  const [lastName, setLastName] = React.useState("Tester");
  const [job, setJob] = React.useState("");
  const router = useRouter();

  return (
    <form
      id="form-user"
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={e => {
        e.preventDefault();
        fetch("https://reqres.in/api/users", {
          method: "POST",
          body: JSON.stringify({
            name: firstName + " " + lastName,
            job: job
          }),
          headers: {
            accept: "application/json"
          }
        })
          .then(result => result.json())
          .then(jsonResult => {
            router.history.push(`/details/${jsonResult.id}`);
          });
      }}
    >
      <input
        type="text"
        name="firstName"
        value={firstName}
        placeholder="Geben Sie hier Ihren Nachnamen ein."
        onChange={e => setFirstName()}
      />
      <input
        type="text"
        name="lastName"
        value={lastName}
        placeholder="Geben Sie hier Ihren Nachnamen ein."
        onChange={e => setLastName()}
      />
      <input
        type="text"
        name="job"
        placeholder="Geben Sie hier Ihren Beruf ein."
        value={job}
        onChange={e => setJob()}
      />

      <button>Abschicken</button>
    </form>
  );
}
