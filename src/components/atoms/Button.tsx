import * as React from 'react';
import NextLink from 'next/link';
import type * as types from 'types';

import MuiButton from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export type Props = types.Button & types.StackbitFieldPath & { className?: string; sx?: { [key: string]: any } };

export const Button: React.FC<Props> = (props) => {
    const { className, label, url, size = 'medium', variant = 'text', color = 'primary', sx, 'data-sb-field-path': fieldPath } = props;
    const annotations = fieldPath ? [fieldPath, `${fieldPath}.url#@href`].join(' ').trim() : null;
    const [open, setOpen] = React.useState(false);

    const isSoldOutAction = url === '#sold-out';

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    if (isSoldOutAction) {
        return (
            <>
                <MuiButton
                    className={className}
                    variant={variant}
                    size={size}
                    color={color}
                    sx={{ borderRadius: '2px', ...sx }}
                    data-sb-field-path={annotations}
                    onClick={handleClick}
                >
                    <span data-sb-field-path=".label">{label}</span>
                </MuiButton>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        Item is sold out
                    </Alert>
                </Snackbar>
            </>
        );
    }

    return (
        <MuiButton component={NextLink} href={url} className={className} variant={variant} size={size} color={color} sx={{ borderRadius: '2px', ...sx }} data-sb-field-path={annotations}>
            <span data-sb-field-path=".label">{label}</span>
        </MuiButton>
    );
};
