import {
  Alert,
  Box,
  Button,
  Chip,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';
import {
  CalendarMonth as CalendarIcon,
  Email as EmailIcon,
  Notifications as PushIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useLocalUser } from '@hooks/useLocalUser';

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2.5),
  width: '100%',
  maxWidth: 420,
  margin: '0 auto',
}));

const DisabledSection = styled(FormGroup)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  opacity: 0.45,
}));

interface WizardProfileProps {
  onChange: (nickname: string) => void;
  onForget: () => void;
}

export function WizardProfile({ onChange, onForget }: WizardProfileProps) {
  const { t } = useTranslation('letItRain');
  const { personId, nickname, setNickname, forgetMe } = useLocalUser();

  const handleNicknameChange = (value: string) => {
    setNickname(value);
    onChange(value);
  };

  const handleForgetMe = () => {
    forgetMe();
    onChange('');
    onForget();
  };

  return (
    <Root>
      <TextField
        label={t('profile.nickname')}
        placeholder={t('profile.nicknamePlaceholder')}
        value={nickname}
        onChange={(e) => handleNicknameChange(e.target.value)}
        required
        fullWidth
        inputProps={{ 'data-cy': 'nickname-input' }}
        helperText={t('profile.deviceInfo')}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
        <Chip
          size="small"
          label={`${t('profile.deviceId')}: ${personId.slice(0, 8)}…`}
          variant="outlined"
          color="default"
        />
        <Button
          size="small"
          color="error"
          variant="outlined"
          onClick={handleForgetMe}
          data-cy="forget-me-button"
        >
          {t('profile.forgetMe')}
        </Button>
      </Box>

      <DisabledSection>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
          {t('profile.comingSoon')}
        </Typography>
        <Tooltip title={t('profile.comingSoon')} placement="right">
          <FormControlLabel
            control={<Switch disabled />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <EmailIcon fontSize="small" />
                <span>{t('profile.emailNotification')}</span>
              </Box>
            }
          />
        </Tooltip>
        <Tooltip title={t('profile.comingSoon')} placement="right">
          <FormControlLabel
            control={<Switch disabled />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <PushIcon fontSize="small" />
                <span>{t('profile.pushNotification')}</span>
              </Box>
            }
          />
        </Tooltip>
      </DisabledSection>

      <Alert severity="info" icon={<CalendarIcon />}>
        {t('profile.icsInfo')}
      </Alert>
    </Root>
  );
}

export default WizardProfile;
