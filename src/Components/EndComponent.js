import { useContext, useState, useEffect } from "react";
export default function EndComponent(props) {
  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "auth-token": props.loginToken,
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data)
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  async function ToggleState(section, subjectcode, classState) {
    postData("https://majorprojectzoom.herokuapp.com/user/host/toggle", {
      section: section,
      subjectcode: subjectcode,
      isactive: classState
    }).then((data) => {
      console.log(data);

      // JSON data parsed by `data.json()` call
    });
  }
  useEffect(() => {
    if (props.userType === false) {
      ToggleState(
        localStorage.getItem("userSection"),
        localStorage.getItem("userSubjectCode"),
        false
      );
    }
  }, []);
  return <></>;
}
