/* eslint-disable */
import React, {useState, MouseEvent} from 'react';
import BaseModal from './BaseModal';
import {styled} from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {ToggleButton} from '@mui/material';
import styles from '../../styles/SettingsModal.module.scss';

type SettingsModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleRestart: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  size: number;
  setSize: (newSize: number) => void;
  timeLimit: number;
  setTimeLimit: (newTimeLimit: number) => void;
}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

function SettingsModal({
  isOpen,
  handleClose,
  handleRestart,
  darkMode,
  toggleDarkMode,
  size,
  setSize,
  timeLimit,
  setTimeLimit
}: SettingsModalProps) {
  
  const [newSize, setNewSize] = useState<number>(size);
  const [newTimeLimit, setNewTimeLimit] = useState<number>(timeLimit);

  const MaterialUIButtonGroupStyle = {
    '& .MuiToggleButtonGroup-grouped:not(:first-of-type)': {
      borderLeftColor: darkMode ? 'inherit': 'rgba(0, 0, 0, 0.12)',
    },
    '& .Mui-selected': {
      backgroundColor: darkMode ? 'lightslategrey' : 'rgba(0, 0, 0, 0.08)',
      borderColor: darkMode ? 'inherit': 'undefined',
      color: darkMode ? 'inherit': undefined
    },
    '& .Mui-selected:hover': {
      backgroundColor: darkMode ? 'rgba(119, 136, 153, 0.9)' : 'rgba(0, 0, 0, 0.12)',
      borderColor: darkMode ? 'inherit': 'undefined',
      color: darkMode ? 'inherit': undefined
    },
    '& .Mui-focus': {
      backgroundColor: darkMode ? "lightslategrey" : undefined,
      borderColor: darkMode ? 'inherit': 'undefined',
      color: darkMode ? 'inherit': undefined
    },
    '& .Mui-focusVisible': {
      backgroundColor: darkMode ? "lightslategrey" : undefined,
      borderColor: darkMode ? 'inherit': 'undefined',
      color: darkMode ? 'inherit': undefined
    },
    '& :hover': {
      backgroundColor: darkMode ? 'rgba(119, 136, 153, 0.3)' : 'rgba(0, 0, 0, 0.04)',
      borderColor: darkMode ? 'inherit': 'undefined',
      color: darkMode ? 'inherit': undefined
    }
  };

  const MaterialUIButtonStyle = {
    color: darkMode ? 'inherit': 'undefined',
    borderColor: darkMode ? 'inherit': 'undefined'
  };

  const handleSaveSettings = () => {
    if (newTimeLimit !== timeLimit || newSize !== size) {
      setTimeLimit(newTimeLimit);
      setSize(newSize);
    }
    handleClose();
  }

  const resetSettings = () => {
    setNewSize(size);
    setNewTimeLimit(timeLimit);
  }
  return (
    <BaseModal
      isOpen = {isOpen}
      handleClose = {() => {
        resetSettings();
        handleClose();
      }}
      darkMode = {darkMode}
    >
      <h3> Settings </h3>
      <div style={{width: '100%'}}>
        <div style = {{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h4 style ={{marginRight: '0.5rem'}}> Dark Mode </h4>
          <MaterialUISwitch sx={{ m: 1 }} defaultChecked onChange = {toggleDarkMode}/>
        </div>
        <hr/>
        <div style = {{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h4 style ={{marginRight: '0.5rem'}}> Board Size </h4>
          <ToggleButtonGroup
          sx = {MaterialUIButtonGroupStyle}
          value={newSize}
          onChange={(_: MouseEvent<HTMLElement>, selectedSize: number) => {
            if (selectedSize) {
              setNewSize(selectedSize);
            }
          }}
          exclusive
        >
          {
            [4,5].map((x) => {
              return (
              <ToggleButton
                sx ={MaterialUIButtonStyle}
                value={x} key={x}
                disableFocusRipple disableRipple>
                {x}x{x}
              </ToggleButton>);
            })
          }
        </ToggleButtonGroup>
        </div>
        <hr/>
        <div style = {{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h4 style ={{marginRight: '0.5rem'}}> Time Limit </h4>
            <ToggleButtonGroup
              sx = {MaterialUIButtonGroupStyle}
              value={newTimeLimit}
              onChange={(_: MouseEvent<HTMLElement>, selectedTimeLimit: number) => {
                if (selectedTimeLimit) {
                  setNewTimeLimit(selectedTimeLimit);
                }
              }}
              exclusive
            >
              {
                [30,45,60,90].map((x) => {
                  return (
                  <ToggleButton
                    sx ={MaterialUIButtonStyle}
                    value={x} key={x}
                    disableFocusRipple disableRipple
                  >
                    {x}
                  </ToggleButton>);
                })
              }
              
          </ToggleButtonGroup>
        </div>
        <div className={styles.buttonContainer}>
          <button className = {styles.saveButton} onClick = {() => {
            resetSettings();
            handleClose();
            handleRestart();
          }}>
            Restart
          </button>
          <button className = {styles.saveButton} onClick = {handleSaveSettings}>
            Save Settings
          </button>
        </div>
      </div>
    </BaseModal>
  );
}

export default SettingsModal;
