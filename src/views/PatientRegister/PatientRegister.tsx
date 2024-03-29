import { Button, Paper } from '@material-ui/core';
import { useState } from 'react';
import { useAppLoading } from '../../hooks/useAppLoading';
import { useHealthCareApi } from '../../hooks/useHealthCareApi';
import { useHistory } from 'react-router-dom';
import { TextInputField } from '../../components/Inputs/TextInputField';
import { useNotifications } from '../../hooks/useNotifications';
import { UserInfo } from '../../components/UserInfo/UserInfo';

import './PatientRegister.css';
import { useTranslator } from '../../hooks/useTranslator';

interface PatientRegisterProps {
  onRegister: () => void;
}

export function PatientRegister(props: PatientRegisterProps) {
  const { registerAsPatient } = useHealthCareApi();
  const { dispatchLoading, dispatchNotLoading } = useAppLoading();
  const { translate } = useTranslator();
  const history = useHistory();
  const { pushSuccessNotification, pushErrorNotification } = useNotifications();
  const [name, setName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [gender, setGender] = useState('');


  const register = async () => {
    dispatchLoading();
    try {
      await registerAsPatient(name, nationalId, gender);
      props.onRegister();
      history.push('/');
      pushSuccessNotification('notifications.register-success');
    } catch (err) {
      console.info(err.message);
      
      pushErrorNotification('notifications.register-error');
    } finally {
      dispatchNotLoading();
    }
  };
  const isValid = () => {
    return name.trim() && nationalId.trim() && gender.trim();
  };
  return (
    <>
      <UserInfo />
      <Paper elevation={2} className="register-form">
        <form onSubmit={(e) => e.preventDefault()}>
          <TextInputField
            className="register-form-item"
            placeholder={translate('input-labels.patient-name')}
            value={name}
            onChange={setName}
            required
          />
          <TextInputField
            className="register-form-item"
            placeholder={translate('input-labels.national-id')}
            value={nationalId}
            onChange={setNationalId}
            required
          />
          <TextInputField
            className="register-form-item"
            placeholder={translate('input-labels.patient-gender')}
            value={gender}
            onChange={setGender}
            required
          />
          <div className="register-form-item register-form-submit-button-wrapper">
            <Button
              type="submit"
              className="register-form-submit-button"
              variant="contained"
              color="primary"
              onClick={register}
              disabled={!isValid()}
            >
              {translate('input-labels.register-button')}
            </Button>
          </div>
        </form>
      </Paper>
    </>
  );
}
