import React from "react";

import "./custom-button.styles.scss";

// import { CustomButtonContainer } from "./custom-button.styles";

const CustomButton = ({
  children,
  inverted,
  isGoogleSignIn,
  ...otherProps
}) => (
  <button
    className={`${inverted ? "inverted" : ""} ${
      isGoogleSignIn ? "google-sign-in" : ""
    } custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

// styled components handling above logic for button styling
// see ./custom-button.styles.jsx
// const CustomButton = ({ children, ...props }) => (
//   <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
// );

export default CustomButton;
