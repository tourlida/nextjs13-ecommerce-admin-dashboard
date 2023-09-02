'use client';
import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export const AlertModal = ({ isOpen, onConfirm, onClose, isLoading }: AlertModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth={true}>
      <DialogTitle >
        <Stack direction="row" justifyContent="space-between">
          Are you sure?
          <IconButton onClick={onClose}>
            <CloseIcon className="h-4 w-4" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>This action cannot be undone.</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button disabled={isLoading} variant="contained" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isLoading} variant="contained" onClick={onConfirm}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};
