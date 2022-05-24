import React, { useContext, useState } from "react";
import AuthenticationHeader from "./authenticationHeader";
import { Typography, InputBase, Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import GoogleButton from "../../../common/component/googleButton";
import FacebookButton from "../../../common/component/facebookButton";
import { Link } from "@reach/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../../common/validation/authenticationSchemas";
import {
	signIn,
	verifyEmail,
	verifyOTP,
} from "../../../store/authentication/authenticationAction";
import { AuthenticationStore } from "../../../store/authentication/authenticationStore";
import AuthButton from "../../../common/component/authButton";
import VerifyEmailModal from "../modals/verifyEmailModal";
import VerifyOTPModal from "../modals/verifyOTPModal";

const useStyle = makeStyles((theme) => ({
	form: {
		width: "500px",
		boxShadow: "rgb(0 0 0 / 25%) 0px 14px 28px, rgb(0 0 0 / 22%) 0px 10px 10px",
		padding: "30px",
		background: " linear-gradient(to right, #8e44ad, #ff9f95)",
		color: theme.palette.black.main,
		marginTop: "20px",
	},
	formInputControl: {
		display: "flex",
		flexDirection: "column",
		marginBottom: "10px",
	},

	formFooter: {
		marginTop: "5px",
		fontSize: "14px",
		color: "black",
		"& a": {
			color: "blue",
			textDecoration: "none",
		},
	},
	formForgot: {
		fontSize: "14px",
		"& a": {
			color: "blue",
			textDecoration: "none",
		},
	},
	selectError: {
		color: "#D62F2F",
		fontSize: "12px",
		margin: "2px 0px 0px 10px",
	},
	errorBorder: {
		border: "1px solid red",
	},
	inputBase: {
		fontSize: "14px",
		backgroundColor: "white",
		borderRadius: "5px",
		color: "black",
		padding: "10px 10px 5px 15px",
	},
}));

function Signin() {
	const classes = useStyle();
	// ================= Validation resolver
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onBlur",
		resolver: yupResolver(signInSchema),
	});

	// ========== Context =====
	const { authenticationStore, authenticationDispatch } =
		useContext(AuthenticationStore);

	// ========== User defined state  =========
	const [isVerificationCodeSend, setVerificationModal] = useState(false);
	const [isEmailModalOpen, setEmailModal] = useState(false);
	const [facebookResponse, setFacebookResponse] = useState({});
	const [userEmail, setUserEmail] = useState("");

	const creatSignUpSchema = (data, type) => {
		return {
			First_Name: data?.First_Name,
			Last_Name: data?.First_Name,
			Email: data?.Email,
			Password: data?.Password,
			Phone_Number: data?.Phone_Number,
			Authentication_Type: type,
			Token: data?.tokenId || data?.accessToken,
			Facebook_ID: data?.userID,
		};
	};

	const handleEmailModal = () => {
		setEmailModal(false);
	};

	const handleOTPModal = () => {
		setVerificationModal(false);
	};

	const handeleSendVeificationCode = async (email) => {
		if ((email, facebookResponse)) {
			setUserEmail(email);
			const USER_DATA = {
				Email: email,
				Facebook_ID: facebookResponse?.userID,
			};
			const response = await verifyEmail(USER_DATA, authenticationDispatch);
			if (response?.Data) {
				setEmailModal(false);
				setVerificationModal(true);
			}
		}
	};

	const handeleSubmitVeificationCode = async (otp) => {
		if (otp) {
			const USER_DATA = {
				Authentication_Type: "FACE_BOOK",
				Token: facebookResponse.accessToken,
				Facebook_ID: facebookResponse.userID,
				Email: userEmail,
				OTP: otp,
			};
			const response = await verifyOTP(USER_DATA, authenticationDispatch);
			if (response?.Message) setVerificationModal(false);
		}
	};

	const responseGoogle = (response) => {
		signIn(creatSignUpSchema(response, "GOOGLE"), authenticationDispatch);
	};

	const responseFacebook = (response) => {
		if (response?.email) {
			signIn(creatSignUpSchema(response, "FACE_BOOK"), authenticationDispatch);
		} else {
			setFacebookResponse(response);
			setEmailModal(true);
		}
	};

	const handleOnSubmit = (data) => {
		const USER_DATA = {
			Email: data.Email,
			Password: data.Password,
			Authentication_Type: "MANUAL",
		};
		signIn(USER_DATA, authenticationDispatch);
	};
	return (
		<React.Fragment>
			<Grid
				container
				direction="column"
				alignItems="center"
				justify="center"
				style={{ minHeight: "100vh" }}
			>
				<Grid item xs={6}>
					<form
						onSubmit={handleSubmit(handleOnSubmit)}
						className={classes.form}
					>
						<AuthenticationHeader title="Sign in to your account" />
						<Box className={classes.formInputControl}>
							<InputBase
								className={`${classes.inputBase} ${
									errors?.Email ? classes.errorBorder : ""
								}`}
								type="email"
								name="Email"
								placeholder="Email Address*"
								{...register("Email")}
								size="small"
							/>
							<Box component="span" className={classes.selectError}>
								{errors?.Email?.message}
							</Box>
						</Box>

						<Box className={classes.formInputControl}>
							<InputBase
								className={`${classes.inputBase} ${
									errors?.Password ? classes.errorBorder : ""
								}`}
								type="password"
								name="Password"
								placeholder="Password*"
								{...register("Password")}
								size="small"
							/>
							<Box component="span" className={classes.selectError}>
								{errors?.Password?.message}
							</Box>
						</Box>
						<Box>
							<Typography className={classes.formForgot}>
								<Link to="/auth/forgot-password"> Forgot Password?</Link>
							</Typography>
						</Box>

						<Box className={classes.formInputControl}>
							<AuthButton buttonText="SIGN IN" />
						</Box>
						<Grid container justifyContent="center" spacing={1}>
							<Grid item md={6}>
								<Box className={classes.formInputControl}>
									<GoogleButton
										label="Google"
										responseGoogle={responseGoogle}
									/>
								</Box>
							</Grid>
							<Grid item md={6}>
								<Box className={classes.formInputControl}>
									<FacebookButton
										label="Facebook"
										responseFacebook={responseFacebook}
									/>
								</Box>
							</Grid>
						</Grid>

						<Box className={classes.formInputControl}>
							<Typography className={classes.formFooter}>
								Create Account <Link to="/auth/sign-up">SignUp</Link>
							</Typography>
						</Box>
					</form>
				</Grid>
			</Grid>
			<VerifyEmailModal
				isEmailModalOpen={isEmailModalOpen}
				handleEmailModal={handleEmailModal}
				handeleSendVeificationCode={handeleSendVeificationCode}
			/>

			<VerifyOTPModal
				isOTPModalOpen={isVerificationCodeSend}
				handleOTPModal={handleOTPModal}
				handeleSubmitVeificationCode={handeleSubmitVeificationCode}
			/>
		</React.Fragment>
	);
}
export default Signin;
