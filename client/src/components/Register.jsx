import React, { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";

import { Link, useNavigate } from "react-router-dom";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
/*
USER_REGEX Requiere (
  > Empezar con una letra mayuscula o minuscula [a-zA-Z]
  > Ser seguido por de 3 a 23 caracteres que pueden ser minusculas, mayusculas, digitos o guiones
)
*/

const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
/*
PWD_REGEX Requiere al menos (
  > 1 letra minuscula
  > 1 letra mayuscula
  > 1 digito numerico
  > 1 caracter especial
  > dentro de 8 a 24 caracteres
  )
*/

const REGISTER_URL = "/register";

const Register = () => {
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus(); // Hacer focus en el username input una vez que se carga el componente
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]); // Se ejecutará cada vez que el password o el matchPassword cambien

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]); // El usuario luego de recibir el error hará cambios, cuando haga cambios se seteara el mensaje de error a vacio

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateUser = USER_REGEX.test(user);
    const validatePwd = PWD_REGEX.test(pwd);
    if (!validateUser || !validatePwd) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "Application/json" },
          withCredentials: true,
        }
      );
      navigate("/login");
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No server response");
      } else if (error.response?.status === 409) {
        setErrMsg("Username taken");
      } else {
        setErrMsg("Registration failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
        {/* Display Error */}
      </p>
      <h1> Register </h1>
      <form onSubmit={handleSubmit}>
        {/* USERNAME INPUT AND DISPLAY ERROR */}
        <label htmlFor="username">
          Username:
          <span className={validName ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validName || !user ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <p
          id="uidnote"
          className={
            userFocus && user && !validName ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters. <br />
          Must begin with a letter <br />
          Letters, numbers, underscores hyphens allowed.
          {/* Mostrar las instrucciones mientras no se cumpla la condición */}
        </p>

        {/* PASSWORD INPUT AND DISPLAY ERROR */}
        <label htmlFor="password">
          Password:
          <span className={validPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validPwd || !pwd ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <p
          id="pwdnote"
          className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters. <br />
          Must include uppercase and lowercase letters, a number and a special
          character <br />
          Allowed special characters:
          <span aria-label="exclamation mark">!</span>
          <span aria-label="at symbol">@</span>
          <span aria-label="hashtag">#</span>
          <span aria-label="dollar sign">$</span>
          <span aria-label="percent">%</span>
          {/* Mostrar las instrucciones mientras no se cumpla la condición (se pulse en el input [pwdFocus] y la constaseña no sea valida [!validPwd])*/}
        </p>

        {/* CONFIRM PASSWORD INPUT AND DISPLAY ERROR */}
        <label htmlFor="confirm_pwd">
          Confirm Password:
          <span className={validMatch && matchPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="confirm_pwd"
          onChange={(e) => setMatchPwd(e.target.value)}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p
          id="confirmnote"
          className={matchFocus && !validMatch ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password field.
          <br />
          {/* Mostrar las instrucciones mientras no se cumpla la condición*/}
        </p>

        <button
          disabled={!validName || !validPwd || !validMatch ? true : false}
        >
          Sign Up
        </button>
      </form>
      <p>
        Already registered? <br />{" "}
        <span className="line">
          <Link to="/login">Sign In</Link>
        </span>
      </p>
    </section>
  );
};

export default Register;
