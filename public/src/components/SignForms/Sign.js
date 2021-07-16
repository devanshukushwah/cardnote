import React, { useState, useEffect, useRef } from "react"
import "./Forms.scss"
import { GoogleLogin } from "react-google-login"
import { FcGoogle } from "react-icons/fc"
import { BsEyeSlash, BsEye } from "react-icons/bs"
import { useHistory, useLocation, Link, useParams } from "react-router-dom"
import { ReactComponent as LaptopGuy } from "../../images/laptopGuy.svg"
import { ReactComponent as Wave } from "../../images/bgWave.svg"
import { useAuth } from "../../contextAPI/useAuth"
import { FaTimes } from "react-icons/fa"
import Message from "../Message/Message"
import CirculareLoader from "../CirculareLoader/CirculareLoader"

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

function Box({ children }) {
  const location = useLocation()
  if (location.pathname === "/") return <></>

  return (
    <>
      <Message />
      <div className="bgColor"></div>
      <main className="carnote-homepage-auth">
        <Link to="/">
          <FaTimes className="X-icon" />
        </Link>
        <Wave className="wave" />
        <div className="left">
          <LaptopGuy className="guy" />
        </div>
        <div className="right">{children}</div>
      </main>
    </>
  )
}

const EyeInput = ({ handleChange }) => {
  const location = useLocation()
  const [showPassword, setShowPassword] = useState(false)
  useEffect(() => {
    setShowPassword(false)
  }, [location])

  return (
    <div className="password">
      <input
        onChange={handleChange}
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Password"
        required
      />
      <span onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <BsEye /> : <BsEyeSlash />}
      </span>
    </div>
  )
}

export const NewPassword = () => {
  const history = useHistory()
  const [form, setForm] = useState({})
  const { token } = useParams()
  const { isSign, handleNewPassword } = useAuth()
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e) => {
    e.preventDefault()
    handleNewPassword({ ...form, token, history })
  }

  return (
    <Box>
      <h2>Set New Password</h2>
      <div className="line-box">
        <div className="line"></div>
        <p>set new Password</p>
        <div className="line"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <EyeInput handleChange={handleChange} />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          onChange={handleChange}
          required
        />
        <button type="submit" required={true}>
          {isSign ? <CirculareLoader /> : "update password"}
        </button>
      </form>
    </Box>
  )
}

const Timer = ({ setIsTimer }) => {
  const [timer, setTimer] = useState(120)
  useEffect(() => {
    let timeOut =
      timer > 0 &&
      setInterval(() => {
        setTimer((timer) => timer - 1)
        if (timer < 2) setIsTimer(false)
      }, 1000)
    return () => clearInterval(timeOut)
  }, [timer])
  return `${timer} Seconds`
}

export const ForgetPassword = () => {
  const [email, setEmail] = useState("")
  const [isTimer, setIsTimer] = useState(false)
  const { handleResetPassword, isSign } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    handleResetPassword(email, setIsTimer)
  }

  return (
    <Box>
      <h2>Reset Password</h2>
      <div className="line-box">
        <div className="line"></div>
        <p>reset with Email</p>
        <div className="line"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={isTimer}>
          {isTimer ? (
            <Timer setIsTimer={setIsTimer} />
          ) : isSign ? (
            <CirculareLoader />
          ) : (
            "Send Mail"
          )}
        </button>
      </form>
    </Box>
  )
}

const RememberForget = ({ checkboxRef }) => {
  return (
    <div className="rememberForget">
      <div>
        <input
          type="checkbox"
          name="remember"
          id="remember"
          ref={checkboxRef}
        />
        <label htmlFor="remember">Remember me</label>
      </div>

      <Link to="/reset" className="p">
        Forget password?
      </Link>
    </div>
  )
}

const GoogleAuth = ({ isSignUp }) => {
  const history = useHistory()

  const googleSuccess = async (res) => {
    const result = res?.profileObj
    const token = res?.tokenId

    try {
      localStorage.setItem("profile", JSON.stringify({ result, token }))
      history.push("/homepage")
    } catch (error) {
      console.log(error)
    }
  }
  const googleFailure = (error) => {
    console.log(error)
  }

  return (
    <GoogleLogin
      clientId="778039184050-h8sde4vr6s0bqs83gvq276hn9pnf976v.apps.googleusercontent.com"
      render={(renderProps) => (
        <button className="googleauth" onClick={renderProps.onClick}>
          <FcGoogle />
          <p>Sign {isSignUp ? "up" : "in"} with Google</p>
        </button>
      )}
      onSuccess={googleSuccess}
      onFailure={googleFailure}
      cookiePolicy={"single_host_origin"}
    />
  )
}

function Landing() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const history = useHistory()
  const location = useLocation()
  const { handleSignUp, handleSignIn, isSign, setIsSign } = useAuth()
  const checkboxRef = useRef(null)

  useEffect(() => {
    setIsSign(false)

    setIsSignUp(location.pathname === "/signup" ? true : false)
  }, [location])

  const handleSubmit = (e) => {
    e.preventDefault()
    const check = checkboxRef.current.checked
    if (!check) {
      window.addEventListener("unload", () => localStorage.clear())
    }
    if (isSignUp) {
      handleSignUp(formData, history)
    } else {
      handleSignIn(formData, history, check)
    }
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <GoogleAuth isSignUp={isSignUp} />
      <div className="line-box">
        <div className="line"></div>
        <p>or Sign {isSignUp ? "up" : "in"} with Email</p>
        <div className="line"></div>
      </div>
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <div>
            <input
              onChange={handleChange}
              type="text"
              name="firstName"
              placeholder="First name"
              required
            />
            <input
              onChange={handleChange}
              type="text"
              name="lastName"
              placeholder="Last name"
              required
            />
          </div>
        )}
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <EyeInput handleChange={handleChange} />

        {isSignUp && (
          <input
            onChange={handleChange}
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            required
          />
        )}

        {!isSignUp && <RememberForget checkboxRef={checkboxRef} />}

        <button type="submit" required={isSign}>
          {isSign ? <CirculareLoader /> : isSignUp ? "SIGN UP" : "SIGN IN"}
        </button>
        {isSignUp ? (
          <div>
            <p>Already have an account? </p>
            <p>
              <Link to="/signin">Sign In</Link>
            </p>
          </div>
        ) : (
          <div>
            <p>Not yet registred? </p>
            <p>
              <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        )}
      </form>
    </>
  )
}

export const Sign = () => {
  return (
    <Box>
      <Landing />
    </Box>
  )
}
