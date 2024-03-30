'use client'

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { api } from "@/services/service";
import { useAppContext } from "@/components/contexts/AppProvider";
import { setting } from "@/utils/setting";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ToastNotify from "@/shared/ToastNotify";
import { useCookies } from "react-cookie";

export default function SignIn() {
    const userContext = useAppContext()
    const router = useRouter()
    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        api.post('/user/sign-in', {
            email: data.get("email"),
            password: data.get("password"),
        }).then((res) => {
            const { access_token, refresh_token, ...rest } = res.data.response
            setting.setStorage('access_token', access_token)
            setting.setStorage('refresh_token', refresh_token)

            setCookie('access_token', access_token, { path: '/' });
            setCookie('refresh_token', refresh_token, { path: '/' });
            userContext && userContext?.setProfileUser(rest)
            toast.custom((ts) => (
                <ToastNotify
                    typeNotify="success"
                    idPopUp={ts?.id}
                    contentOfNotify={
                        <span>
                            Login successfully!
                        </span>
                    }
                />
            ));
            setTimeout(() => {
                router.push('/')

            }, 1000)

        }).catch((err) => { console.log(err, "") })
    };

    return (
        <Box sx={{
            background: '#ff7a0066', height: '100vh',
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: 'center'
        }}>

            <Box
                sx={{ background: '#fff', padding: '20px 25px', borderRadius: '12px' }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}