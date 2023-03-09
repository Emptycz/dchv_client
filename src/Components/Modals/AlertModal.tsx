import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { ReactChild, ReactElement, useState } from 'react';

export type AlertModalProps = {
  isOpen: boolean;
  title?: string;
  cancelText?: string;
  submitText?: string;
  children?: ReactElement;
  onSubmit?: () => void;
  onCancel?: () => void;
};

const AlertModal = ({ isOpen, title, children, onCancel, onSubmit, cancelText, submitText }: AlertModalProps) => {
  const onCloseClick = () => {
    if (onCancel) onCancel();
  };

  const onSubmitClick = () => {
    if (onSubmit) onSubmit();
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={onCloseClick}> {cancelText ?? 'Cancel'} </Button>
        <Button variant='contained' color='error' onClick={onSubmitClick}> {submitText ?? 'Ok'} </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertModal;
