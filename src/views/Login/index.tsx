import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Page from 'components/common/Page';
import RouteLink from 'components/common/RouteLink';
import ControllerCheckbox from 'components/Form/ControllerCheckbox';
import ControllerTextField from 'components/Form/ControllerTextField';
import FormGroup from 'components/Form/FormGroup';
import useAuth from 'hooks/useAuth';
import useMounted from 'hooks/useMounted';
import useNotification from 'hooks/useNotification';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginParams } from 'services/auth';
import { validateLine } from 'utils/constants';
import LocalStorage from 'utils/LocalStorage';
import Regexs from 'utils/Regexs';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .trim(validateLine.trim)
    .strict(true)
    .email(validateLine.email)
    .max(255)
    .required(validateLine.required)
    .default(''),
  password: yup
    .string()
    .trim(validateLine.trim)
    .strict(true)
    .min(8, 'Mật khẩu không được chứa ít hơn 8 ký tự')
    .max(255, 'Mật khẩu không được chứa quá 255 ký tự')
    .matches(Regexs.password, validateLine.regexPassword)
    .required(validateLine.required)
    .default(''),
});

const Login = () => {
  const setNotification = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const isMounted = useMounted();

  const { control, handleSubmit } = useForm<LoginParams>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const onSubmit = async (data: LoginParams) => {
    try {
      setLoading(true);
      if (data.rememberMe) {
        LocalStorage.set('rememberMe', '1');
      } else {
        LocalStorage.remove('rememberMe');
      }
      const response = await login(data);
      if (!response.access_token) {
        setNotification({
          error: 'Login failure',
        });
      }
    } catch (error: any) {
      const { response } = error;
      if (response.status === 400 && response.data) {
        setNotification({
          error: response.data.error_description,
        });
      } else {
        setNotification({
          error: 'Login failure',
        });
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  return (
    <Page title="Login">
      <Grid
        direction="row"
        justifyContent="center"
        alignItems="center"
        container
        sx={{ height: 1 }}
      >
        {/* <Grid
          item
          xs={false}
          sm={4}
          md={6}
          lg={8}
          sx={{
            backgroundImage: 'url(/static/register.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        /> */}
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Typography
              variant="h5"
              align="center"
              color="primary"
              sx={{
                width: '100%',
                mb: 3,
                fontStyle: 'bold',
                fontWeight: '1000',
              }}
              textAlign="left"
            >
              Đăng nhập
            </Typography>

            <FormGroup sx={{ mb: 2 }} fullWidth>
              <ControllerTextField
                variant="standard"
                hiddenLabel
                name="username"
                control={control}
                placeholder="Username"
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </FormGroup>
            <FormGroup sx={{ mb: 2 }} fullWidth>
              <ControllerTextField
                variant="standard"
                hiddenLabel
                name="password"
                control={control}
                type="password"
                required
                fullWidth
                placeholder="Password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </FormGroup>
            <FormGroup sx={{ mb: 1 }} fullWidth>
              <ControllerCheckbox
                control={control}
                name="rememberMe"
                label="Duy trì đăng nhập"
                colorLabel="primary"
              />
            </FormGroup>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <LoadingButton
                loading={loading}
                loadingPosition="center"
                type="submit"
                sx={{ mb: 2, width: '100%' }}
              >
                Đăng nhập
              </LoadingButton>
              <RouteLink to="/forgot-password" variant="subtitle2" gutterBottom>
                Quên mật khẩu?
              </RouteLink>
            </Box>
          </Form>
        </Grid>
      </Grid>
    </Page>
  );
};

const Form = styled('form')(({ theme }) => ({
  width: '100%',
  height: '100%',
  padding: theme.spacing(10),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

export default Login;
