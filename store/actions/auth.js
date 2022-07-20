/**
 * @file auth.js
 * @description Redux action for auth functionality
 */

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

/**
 * @method signup
 * @description Function to allow a user to signup
 * @param {String} email
 * @param {String} password
 * @returns {Promise}
 */
export const signup = (email, password) => {
	return async (dispatch) => {

		/**
		 * POST to Firebase to create a new user
		 */
		const response = await fetch(
			"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB6AEl7NJ1rvWL_HnNkOcC-44_kT6FSbNo",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true,
				}),
			}
		);

		/**
		 * Validation and Error handling if user already exists
		 */
		if (!response.ok) {
			const errorResData = await response.json();
			console.log(errorResData);
			errorId = errorResData.error.message;
			let message = "Something went wrong!";
			if (errorId === "EMAIL_EXISTS") {
				message = "This email already exists!";
			}
			throw new Error(message);
		}

		const redData = await response.json();
		console.log("user", redData);
		dispatch({
			type: SIGNUP,
			token: redData.idToken,
			userId: redData.localId,
		});
	};
};

/**
 * @method login
 * @description
 * @param {String} email
 * @param {String} password
 * @returns {Promise}
 */

export const login = (email, password) => {
	return async (dispatch) => {

		/**
		 * POST to Firebase to login user 
		 */
		const response = await fetch(
			"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB6AEl7NJ1rvWL_HnNkOcC-44_kT6FSbNo",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true,
				}),
			}
		);

		/**
		 * Validation and Error handling for user email and password
		 */
		if (!response.ok) {
			const errorResData = await response.json();
			console.log(errorResData);
			errorId = errorResData.error.message;
			let message = "Something went wrong!";
			if (errorId === "EMAIL_NOT_FOUND") {
				message = "This email could not be found!";
			} else if (errorId === "INVALID_PASSWORD") {
				message = "This password is not valid!";
			}
			throw new Error(message);
		}

		const redData = await response.json();
		console.log("user", redData);
		dispatch({
			type: LOGIN,
			token: redData.idToken,
			userId: redData.localId,
		});
	};
};


export const logout = () => {
	return {type: LOGOUT};
};
