import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { Grid } from '@mui/material';
import LinkButton from 'components/common/LinkButton';
import LoadingScreen from 'components/common/LoadingScreen';
import ControllerDatePicker from 'components/Form/ControllerDatePicker';
import ControllerTextField from 'components/Form/ControllerTextField';
import FormContent from 'components/Form/FormContent';
import FormFooter from 'components/Form/FormFooter';
import FormGroup from 'components/Form/FormGroup';
import FormHeader from 'components/Form/FormHeader';
import FormLabel from 'components/Form/FormLabel';
import FormPaperGrid from 'components/Form/FormPaperGrid';
import useMounted from 'hooks/useMounted';
import useNotification from 'hooks/useNotification';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { editCompany, company, getCompanyDetails } from 'services/setting';
import TypedObject from 'utils/TypedObject';
import * as yup from 'yup';
import Regexs from '../../../utils/Regexs';
import FormInputAdornment from '../../../components/Form/FormInputAdornment';

interface FormData {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  foundingDate: Date | null;
  district: string;
}

const validationSchema = yup.object().shape({
  companyName: yup
    .string()
    .required('Required')
    .trim('Cannot include leading and trailing spaces')
    .strict(true)
    .default(''),
  email: yup
    .string()
    .required('Required')
    .trim('Cannot include leading and trailing spaces')
    .matches(Regexs.email, 'yupErrorMessage.onlyEmail')
    .strict(true)
    .default(''),
  address: yup
    .string()
    .required('Required')
    .trim('Cannot include leading and trailing spaces')
    .strict(true)
    .default(''),
  website: yup
    .string()
    .required('Required')
    .trim('Cannot include leading and trailing spaces')
    .strict(true)
    .default(''),
  district: yup
    .string()
    .required('Required')
    .trim('Cannot include leading and trailing spaces')
    .strict(true)
    .default(''),
  phone: yup
    .string()
    .required('Required')
    .matches(Regexs.phone, 'yupErrorMessage.onlyNumber')
    .default(''),
  foundingDate: yup
    .date()
    .required('Required')
    .nullable()
    .typeError('Invalid time')
    .default(null),
});

const EditCompany = () => {
  const { id: companyId } = useParams();
  const mounted = useMounted();
  const setNotification = useNotification();
  const navigate = useNavigate();
  const [companyDetails, setCompanyDetails] =
    useState<company | null>(null);
  const [taskQueue, setTaskQueue] = useState<number>(0); //to render loading

  const [loading, setLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const onSubmit = async (data: FormData) => {
    if (!companyId) return;

    setLoading(true);
    const crudData = {
      ...data,
      id: parseInt(companyId),
      image: '',
      foundingDate: data.foundingDate?.toISOString() ?? '',
    };

    editCompany(crudData)
      .then((res) => {
        if (res.success) {
          navigate('/settings/company');
          setNotification({
            message: 'Update success.',
            severity: 'success',
          });
        }
      })
      .catch((err) => {
        setNotification({
          error: err || 'Update failure.',
        });
      })
      .finally(() => {
        if (mounted.current) {
          setLoading(false);
        }
      });
  };

  //call api to get data details
  useEffect(() => {
    if (!companyId) return;

    setTaskQueue((task) => task + 1);
    getCompanyDetails(companyId)
      .then((res) => {
        setCompanyDetails(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        if (mounted.current) {
          setTaskQueue((task) => task - 1);
        }
      });
  }, [companyId, mounted]);

  //reset form value form data details
  useEffect(() => {
    if (!companyDetails) return;

    const {
      companyName,
      foundingDate,
      phone,
      email,
      address,
      website,
      district,
    } = companyDetails;

    reset({
      foundingDate: new Date(foundingDate),
      companyName,
      phone,
      email,
      address,
      website,
      district,
    });
  }, [companyDetails, reset]);

  if (taskQueue > 0) {
    return <LoadingScreen />;
  }

  return (
    <FormPaperGrid noValidate onSubmit={handleSubmit(onSubmit)}>
      <FormHeader title="Edit Company" />
      <FormContent>
        <FormGroup>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} sm={4} md={2}>
              <FormLabel required title="Company Name" name="companyName" />
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
              <ControllerTextField name="companyName" control={control} placeholder="Enter company name" />
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <FormLabel required title="Email" name="email" />
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
              <ControllerTextField name="email" control={control} placeholder="Enter email" />
            </Grid>

          </Grid>
        </FormGroup>
        <FormGroup>
          <Grid container alignItems="center" columnSpacing={2}>
            <Grid item xs={12} sm={4} md={2}>
              <FormLabel
                required
                title="Phone number"
                name="phone"
              />
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
              <ControllerTextField
                name="phone"
                control={control}
                InputProps={{
                  startAdornment: (
                    <FormInputAdornment
                      position="start"
                      title={"(+84)"}
                    />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <FormLabel required title="Founding Date" name="foundingDate" />
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
              <ControllerDatePicker
                name="foundingDate"
                control={control}
                errors={errors}
              />
            </Grid>

          </Grid>
        </FormGroup>
        <FormGroup>
          <Grid container alignItems="center" columnSpacing={2}>
            <Grid item xs={12} sm={4} md={2}>
              <FormLabel required title="Address" name="address" />
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
              <ControllerTextField name="address" control={control} placeholder="Enter address" />
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <FormLabel required title="District" name="district" />
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
              <ControllerTextField name="district" control={control} placeholder="Enter district" />
            </Grid>
          </Grid>
        </FormGroup>
        <FormGroup>
          <Grid container alignItems="center" columnSpacing={2}>
            <Grid item xs={12} sm={4} md={2}>
              <FormLabel required title="Website" name="website" />
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
              <ControllerTextField name="website" control={control} placeholder="Enter website" />
            </Grid>
          </Grid>
        </FormGroup>
        {/*<FormGroup>*/}
        {/*  <Grid container alignItems="center" spacing={2}>*/}
        {/*    <Grid item xs={12} sm={4} md={2}>*/}
        {/*      <FormLabel*/}
        {/*        required*/}
        {/*        title="Mutiple select field"*/}
        {/*        name="mutipleSelectField"*/}
        {/*      />*/}
        {/*    </Grid>*/}
        {/*    <Grid item xs={12} sm={8} md={4}>*/}
        {/*      <EntityMultipleSelecter*/}
        {/*        name="mutipleSelectField"*/}
        {/*        control={control}*/}
        {/*        options={mockMutipleSelectOptions}*/}
        {/*        renderLabel={(field) => field.name}*/}
        {/*        placeholder="Please select a field"*/}
        {/*        forcePopupIcon={false}*/}
        {/*      />*/}
        {/*    </Grid>*/}
        {/*    <Grid item xs={12} sm={4} md={2}>*/}
        {/*      <FormLabel required title="Select field" name="selectField" />*/}
        {/*    </Grid>*/}
        {/*    <Grid item xs={12} sm={8} md={4}>*/}
        {/*      <EntitySelecter*/}
        {/*        name="selectField"*/}
        {/*        control={control}*/}
        {/*        options={mockSelectFieldOptions}*/}
        {/*        renderLabel={(field) => field.name}*/}
        {/*        placeholder="Please select a field"*/}
        {/*      />*/}
        {/*    </Grid>*/}
        {/*  </Grid>*/}
        {/*</FormGroup>*/}
      </FormContent>
      <FormFooter>
        <LinkButton startIcon={<ArrowBackIcon />} to="/settings/company">
          Back to list
        </LinkButton>
        <LoadingButton
          startIcon={<SaveIcon />}
          loading={loading}
          loadingPosition="start"
          type="submit"
          disabled={!TypedObject.isEmpty(errors)}
        >
          Save
        </LoadingButton>
      </FormFooter>
    </FormPaperGrid>
  );
};

export default EditCompany;
