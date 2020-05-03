import React, { useState } from "react";
import { connect } from "react-redux";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";
import "./sign-in.styles.scss";

// HOOKS!
const SignIn = ({ googleSignInStart, emailSignInStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;

  const handleSubmit = async (e) => {
    e.preventDefault();
    emailSignInStart(email, password);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    // console.log(e.target, name, value);
    // DYNAMIC OBJECT KEY!!!
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form autoComplete="on" onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          label="email"
          value={email}
          handleChange={handleChange}
          required
        />
        <FormInput
          type="password"
          name="password"
          label="password"
          value={password}
          handleChange={handleChange}
          required
          autoComplete="on"
        />
        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton
            type="button"
            isGoogleSignIn
            onClick={googleSignInStart}
          >
            Sign In With Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

// class SignIn extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       password: "",
//     };
//   }

//   handleSubmit = async (e) => {
//     e.preventDefault();

//     const { email, password } = this.state;

//     try {
//       await auth.signInWithEmailAndPassword(email, password);
//       this.setState({ email: "", password: "" });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   handleChange = (e) => {
//     const { value, name } = e.target;
//     console.log(e.target, name, value);
//     // DYNAMIC OBJECT KEY!!!
//     this.setState({ [name]: value });
//   };

//   render() {
//     const { email, password } = this.state;
//     return (
//       <div className="sign-in">
//         <h2>I already have an account</h2>
//         <span>Sign in with your email and password</span>
//         <form autoComplete="on" onSubmit={this.handleSubmit}>
//           <FormInput
//             type="email"
//             name="email"
//             label="email"
//             value={email}
//             handleChange={this.handleChange}
//             required
//           />
//           <FormInput
//             type="password"
//             name="password"
//             label="password"
//             value={password}
//             handleChange={this.handleChange}
//             required
//             autoComplete="on"
//           />
//           <div className="buttons">
//             <CustomButton type="submit">Sign In</CustomButton>
//             <CustomButton
//               type="button"
//               isGoogleSignIn
//               onClick={signInWithGoogle}
//             >
//               Sign In With Google
//             </CustomButton>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
