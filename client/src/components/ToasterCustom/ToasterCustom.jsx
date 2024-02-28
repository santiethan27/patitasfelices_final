import React, { useEffect } from 'react'
import { Toaster, toast } from 'sonner';

function ToasterCustom({ typeToaster, resetType }) {
    useEffect(() => {
        switch (typeToaster && typeToaster[0]) {
            case 'info':
                toast.info(typeToaster[1], {
                    style: {
                        backgroundColor: '#5b54ca',
                        color: 'white'
                    }
                })
                resetType();
                break;
            case 'error':
                toast.error(typeToaster[1], {
                    style: {
                        backgroundColor: '#e6a4d0',
                        color: 'dark'
                    }
                })
                resetType();
                break;
            case 'success':
                toast.success(typeToaster[1], {
                    style: {
                        background: 'lightgreen',
                        color: 'dark'
                    }
                })
                resetType();
                break;
        }
    }, [typeToaster]);
    return (
        <Toaster />
    )
}

export default ToasterCustom