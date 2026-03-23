import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { checkAuth, forgotPassword, login, logout, resendOtp, resetPassword, signup, verifyOtp } from './AuthApi'

const initialState = {
    status: "idle",
    errors: null,
    resendOtpStatus: "idle",
    resendOtpSuccessMessage: null,
    resendOtpError: null,
    signupStatus: "idle",
    signupError: null,
    loginStatus: "idle",
    loginError: null,
    loggedInUser: null,
    otpVerificationStatus: "idle",
    otpVerificationError: null,
    forgotPasswordStatus: "idle",
    forgotPasswordSuccessMessage: null,
    forgotPasswordError: null,
    resetPasswordStatus: "idle",
    resetPasswordSuccessMessage: null,
    resetPasswordError: null,
    successMessage: null,
    isAuthChecked: false
}

//// ✅ FIXED THUNKS

const handleError = (err, defaultMsg) =>
    err.response?.data || { message: defaultMsg }

export const signupAsync = createAsyncThunk('auth/signupAsync',
    async (cred, { rejectWithValue }) => {
        try { return await signup(cred) }
        catch (err) { return rejectWithValue(handleError(err, "Signup failed")) }
    })

export const loginAsync = createAsyncThunk('auth/loginAsync',
    async (cred, { rejectWithValue }) => {
        try { return await login(cred) }
        catch (err) { return rejectWithValue(handleError(err, "Invalid email or password")) }
    })

export const verifyOtpAsync = createAsyncThunk('auth/verifyOtpAsync',
    async (cred, { rejectWithValue }) => {
        try { return await verifyOtp(cred) }
        catch (err) { return rejectWithValue(handleError(err, "OTP failed")) }
    })

export const resendOtpAsync = createAsyncThunk('auth/resendOtpAsync',
    async (cred, { rejectWithValue }) => {
        try { return await resendOtp(cred) }
        catch (err) { return rejectWithValue(handleError(err, "Resend OTP failed")) }
    })

export const forgotPasswordAsync = createAsyncThunk('auth/forgotPasswordAsync',
    async (cred, { rejectWithValue }) => {
        try { return await forgotPassword(cred) }
        catch (err) { return rejectWithValue(handleError(err, "Forgot password failed")) }
    })

export const resetPasswordAsync = createAsyncThunk('auth/resetPasswordAsync',
    async (cred, { rejectWithValue }) => {
        try { return await resetPassword(cred) }
        catch (err) { return rejectWithValue(handleError(err, "Reset password failed")) }
    })

export const checkAuthAsync = createAsyncThunk('auth/checkAuthAsync',
    async (_, { rejectWithValue }) => {
        try { return await checkAuth() }
        catch (err) { return rejectWithValue(handleError(err, "Auth failed")) }
    })

export const logoutAsync = createAsyncThunk('auth/logoutAsync',
    async (_, { rejectWithValue }) => {
        try { return await logout() }
        catch (err) { return rejectWithValue(handleError(err, "Logout failed")) }
    })

const authSlice = createSlice({
    name: "AuthSlice",
    initialState,
    reducers: {

        clearSignupError: (s) => { s.signupError = null },
        resetSignupStatus: (s) => { s.signupStatus = 'idle' },

        clearLoginError: (s) => { s.loginError = null },
        resetLoginStatus: (s) => { s.loginStatus = 'idle' },

        clearOtpVerificationError: (s) => { s.otpVerificationError = null },
        resetOtpVerificationStatus: (s) => { s.otpVerificationStatus = 'idle' },

        clearResendOtpError: (s) => { s.resendOtpError = null },
        clearResendOtpSuccessMessage: (s) => { s.resendOtpSuccessMessage = null },
        resetResendOtpStatus: (s) => { s.resendOtpStatus = 'idle' },

        clearForgotPasswordError: (s) => { s.forgotPasswordError = null },
        clearForgotPasswordSuccessMessage: (s) => { s.forgotPasswordSuccessMessage = null },
        resetForgotPasswordStatus: (s) => { s.forgotPasswordStatus = 'idle' },

        clearResetPasswordError: (s) => { s.resetPasswordError = null },
        clearResetPasswordSuccessMessage: (s) => { s.resetPasswordSuccessMessage = null },
        resetResetPasswordStatus: (s) => { s.resetPasswordStatus = 'idle' },
    },

    extraReducers: (builder) => {
        builder

        //// LOGIN
        .addCase(loginAsync.pending, (s) => { s.loginStatus = 'pending' })
        .addCase(loginAsync.fulfilled, (s, a) => {
            s.loginStatus = 'fulfilled'
            s.loggedInUser = a.payload
        })
        .addCase(loginAsync.rejected, (s, a) => {
            s.loginStatus = 'rejected'
            s.loginError = a.payload || a.error
        })

        //// SIGNUP
        .addCase(signupAsync.fulfilled, (s, a) => {
            s.signupStatus = 'fulfilled'
            s.loggedInUser = a.payload
        })
        .addCase(signupAsync.rejected, (s, a) => {
            s.signupError = a.payload || a.error
        })

        //// OTP
        .addCase(verifyOtpAsync.fulfilled, (s, a) => {
            s.otpVerificationStatus = 'fulfilled'
            s.loggedInUser = a.payload
        })
        .addCase(verifyOtpAsync.rejected, (s, a) => {
            s.otpVerificationError = a.payload || a.error
        })

        //// RESEND OTP
        .addCase(resendOtpAsync.fulfilled, (s, a) => {
            s.resendOtpSuccessMessage = a.payload
        })
        .addCase(resendOtpAsync.rejected, (s, a) => {
            s.resendOtpError = a.payload || a.error
        })

        //// FORGOT PASSWORD
        .addCase(forgotPasswordAsync.fulfilled, (s, a) => {
            s.forgotPasswordSuccessMessage = a.payload
        })
        .addCase(forgotPasswordAsync.rejected, (s, a) => {
            s.forgotPasswordError = a.payload || a.error
        })

        //// RESET PASSWORD
        .addCase(resetPasswordAsync.fulfilled, (s, a) => {
            s.resetPasswordSuccessMessage = a.payload
        })
        .addCase(resetPasswordAsync.rejected, (s, a) => {
            s.resetPasswordError = a.payload || a.error
        })

        //// AUTH CHECK
        .addCase(checkAuthAsync.fulfilled, (s, a) => {
            s.loggedInUser = a.payload
            s.isAuthChecked = true
        })
        .addCase(checkAuthAsync.rejected, (s) => {
            s.isAuthChecked = true
        })

        //// LOGOUT
        .addCase(logoutAsync.fulfilled, (s) => {
            s.loggedInUser = null
        })
    }
})

//// ✅ ALL SELECTORS (RESTORED)

export const selectLoggedInUser = (s) => s.AuthSlice.loggedInUser
export const selectLoginStatus = (s) => s.AuthSlice.loginStatus
export const selectLoginError = (s) => s.AuthSlice.loginError
export const selectSignupStatus = (s) => s.AuthSlice.signupStatus
export const selectSignupError = (s) => s.AuthSlice.signupError
export const selectForgotPasswordStatus = (s) => s.AuthSlice.forgotPasswordStatus
export const selectForgotPasswordError = (s) => s.AuthSlice.forgotPasswordError
export const selectForgotPasswordSuccessMessage = (s) => s.AuthSlice.forgotPasswordSuccessMessage
export const selectResetPasswordStatus = (s) => s.AuthSlice.resetPasswordStatus
export const selectResetPasswordError = (s) => s.AuthSlice.resetPasswordError
export const selectResetPasswordSuccessMessage = (s) => s.AuthSlice.resetPasswordSuccessMessage
export const selectResendOtpStatus = (s) => s.AuthSlice.resendOtpStatus
export const selectResendOtpError = (s) => s.AuthSlice.resendOtpError
export const selectResendOtpSuccessMessage = (s) => s.AuthSlice.resendOtpSuccessMessage
export const selectOtpVerificationStatus = (s) => s.AuthSlice.otpVerificationStatus
export const selectOtpVerificationError = (s) => s.AuthSlice.otpVerificationError
export const selectIsAuthChecked = (s) => s.AuthSlice.isAuthChecked

//// EXPORT ACTIONS
export const {
    clearSignupError, resetSignupStatus,
    clearLoginError, resetLoginStatus,
    clearOtpVerificationError, resetOtpVerificationStatus,
    clearResendOtpError, clearResendOtpSuccessMessage, resetResendOtpStatus,
    clearForgotPasswordError, clearForgotPasswordSuccessMessage, resetForgotPasswordStatus,
    clearResetPasswordError, clearResetPasswordSuccessMessage, resetResetPasswordStatus
} = authSlice.actions

export default authSlice.reducer